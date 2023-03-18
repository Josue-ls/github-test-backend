import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { catchError, firstValueFrom, map } from 'rxjs';
import type { AxiosError } from 'axios';
import { GetCommitsQuery } from './get-commits.query';
import { CommitsDto } from '../../../dto/commits.dto';

@QueryHandler(GetCommitsQuery)
export class GetCommitsHandler implements IQueryHandler<GetCommitsQuery> {
  constructor(private readonly httpService: HttpService) {}

  async execute(query: GetCommitsQuery): Promise<CommitsDto[]> {
    const githubUser = process.env.GITHUB_USERNAME;
    const GITHUB_URL = `https://api.github.com/repos/${githubUser}/${query.repo}/commits`;
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'User-Agent': githubUser,
    };
    const { data } = await firstValueFrom(
      this.httpService.get(GITHUB_URL, { headers }).pipe(
        map((resp) => resp),
        catchError((err: AxiosError) => {
          throw new InternalServerErrorException(`Error: ${err.message}`);
        }),
      ),
    );
    return data;
  }
}
