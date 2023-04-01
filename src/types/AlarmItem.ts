type UserInfo = {
  gender: string;
  schoolInfo: string;
  gradeInfo: string;
};

type AlarmItem = {
  title: string;
  createdAt: string;
  userInfo: UserInfo;
};

export default AlarmItem;
