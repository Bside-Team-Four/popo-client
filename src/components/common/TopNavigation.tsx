'use client';

import { usePathname } from 'next/navigation';

import styled from 'styled-components';

import { b1Font } from '@/styles/fontStyles';

const NavItems: { title: string; url: string }[] = [
  {
    title: 'PoPo',
    url: '/',
  },
  {
    title: '알림',
    url: '/alarm',
  },
  {
    title: '친구추가',
    url: '/search',
  },
  {
    title: '프로필',
    url: '/profile',
  },
];

export default function TopNavigation() {
  const pathname = usePathname();

  return (
    <Wrapper>
      {NavItems.map(
        (item) => pathname === item.url && <B1 key={item.title}>{item.title}</B1>,
      )}
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border-bottom: 1px solid #ECECF2;
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: ${({ theme }) => theme.color.white};
`;

const B1 = styled.div`
  ${b1Font};
  color: ${({ theme }) => theme.color.black};
  font-weight: 700;
`;
