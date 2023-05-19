import School from '@/types/School';

type DefaultResponse = {
  code: number;
  message: string;
};

export type GetSchoolsResponse = DefaultResponse & {
  content: School[];
  first: boolean;
  last: boolean;
  number: number;
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
