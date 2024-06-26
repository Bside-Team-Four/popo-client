import { getSession, signOut } from 'next-auth/react';

import axios, { AxiosError, AxiosResponse } from 'axios';

import ApiException from '@/lib/excptions/ApiException';
import CustomException from '@/lib/excptions/CustomException';
import { ApiErrorScheme } from '@/lib/excptions/type';
import {
  AuthenticateResponse, FollowResponse, GetAlarmsResponse, GetHintsResponse, GetMyProfileResponse,
  GetPollListResponse, GetPollStatusResponse,
  GetRewardsResponse,
  GetSchoolsResponse,
  GetUsersResponse,
  NotificationSettingsResponse,
  PasswordMissingAuthResponse,
  PasswordMissingResponse,
  PasswordResetResponse, RemoveAccountResponse, SignUpAuthEmailResponse,
  SignUpResponse, SignUpSendEmailResponse, SkipResponse, UnfollowResponse, VoteResponse,
} from '@/types/ApiTypes';
import SignUpUser from '@/types/SignUpUser';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function interceptorResponseFulfilled(res: AxiosResponse) {
  if (res.data.code === 0) {
    return res.data;
  }

  return Promise.reject(res.data);
}

function interceptorResponseRejected(error: AxiosError<ApiErrorScheme>) {
  if (error.response?.status === 401) {
    signOut();
  }

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
    this.instance.interceptors.request.use(async (config) => {
      const user = await getSession();

      const accessToken = user?.accessToken;

      if (accessToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });
  }

  get<T>(...args: Parameters<typeof this.instance.get>) {
    return this.instance.get<T, T>(...args);
  }

  post<T>(...args: Parameters<typeof this.instance.post>) {
    return this.instance.post<T, T>(...args);
  }

  delete<T>(...args: Parameters<typeof this.instance.delete>) {
    return this.instance.delete<T, T>(...args);
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

  fetchGetUsers = ({ type, keyword, lastId }: {
    type:'NAME' | 'SCHOOL', keyword: string, lastId?: number
  }) => this.get<GetUsersResponse>('/user/search', {
    params: {
      type,
      keyword,
      size: 30,
      lastId,
    },
  });

  fetchGetFollower = ({ lastId }: {
    lastId?: number
  }) => this.get<GetUsersResponse>('/relation/follower', {
    params: {
      size: 30,
      lastId,
    },
  });

  fetchGetFollowee = ({ lastId }: {
    lastId?: number
  }) => this.get<GetUsersResponse>('/relation/followee', {
    params: {
      size: 30,
      lastId,
    },
  });

  fetchGetRewards = (
    lastId?: number,
  ) => this.get<GetRewardsResponse>('/user/reward', {
    params: {
      size: 30,
      lastId,
    },
  });

  fetchGetAlarms = (
    lastId?: number,
  ) => this.get<GetAlarmsResponse>('/vote', {
    params: {
      size: 30,
      lastId,
    },
  });

  fetchHints = ({
    targetUserId,
    voteId,
  }:{
    targetUserId: number,
    voteId: number,
  }) => this.get<GetHintsResponse>('/hint', {
    params: {
      targetUserId,
      voteId,
    },
  });

  purchaseHint = (
    { voteId, hintId }:{ voteId: number, hintId: number },
  ) => this.post('/hint', {
    voteId,
    hintId,
  });

  follow = (followeeId : number) => this.post<FollowResponse>('/relation/request', {
    followeeId,
  });

  unfollow = (relationId : number) => this.post<UnfollowResponse>(`/relation/cancel/${relationId}`);

  authenticate = async (payload: { email: string, password: string, fcmToken?:string }) => this.post<AuthenticateResponse>('/user/authenticate', {
    email: payload.email,
    password: payload.password,
    fcmToken: payload.fcmToken,
  });

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

  passwordChange = ({ currPassword, toChangePassword }:{
    currPassword:string, toChangePassword:string
  }) => this.post('/user/change/password', {
    currPassword,
    toChangePassword,
  });

  fetchGetPollStatus = () => this.get<GetPollStatusResponse>('/poll/status');

  signUpSendEmail = ({ email }: { email: string }) => this.post<SignUpSendEmailResponse>('/user/sign-up/send/email', {
    email,
  });

  signUpAuthEmail = ({ email, userCode } : {
    email: string, userCode: string
  }) => this.post<SignUpAuthEmailResponse>(
    '/user/sign-up/auth/email',
    {
      email,
      userCode,
    },
  );

  signUp = (payload: SignUpUser) => this.post<SignUpResponse>(
    '/user/sign-up',
    { ...payload, fcmToken: 'test' },
  );

  removeAccount = () => this.delete<RemoveAccountResponse>(
    '/user/leave',
  );

  fetchMyProfile = () => this.get<GetMyProfileResponse>('/user/my');

  fetchPollList = () => this.get<GetPollListResponse>('/poll', {
    params: {
      totalCandidatesNum: 8,
    },
  });

  vote = ({ chosenId, questionId }:{ chosenId:number, questionId: number }) => this.post<VoteResponse>('/vote', {
    chosenId,
    questionId,
  });

  skip = ({ questionId }:{ questionId: number }) => this.post<SkipResponse>('/vote/skip', { questionId });

  fetchNotificationSettings = () => this.get<NotificationSettingsResponse>('/fcm');

  toggleNotificationSetting = (type:'hour' | 'chosen') => this.post<NotificationSettingsResponse>(`/fcm/${type}`);
}

export const apiService = new ApiService();
