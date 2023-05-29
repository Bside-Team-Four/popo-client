import { MouseEvent, useEffect, useState } from 'react';

import Image from 'next/image';

import styled from 'styled-components';

import FriendBox, { FriendBoxProps } from '@/components/search/FriendBox';
import useGetFollowee from '@/hooks/api/useGetFollowee';
import useGetFollower from '@/hooks/api/useGetFollower';

// folloewee > 나를 팔로잉한 사람 | follower > 내가 팔로우한 사람들
export default function FollowPage() {
  const [curMenu, setCurMenu] = useState('');
  const [curList, setCurList] = useState();
  const [curPage, setCurPage] = useState(1);
  // eslint-disable-next-line max-len
  const { followeeData, isLoading: isFolloweeLoading, refetch: followeeRefetch } = useGetFollowee({ size: 10 });
  // eslint-disable-next-line max-len
  const { followerData, isLoading: isFollowerLoading, refetch: followerRefetch } = useGetFollower({ size: 10 });

  const handleFollowListBtn = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.target as HTMLButtonElement;
    setCurMenu(value);
    setCurList(value === 'followee' ? followeeData.value : followerData.value);
  };

  useEffect(() => {
    if (curList && curList.length === 10 * curPage) {
      const lastId = curList[curList.length - 1].userId;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      curMenu === 'followee' ? setCurList([curList, followeeRefetch({ lastId, size: 10 }).value]) : setCurList([curList, followerRefetch({ lastId, size: 10 }).value]);
      setCurPage(curPage + 1);
    }
  }, [curList, curMenu, curPage, followeeRefetch, followerRefetch]);

  return (
    <Container>
      <Flexbox>
        <StyledImg src="/images/back-arrow.svg" width="16" height="16" alt="back" />
      </Flexbox>
      <Flexbox>
        <MenuButton active={curMenu === 'followee'} value="followee" onClick={handleFollowListBtn}> 팔로워</MenuButton>
        <MenuButton active={curMenu === 'follower'} value="follower" onClick={handleFollowListBtn}>팔로잉</MenuButton>
      </Flexbox>
      <Wrapper>
        {curList && curList.length > 0 ? curList.map((eachFriend: FriendBoxProps) => (
          <FriendBox
            key={eachFriend.userId}
            {...eachFriend}
          />
        ))
          : (
            <NoResultWrapper>
              <NoResultImg src="/images/no-follow.svg" width="96" height="96" alt="" />
              <NoResultText>팔로워 친구가 없어요.</NoResultText>
            </NoResultWrapper>
          )}
      </Wrapper>
    </Container>
  );
}

const Flexbox = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const MenuButton = styled.button<{ active: boolean }>`
    color: ${(props) => (props.active ? ({ theme }) => theme.color.text.title01 : ({ theme }) => theme.color.text.subTitle01)};
    cursor: pointer;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 200;
    font-size: 34px;
    line-height: 41px;
    /* identical to box height, or 121% */

    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.025em;

    /* reset.css */
    background: inherit;
    border: none;
    box-shadow: none;
    overflow: visible;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.color.background};
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
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

const StyledImg = styled(Image)`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const NoResultText = styled.span`
  color: ${({ theme }) => theme.color.text.title01};
`;
