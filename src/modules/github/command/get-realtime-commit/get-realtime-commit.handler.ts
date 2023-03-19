import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetRealTimeCommitCommand } from './get-realtime-commit.command';

@CommandHandler(GetRealTimeCommitCommand)
export class GetRealTimeCommitHandler
  implements ICommandHandler<GetRealTimeCommitCommand>
{
  async execute(command: GetRealTimeCommitCommand): Promise<unknown> {
    const { body } = command;
    return body;
  }
}
