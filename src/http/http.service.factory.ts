import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class HttpServiceFactory {
  createHttpService(config?: CreateAxiosDefaults): AxiosInstance {
    const instance = axios.create(config);

    axiosRetry(instance, {
      retries: 2,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error);
      },
    });

    return instance;
  }
}
