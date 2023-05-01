import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import SettingButtons from '@/components/common/SettingButtons';
import SignTitle from '@/components/common/SignTitle';

export default function ProfileImage() {
  const router = useRouter();

  const onClick = () => {
    router.push('/');
  };

  const onSkip = () => {
    router.push('/');
  };

  return (
    <Container>
      <SignTitle>{'프로필 사진을\n등록해주세요'}</SignTitle>
      <ImageContainer>
        <Profile>
          <PImage
            src="/images/avatar-icon.svg"
            alt="default image"
            priority
            fill
          />
          <CameraImage />
        </Profile>
      </ImageContainer>
      <SettingButtons isSetting onClick={onClick} onSkip={onSkip} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;;
  justify-content: center;
  padding: 49px 24px 0;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  width: 166px;
  height: 166px;
  border-radius: 100px;
`;

const PImage = styled(Image)`
  cursor: pointer;
  border-radius: 100px;
`;

const CameraImage = styled(Image).attrs({
  src: '/images/camera-icon.svg',
  width: 40,
  height: 40,
  priority: true,
  alt: 'camera icon',
})`
  position: absolute;
  bottom: 6px;
  right: 16px;
`;
