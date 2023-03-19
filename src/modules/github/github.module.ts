import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { QueryHandlers } from './queries/handler';
import { GithubController } from './github.controller';
import { CommandHandlers } from './command/handler';
import { CommitsGateway } from './utils';

@Module({
  imports: [HttpModule, CqrsModule],
  controllers: [GithubController],
  providers: [CommitsGateway, ...QueryHandlers, ...CommandHandlers],
})
export class GithubModule {}
