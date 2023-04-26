import School from '@/types/School';

export type GetSchoolsResponse = {
  content: School[]
};

export type AuthenticateResponse = {
  code: number;
  message: string;
  value:{
    token: string;
  }
};
