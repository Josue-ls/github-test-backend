import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRealTimeCommitCommand } from './get-realtime-commit.query';

@QueryHandler(GetRealTimeCommitCommand)
export class GetRealTimeCommitHandler
  implements ICommandHandler<GetRealTimeCommitCommand>
{
  async execute(query: GetRealTimeCommitCommand): Promise<any> {
    throw Error('Not implemented');
  }
}
