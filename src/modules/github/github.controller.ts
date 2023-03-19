import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetCommitsQuery } from './queries/get-commits';
import { CommitsDto } from './dto/commits.dto';
import { CommitsGateway } from './utils';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class GithubController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commitGateway: CommitsGateway,
  ) {}

  @Get('/commits/:repo')
  async getCommits(@Param('repo') repo: string): Promise<CommitsDto[]> {
    return await this.queryBus.execute(new GetCommitsQuery(repo));
  }

  @Post('/webhook')
  async getWebhookCommits(@Body() body: { commits: unknown }) {
    console.log(body.commits);
    await this.commitGateway.getCommit(body);
  }
}
