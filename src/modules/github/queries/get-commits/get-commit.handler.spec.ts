import { mockHttpService } from '../../../../__mocks__/service/mock-service';
import { GetCommitsHandler } from './get-commits.handler';
import { GetCommitsQuery } from './get-commits.query';

describe('GetCommitHandler', () => {
  let handler: GetCommitsHandler;
  const mockService = mockHttpService();
  beforeEach(async () => {
    handler = new GetCommitsHandler(mockService);
  });

  it('should be define', () => {
    expect(handler).toBeDefined();
  });

  it('should get a list of commits', async () => {
    const commits = await handler.execute(new GetCommitsQuery('repo-name'));
    expect((commits as []).length).toBe(0);
  });
});
