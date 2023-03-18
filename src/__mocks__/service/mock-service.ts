import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { mockDeep } from 'jest-mock-extended';
import { BehaviorSubject, map } from 'rxjs';

export const mockHttpService = () =>
  mockDeep<HttpService>({
    get(url, config) {
      return new BehaviorSubject({ url, config }).pipe(
        map(({ url, config }) => {
          if (url.includes('repos' && 'commits')) {
            return {
              data: [],
            } as AxiosResponse;
          }

          throw new Error('Not found');
        }),
      );
    },
  });
