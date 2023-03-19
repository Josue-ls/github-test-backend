import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { GithubController } from './github.controller';
import { mockBuses } from '../../__mocks__/buses';
import { GetCommitsQuery } from './queries/get-commits';
import { CommitsGateway } from './utils';
import { CommandHandlers } from './command/handler';

describe('Github controller', () => {
  let controller: GithubController;
  const bus = mockBuses();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubController],
      providers: [
        CommitsGateway,
        ...CommandHandlers,
        {
          provide: QueryBus,
          useValue: { execute: bus.query },
        },
        {
          provide: CommandBus,
          useValue: { execute: bus.command },
        },
      ],
    }).compile();

    controller = module.get<GithubController>(GithubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a list of commits', async () => {
    const repoName = 'repo-name';
    await controller.getCommits(repoName);
    expect(bus.query).toHaveBeenCalledWith(new GetCommitsQuery(repoName));
  });
});
