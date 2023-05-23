import styled from 'styled-components';

import CountItem from './CountItem';

type ProfileCountProps = {
  votedCount: number,
  voteCount: number,
  followerCount: number,
  followingCount: number,
};

export default function ProfileCount({
  votedCount,
  voteCount,
  followerCount,
  followingCount,
}: ProfileCountProps) {
  return (
    <Container>
      <CountItem title="선택된 POPO" count={votedCount} />
      <CountItem title="선택한 POPO" count={voteCount} />
      <CountItem title="팔로워" count={followerCount} />
      <CountItem title="팔로잉" count={followingCount} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 46px;
`;
