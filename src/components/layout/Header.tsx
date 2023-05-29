'use client';

import { usePathname, useRouter } from 'next/navigation';

import styled from 'styled-components';

import CloseIcon from '@/lib/assets/close-icon.svg';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.replace('/signin');
  };

  return (
    <Container>
      {pathname !== '/signin' && <CloseButton onClick={onClick} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 48px;
`;

const CloseButton = styled(CloseIcon)`
  margin-right: 10px;
  path {
    stroke: ${({ theme }) => theme.color.text.title01};
  };
`;
