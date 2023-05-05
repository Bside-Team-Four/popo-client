import axios, { AxiosError, AxiosResponse } from 'axios';

import ApiException from '@/lib/excptions/ApiException';
import CustomException from '@/lib/excptions/CustomException';
import { ApiErrorScheme } from '@/lib/excptions/type';
import {
  AuthenticateResponse,
  GetSchoolsResponse, PasswordMissingAuthResponse,
  PasswordMissingResponse,
  PasswordResetResponse,
} from '@/types/ApiTypes';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function interceptorResponseFulfilled(res: AxiosResponse) {
  if (res.data.code === 0) {
    return res.data;
  }

  return Promise.reject(res.data);
}

function interceptorResponseRejected(error: AxiosError<ApiErrorScheme>) {
  if (error.response?.data?.message) {
    return Promise.reject(new ApiException(error.response.data, error.response.status));
  }

  return Promise.reject(new CustomException('알 수 없는 에러가 발생했어요. 다시 시도해주세요.'));
}

export default class ApiService {
  private instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    this.instance.interceptors.response.use(
      interceptorResponseFulfilled,
      interceptorResponseRejected,
    );
  }

  accessToken: string | undefined;

  setToken(accessToken:string) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    this.accessToken = accessToken;
  }

  get<T>(...args: Parameters<typeof this.instance.get>) {
    return this.instance.get<T, T>(...args);
  }

  post<T>(...args: Parameters<typeof this.instance.post>) {
    return this.instance.post<T, T>(...args);
  }

  fetchGetSchools = ({ keyword, page }: {
    keyword: string, page:number
  }) => this.get<GetSchoolsResponse>('/school/search', {
    params: {
      keyword,
      size: 30,
      page,
    },
  });

  authenticate = async (payload: { email: string, password: string }) => {
    const data = await this.post<AuthenticateResponse>('/user/authenticate', {}, {
      params: {
        email: payload.email,
        password: payload.password,
      },
    });

    if (data.value?.token) {
      this.setToken(data.value.token);
    }

    return data;
  };

  passwordMissing = ({ email }: {
    email:string
  }) => this.post<PasswordMissingResponse>('/password/missing', {
    email,
  });

  passwordMissingAuth = ({ userId, userCode }:{
    userId?: number, userCode: string
  }) => this.post<PasswordMissingAuthResponse>('/password/missing/auth', {
    userId,
    userCode,
  });

  passwordReset = ({ userId, toChangePassword }:{
    userId?: number, toChangePassword: string
  }) => this.post<PasswordResetResponse>('/password/reset', {
    userId,
    toChangePassword,
  });
}

export const apiService = new ApiService();
