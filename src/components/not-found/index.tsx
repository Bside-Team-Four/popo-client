import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import SmallButton from '@/components/common/SmallButton';

export default function NotFound() {
  const router = useRouter();

  const onClick = () => {
    router.replace('/');
  };

  return (
    <Container>
      <NotFoundImage />
      <NotFoundMessage>페이지를 찾을 수 없어요</NotFoundMessage>
      <SmallButton onClick={onClick}>홈으로 돌아가기</SmallButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.background};
  width: 100%;
  height: 100%;
`;

const NotFoundImage = styled(Image).attrs({
  src: '/images/not-found-icon.svg',
  width: 67,
  height: 84,
  alt: 'not found image',
  priority: true,
})`
  margin-bottom: 24px;
`;

const NotFoundMessage = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 120%;
  margin-bottom: 35px;
  color: ${({ theme }) => theme.color.text.title01};
`;
