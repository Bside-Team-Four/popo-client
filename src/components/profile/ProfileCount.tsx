import Link from 'next/link';

import styled from 'styled-components';

import CountItem from './CountItem';

type ProfileCountProps = {
  votedCount: number,
  voteCount: number,
  followerCount: number,
  followeeCount: number,
};

export default function ProfileCount({
  votedCount,
  voteCount,
  followerCount,
  followeeCount,
}: ProfileCountProps) {
  return (
    <Container>
      <CountItem title="선택된 POPO" count={votedCount} />
      <CountItem title="선택한 POPO" count={voteCount} />
      <Link href="/relation?defaultType=follower">
        <CountItem title="팔로워" count={followerCount} />
      </Link>
      <Link href="/relation?defaultType=followee">
        <CountItem title="팔로잉" count={followeeCount} />
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 46px;
`;
