import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetCommitsQuery } from './queries/get-commits';
import { CommitsDto } from './dto/commits.dto';

@Controller('github')
@UseInterceptors(ClassSerializerInterceptor)
export class GithubController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/commits/:repo')
  async getCommits(@Param('repo') repo: string): Promise<CommitsDto[]> {
    return await this.queryBus.execute(new GetCommitsQuery(repo));
  }
}
