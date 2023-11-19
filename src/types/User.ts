type User = {
  userId: number;
  profileImg: string;
  name: string;
  schoolName: string;
  grade: number;
  gender: 'MALE' | 'FEMALE';
  isFollow: boolean;
  relationId: number | null;
};

export default User;
