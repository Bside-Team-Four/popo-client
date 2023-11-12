type User = {
  userId: number;
  profileImg: string;
  name: string;
  schoolName: string;
  grade: number;
  gender: 'MALE' | 'FEMALE';
  isFollow: boolean;
  relationId: number;
};

export default User;
