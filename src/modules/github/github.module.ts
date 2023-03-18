import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { QueryHandlers } from './queries/handler';
import { GithubController } from './github.controller';

@Module({
  imports: [HttpModule, CqrsModule],
  controllers: [GithubController],
  providers: [...QueryHandlers],
})
export class GithubModule {}
