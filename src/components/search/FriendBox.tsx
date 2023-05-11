import styled from 'styled-components';

import SearchUserProfile from '@/components/common/SearchUserProfile';

export type FriendBoxProps = {
  idx: number;
  profileImg: string;
  name: string;
  schoolInfo: string;
  isFollowing: boolean;
};

export default function FriendBox({
  idx,
  profileImg,
  name,
  schoolInfo,
  isFollowing,
}: FriendBoxProps) {
  return (
    <Wrapper>
      <SearchUserProfile gender="female" size={44} />
      <Container>
        <NameDiv>{name}</NameDiv>
        <SchoolDiv>{schoolInfo}</SchoolDiv>
      </Container>
      <FollowBtn active={isFollowing}>
        {isFollowing ? '팔로우' : '팔로잉'}
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
