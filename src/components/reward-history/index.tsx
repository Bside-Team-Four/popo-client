import styled from 'styled-components';

import useGetInfiniteReward from '@/hooks/api/useGetInfiniteRewards';

import NotHistory from './NotHistory';
import RewardItem from './RewardItem';

export default function RewardHistory() {
  const {
    rewards, isLoading, isFetchingNextPage, refState,
  } = useGetInfiniteReward();
  return (
    <Container>
      {rewards.length ? rewards.map(({
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
        : <NotHistory />}
      {!isLoading && !isFetchingNextPage && <div ref={refState.lastItemRef} />}
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
