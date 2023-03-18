import { GetCommitsQuery } from './get-commits.query';
describe('GetCommitsQuery', () => {
  it('Should be defined', () => {
    const repoName = 'repo-name';
    const query = new GetCommitsQuery(repoName);
    expect(query).toBeDefined();
    expect(query.repo).toBe(repoName);
  });
});
