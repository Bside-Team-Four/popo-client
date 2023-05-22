import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import SettingItem from '@/components/common/SettingItem';

export default function Tos() {
  const router = useRouter();

  return (
    <Container>
      <SettingItem
        title="POPO 서비스 이용약관"
        onClick={() => router.push('/setting/tos/use')}
        showArrow
      />
      <GrayBar />
      <SettingItem
        title="개인정보처리방침"
        onClick={() => router.push('/setting/tos/privacy')}
        showArrow
      />
      <GrayBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
`;

const GrayBar = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.componentBackground.bg02};
  margin: 8px 0;
`;
