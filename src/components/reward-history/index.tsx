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
        id, type, date, point,
      }) => (
        <RewardItem key={id} type={type} date={date} point={point} />
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
