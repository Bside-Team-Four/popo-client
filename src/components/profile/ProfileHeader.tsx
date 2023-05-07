import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styled from 'styled-components';

export default function ProfileHeader() {
  const router = useRouter();

  const onClickSettingIcon = () => router.push('/setting');

  return (
    <Container>
      <SettingIcon onClick={onClickSettingIcon} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
`;

const SettingIcon = styled(Image).attrs({
  src: '/images/setting-icon.svg',
  width: 40,
  height: 40,
  alt: 'setting icon',
  priority: true,
})``;
