import Poll from '@/types/Poll';
import PollStatus from '@/types/PollStatus';
import ProfileType from '@/types/ProfileType';
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

export type GetUserReq = {
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

export type GetUserResponse = {
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

export type FollowInfo = {
  gender: string,
  grade: number,
  isFollow: boolean,
  name: string,
  profileImg?: string,
  schoolName: string,
  userId: number
};

export type PostCancelFollowUserReq = {
  relationId: number
};

export type PostCancelFollowUserRes = {
  code: number,
  message: string,
  value: any
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

export type GetMyProfileResponse = DefaultResponse & {
  value: ProfileType;
};

export type GetPollListResponse = DefaultResponse & {
  value:{
    totalQuestionCount: number;
    userCurrentIndex: number;
    polls: Poll[];
  }
};

export type VoteResponse = DefaultResponse;

export type SkipResponse = DefaultResponse;
