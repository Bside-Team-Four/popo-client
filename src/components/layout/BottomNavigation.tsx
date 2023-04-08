'use client';

import styled from 'styled-components';

import Navigation from '@/types/Navigation';

import NavigationItem from './NavigationItem';

const NavItems: Navigation[] = [
  {
    title: 'POPO',
    url: '/',
  },
  {
    title: 'WHO',
    url: '/alarm',
  },
  {
    title: 'FRIEND',
    url: '/search',
  },
  {
    title: 'PROFILE',
    url: '/profile',
  },
];

export default function BottomNavigation() {
  return (
    <Container>
      {NavItems.map(({ title, url }) => (
        <NavigationItem
          key={title}
          title={title}
          url={url}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 430px;
  height: 90px;
  background-color: ${({ theme }) => theme.color.background};
  border-top: 1px solid ${({ theme }) => theme.color.componentBackground.bg02};
  backdrop-filter: blur(15px);
`;
