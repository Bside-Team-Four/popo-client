export type RewardType = 'ADD' | 'USE';

type Reward = {
  id: number;
  type: RewardType;
  date: string;
  point: number;
};

export default Reward;
