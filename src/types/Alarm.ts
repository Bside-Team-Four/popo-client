import Hint from '@/types/Hint';
import User from '@/types/User';

type Alarm = {
  title: string;
  createdAt: string;
  userInfo: User;
  hints?: Hint[];
};

export default Alarm;
