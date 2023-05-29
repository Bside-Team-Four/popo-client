import styled from 'styled-components';

import ProfileType from '@/types/ProfileType';

import ProfileCount from './ProfileCount';
import ProfileDetail from './ProfileDetail';

type ProfileInfoProps = {
  data: ProfileType
};

export default function ProfileInfo({ data }: ProfileInfoProps) {
  return (
    <Container>
      <ProfileDetail
        userName={data.userName}
        schoolName={data.schoolName}
        grade={data.grade}
        reward={data.reward}
        gender={data.gender}
        profileImageUrl={data.profileImageUrl}
      />
      <ProfileCount
        votedCount={data.votedCount}
        voteCount={data.voteCount}
        followerCount={data.followerCount}
        followeeCount={data.followeeCount}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 218px;
  padding: 0 24px;
`;
