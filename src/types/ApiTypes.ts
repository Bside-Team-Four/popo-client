import PollStatus from '@/types/PollStatus';
import School from '@/types/School';

type DefaultResponse = {
  code: number;
  message: string;
};

export type GetSchoolsResponse = DefaultResponse & {
  value:{
    content: School[]
    first: boolean;
    last: boolean;
    number: number;
  };
};

export type AuthenticateResponse = DefaultResponse & {
  value:{
    token: string;
  };
};

export type GetUserBySchoolReq = {
  keyword: string,
  type: string,
  lastId?: number,
  size: number,
};

export type PasswordMissingResponse = DefaultResponse & {
  value:{
    userId: number;
  }
};

export type PasswordMissingAuthResponse = DefaultResponse;

export type PasswordResetResponse = DefaultResponse;

export type SignUpSendEmailResponse = DefaultResponse;

export type SignUpAuthEmailResponse = DefaultResponse;

export type SignUpResponse = DefaultResponse & {
  value:{
    token: string;
    userId: number;
  };
};

export type GetUserBySchoolResponse = {
  code: number;
  message: string;
  value: [
    {
      userId: number;
      profileImg: string;
      name: string;
      schoolName: string;
      grade: number;
      isFollow: boolean;
    },
  ];
};

export type PostFollowUserReq = {
  followeeId: number
};

export type PostFollowUserRes = {
  code: number,
  message: string,
  value: {
    relationId: number,
    followerId: number,
    followerName: string,
    followerProfileImage: string,
    gender: string
  }
};

export type GetPollStatusResponse = DefaultResponse & {
  value:{
    status: PollStatus;
  }
};
