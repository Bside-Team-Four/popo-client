import User from './User';

type Alarm = Omit<User, 'profileImg' | 'name' | 'isFollow' | 'relationId'> & {
  questionContent: string,
  voteId: number,
  questionId: number,
  regDatetime: string
};

export default Alarm;
