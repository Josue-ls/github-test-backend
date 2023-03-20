import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { mockBuses } from '../../../__mocks__/buses';
import { GetRealTimeCommitCommand } from '../command/get-realtime-commit/get-realtime-commit.command';
import { CommitsGateway } from './web-socket';
import { mockServer } from '../../../__mocks__/service/socker-service';
describe('CommitsGateway', () => {
  let gatewayService: CommitsGateway;
  const bus = mockBuses();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommitsGateway,
        {
          provide: CommandBus,
          useValue: { execute: bus.command },
        },
      ],
    }).compile();

    gatewayService = module.get<CommitsGateway>(CommitsGateway);
    gatewayService.server = mockServer;
  });

  it('should be defined', () => {
    expect(gatewayService).toBeDefined();
  });

  it('sendCommit', async () => {
    const mockData = { body: { test: 'test' } };
    await gatewayService.sendCommit(mockData.body);
    expect(gatewayService.server.emit).toHaveBeenCalledWith(
      'emitCommit',
      mockData.body,
    );
  });

  it('getCommit', async () => {
    const mockData = { body: { message: 'test message' } };
    await gatewayService.getCommit(mockData.body);
    expect(bus.command).toHaveBeenCalledWith(
      new GetRealTimeCommitCommand(mockData.body),
    );
  });
});
