import axios from 'axios';

import {
  AuthenticateResponse,
  GetSchoolsResponse,
  GetUserBySchoolReq,
  GetUserBySchoolResponse,
  PostFollowUserReq,
  PostFollowUserRes,
} from '@/types/ApiTypes';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default class ApiService {
  private instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbnRoMTIzNEBuYXZlci5jb20iLCJhdXRoIjoiVVNFUl9ST0xFIiwidXNlcklkIjo4NCwiZXhwIjoxNjgzOTg4NTE1fQ.fpD8wUYRu0c8dANZNM88XRn-zZvFEiTqDpdcp26FCt5dDGykH69A5fJbqgrsCgE4ws8ltfYCcG3avCNZNHwvoQ',
    },
  });

  accessToken: string | undefined;

  setToken(accessToken: string) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    this.accessToken = accessToken;
  }

  fetchGetSchools = async ({ keyword }: { keyword: string }) => {
    const { data } = await this.instance.get<GetSchoolsResponse>(
      '/school/search',
      {
        params: {
          keyword,
          size: 50,
        },
      },
    );

    return data.content;
  };

  authenticate = async (payload: { email: string; password: string }) => {
    const { data } = await this.instance.post<AuthenticateResponse>(
      '/user/authenticate',
      {},
      {
        params: {
          email: payload.email,
          password: payload.password,
        },
      },
    );

    if (data.value?.token) {
      this.setToken(data.value.token);
    }

    return data;
  };

  fetchGetUsersBySchool = async ({
    keyword,
    type,
    lastId,
    size,
  }: GetUserBySchoolReq) => {
    const { data } = await this.instance.get<GetUserBySchoolResponse>(
      '/user/search',
      {
        params: {
          keyword,
          type,
          lastId,
          size,
        },
      },
    );

    return data;
  };

  fetchPostFollowUser = async ({
    followeeId,
  }: PostFollowUserReq) => {
    const { data } = await this.instance.post<PostFollowUserRes>(
      '/relation/request',
      {
        params: {
          followeeId,
        },
      },
    );

    return data;
  };
}

export const apiService = new ApiService();
