import { GetRealTimeCommitCommand } from './get-realtime-commit.command';

describe('GetRealTimeCommitCommand', () => {
  it('Should be defined', () => {
    const body = {};
    const command = new GetRealTimeCommitCommand(body);
    expect(command).toBeDefined();
    expect(command.body).toBe(body);
  });
});
