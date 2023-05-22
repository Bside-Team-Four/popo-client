import styled from 'styled-components';

import InviteFriends from './InviteFriends';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';

export default function Profile() {
  return (
    <Container>
      <ProfileHeader />
      <ProfileInfo />
      <GrayBar data-testid="graybar" />
      <InviteFriends />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const GrayBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${({ theme }) => theme.color.componentBackground.bg02};
  margin-bottom: 40px;
`;
