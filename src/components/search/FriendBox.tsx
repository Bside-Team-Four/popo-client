import { useState } from 'react';

import styled from 'styled-components';

import SearchUserProfile from '@/components/common/SearchUserProfile';
import usePostCancelFollowUser from '@/hooks/api/usePostCancelFollowUser';
import usePostFollowUser from '@/hooks/api/usePostFollowUser';

export type FriendBoxProps = {
  relationId: number;
  grade: number;
  profileImg?: string;
  name: string;
  schoolName: string;
  isFollow: boolean;
  userId: number;
  gender?: string;
};

export default function FriendBox({
  relationId,
  grade,
  profileImg,
  name,
  schoolName,
  isFollow,
  userId,
  gender,
}: FriendBoxProps) {
  const [followUserId, setFollowUserId] = useState<number>(userId);
  const [followStatus, setFollowStatus] = useState<boolean>(!!isFollow);
  const { followData, isLoading, refetch } = usePostFollowUser({ followeeId: followUserId });
  // eslint-disable-next-line max-len
  const { cancelFollowData, refetch: refetchCancelFollow } = usePostCancelFollowUser({ relationId });

  const handleFollow = () => {
    setFollowUserId(userId);

    if (followStatus === true) {
      // 만약 현재 팔로우 중이라면?
      // alert('팔로우중입니다.');
      setFollowStatus(false);
      refetchCancelFollow({ relationId });
    } else {
      // 만약 현재 팔로우 중이 아니라면?
      setFollowUserId(userId);
      setFollowStatus(true);
      refetch();
    }

    setFollowStatus(true);
  };

  // useEffect(() => {
  //   console.log("followData", followData)
  //   setRelationId(followData.relationId || 0);
  // }, [followData]);

  return (
    <Wrapper>
      <SearchUserProfile gender={gender} size={44} />
      <Container>
        <NameDiv>{name}</NameDiv>
        <SchoolDiv>{`${schoolName} ${grade}학년 ${gender === 'MALE' ? '남자' : '여자'}`}</SchoolDiv>
      </Container>
      <FollowBtn active={followStatus} onClick={handleFollow}>
        {followStatus === true ? '팔로우' : '팔로잉'}
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

  color: ${(props) => (props.active === true ? '#838393' : '#AF52DE')};
`;
