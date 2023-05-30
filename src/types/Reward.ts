export type RewardType = 'ADD' | 'USE';

type Reward = {
  historyId: number;
  type: RewardType;
  regDt: string;
  amount: number;
  remainAmount: number;
};

export default Reward;
