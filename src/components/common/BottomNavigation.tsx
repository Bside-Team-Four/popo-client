'use client';

import styled from 'styled-components';

import NavItem from '@/types/NavItem';

import NavigationItem from './NavigationItem';

const NavItems: NavItem[] = [
  {
    title: 'PoPo',
    url: '/',
    activeIcon: 'popo-active',
    inactiveIcon: 'popo-inactive',
  },
  {
    title: '알림',
    url: '/alarm',
    activeIcon: 'alarm-active',
    inactiveIcon: 'alarm-inactive',
  },
  {
    title: '친구추가',
    url: '/search',
    activeIcon: 'friends-active',
    inactiveIcon: 'friends-inactive',
  },
  {
    title: '프로필',
    url: '/profile',
    activeIcon: 'profile-active',
    inactiveIcon: 'profile-inactive',
  },
];

export default function BottomNavigation() {
  return (
    <Wrapper>
      {NavItems.map((item) => (
        <NavigationItem
          key={item.title}
          item={item}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 430px;
  height: 84px;
  padding: 0 48px;
  background-color: #FBFBFB;
  border-radius: 24px 24px 0 0;
  border: 1px solid #EEEEEE;
  backdrop-filter: blur(15px);
`;
