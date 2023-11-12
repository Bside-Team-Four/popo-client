import Poll from '@/types/Poll';
import PollStatus from '@/types/PollStatus';
import ProfileType from '@/types/ProfileType';
import School from '@/types/School';
import User from '@/types/User';

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

export type GetUsersResponse = DefaultResponse & {
  value: User[]
};

export type AuthenticateResponse = DefaultResponse & {
  value:{
    token: string;
  }
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
