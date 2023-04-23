import axios from 'axios';

import { GetSchoolsResponse } from '@/types/ApiTypes';

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

  fetchGetSchools = async ({ keyword }: { keyword: string }) => {
    const { data } = await this.instance.get<GetSchoolsResponse>('/school/search', {
      params: {
        keyword,
        size: 50,
      },
    });

    return data.content;
  };
}

export const apiService = new ApiService();
