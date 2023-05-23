import styled from 'styled-components';

import FixedSpinner from '@/components/common/FixedSpinner';
import LoadingHandler from '@/components/common/LoadingHandler';
import useGetMyProfile from '@/hooks/api/useGetMyProfile';
import ProfileType from '@/types/ProfileType';

import InviteFriends from './InviteFriends';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';

export default function Profile() {
  const { isLoading, data } = useGetMyProfile();

  return (
    <Container>
      <LoadingHandler isLoading={isLoading || !data} loadingComponent={<FixedSpinner type="normal" />}>
        <>
          <ProfileHeader />
          <ProfileInfo data={data as ProfileType} />
          <GrayBar data-testid="graybar" />
          <InviteFriends />
        </>
      </LoadingHandler>
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
