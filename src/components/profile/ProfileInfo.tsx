import styled from 'styled-components';

import fixtures from '@/fixtures';

import ProfileCount from './ProfileCount';
import ProfileDetail from './ProfileDetail';

export default function ProfileInfo() {
  const { profile } = fixtures;

  return (
    <Container>
      <ProfileDetail
        userName={profile.userName}
        schoolName={profile.schoolName}
        grade={profile.grade}
        reward={profile.reward}
        gender={profile.gender}
        profileImageUrl={profile.profileImageUrl}
      />
      <ProfileCount
        selectedPOPOCount={profile.selectPOPOCount}
        selectPOPOCount={profile.selectPOPOCount}
        followerCount={profile.followerCount}
        followingCount={profile.followingCount}
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
