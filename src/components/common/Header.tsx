'use client';

import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import BackIcon from '@/lib/assets/back-icon.svg';

type Props = {
  title: string;
};

export default function Header({ title }:Props) {
  const router = useRouter();

  const onBack = () => router.back();

  return (
    <Container>
      <BackButton data-testid="back-button" onClick={onBack} />
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 72px;
  height: 72px;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled(BackIcon)`
  position: absolute;
  left: 16px;
  top: 21px;
  path{
    fill: ${({ theme }) => theme.color.text.title02};
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: ${({ theme }) => theme.color.text.title01};
`;
