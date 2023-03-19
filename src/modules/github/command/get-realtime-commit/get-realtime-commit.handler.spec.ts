import { GetRealTimeCommitCommand } from './get-realtime-commit.command';
import { GetRealTimeCommitHandler } from './get-realtime-commit.handler';

describe('GetRealTimeCommitHandler', () => {
  let handler: GetRealTimeCommitHandler;
  interface mockBody {
    body: object;
  }

  beforeEach(async () => {
    handler = new GetRealTimeCommitHandler();
  });

  it('should get a body', async () => {
    const mockData: mockBody = { body: { test: 'test' } };
    const resp = await handler.execute(new GetRealTimeCommitCommand(mockData));
    expect(resp).toEqual(mockData);
  });
});
