import styled from 'styled-components';

import Reward from '@/types/Reward';

import NotHistory from './NotHistory';
import RewardItem from './RewardItem';

type RewardHistoryProps = {
  reward: Reward[];
};

export default function RewardHistory({ reward }:RewardHistoryProps) {
  return (
    <Container>
      {reward.length ? reward.map(({
        historyId, type, regDt, amount, remainAmount,
      }) => (
        <RewardItem
          key={historyId}
          type={type}
          regDt={regDt}
          amount={amount}
          remainAmount={remainAmount}
        />
      ))
        : <NotHistory /> }
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 0 24px;
  overflow: auto;
`;
