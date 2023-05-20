import School from '@/types/School';

export type GetSchoolsResponse = {
  content: School[]
};

export type AuthenticateResponse = {
  code: number;
  message: string;
  value:{
    token: string;
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

export type GetUserBySchoolReq = {
  keyword: string,
  type: string,
  lastId?: number,
  size: number,
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
