import axios from 'axios';

import { AuthenticateResponse, GetSchoolsResponse } from '@/types/ApiTypes';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

  accessToken: string | undefined;

  setToken(accessToken:string) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    this.accessToken = accessToken;
  }

  fetchGetSchools = ({ keyword, page }: { keyword: string, page:number }) => this.instance.get<GetSchoolsResponse>('/school/search', {
    params: {
      keyword,
      size: 30,
      page,
    },
  });

  authenticate = async (payload: { email: string, password: string }) => {
    const { data } = await this.instance.post<AuthenticateResponse>('/user/authenticate', {}, {
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
}

export const apiService = new ApiService();
