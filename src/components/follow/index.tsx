import { useState } from 'react';

import Image from 'next/image';

import styled from 'styled-components';

import FriendBox, { FriendBoxProps } from '@/components/search/FriendBox';
import useGetFollowee from '@/hooks/api/useGetFollowee';
import useGetFollower from '@/hooks/api/useGetFollower';

export default function FollowPage() {
  const [curMenu, setCurMenu] = useState('');
  const { followeeData } = useGetFollowee();
  const { followerData } = useGetFollower();

  return (
    <Container>
      <Flexbox>
        <MenuButton active>팔로워</MenuButton>
        <MenuButton active={false}>팔로잉</MenuButton>
      </Flexbox>
      <Wrapper>
        {followeeData ? followeeData?.value?.map((eachFriend: FriendBoxProps) => (
          <FriendBox
            key={eachFriend.userId}
            {...eachFriend}
          />
        ))
          : (
            <NoResultWrapper>
              <NoResultImg src="/images/search.svg" width="96" height="96" alt="" />
              <NoResultText>팔로우한 친구가 없어요.</NoResultText>
            </NoResultWrapper>
          )}
        {followerData ? followerData?.value?.map((eachFriend: FriendBoxProps) => (
          <FriendBox
            key={eachFriend.userId}
            {...eachFriend}
          />
        ))
          : (
            <NoResultWrapper>
              <NoResultImg src="/images/search.svg" width="96" height="96" alt="" />
              <NoResultText>팔로잉한 친구가 없어요.</NoResultText>
            </NoResultWrapper>
          )}
      </Wrapper>
    </Container>
  );
}

const Flexbox = styled.div`
  display: flex;
`;

const MenuButton = styled.div`
    color: ${({ active }) => (active ? ({ theme }) => theme.color.text.title01 : ({ theme }) => theme.color.text.subTitle01)}
`;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.color.background};
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 72px;
  flex-direction: column;
  overflow: scroll;
  height: auto;
  align-items: center;
`;

const FriendBoxWrapper = styled.div`
  width: 100%
`;

const NoResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
`;

const NoResultImg = styled(Image)`
  margin-bottom: 40px;
`;

const NoResultText = styled.span`
  color: ${({ theme }) => theme.color.text.title01};
`;
