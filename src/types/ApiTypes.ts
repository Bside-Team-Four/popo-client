import School from '@/types/School';

export type GetSchoolsResponse = {
  content: School[];
  first: boolean;
  last: boolean;
  number: number;
};

export type AuthenticateResponse = {
  code: number;
  message: string;
  value:{
    token: string;
  }
};
