import { useState } from 'react';

import styled from 'styled-components';

import SearchUserProfile from '@/components/common/SearchUserProfile';
import usePostFollowUser from '@/hooks/api/usePostFollowUser';

export type FriendBoxProps = {
  grade: number;
  profileImg: string;
  name: string;
  schoolName: string;
  isFollow?: boolean;
  userId?: number;
  gender?: string;
};

export default function FriendBox({
  grade,
  profileImg,
  name,
  schoolName,
  isFollow,
  userId,
  gender,
}: FriendBoxProps) {
  const [followUserId, setFollowUserId] = useState<number>(0);
  const { followData } = usePostFollowUser({ followeeId: followUserId });

  const doFollow = () => {
    setFollowUserId(userId);
  };

  return (
    <Wrapper>
      <SearchUserProfile gender={gender} size={44} />
      <Container>
        <NameDiv>{name}</NameDiv>
        <SchoolDiv>{`${schoolName} ${grade}학년 ${gender === 'MALE' ? '남자' : '여자'}`}</SchoolDiv>
      </Container>
      <FollowBtn active={isFollow} onClick={doFollow}>
        {isFollow ? '팔로우' : '팔로잉'}
      </FollowBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  width: 100%;
  border-radius: 13px;
  padding: 8px 16px;
  background-color: #ffffff;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 0 8px;
  overflow: hidden;
`;

const NameDiv = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
`;

const SchoolDiv = styled.div`
  line-height: 20px;
  color: rgba(60, 60, 67, 0.6);
`;

const FollowBtn = styled.button<{ active: boolean }>`
  /* reset.css */
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;

  font-size: 15px;
  line-height: 20px;
  min-width: 40px;

  color: ${(props) => (props.active ? '#838393' : '#AF52DE')};
`;
