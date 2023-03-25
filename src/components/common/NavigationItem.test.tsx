import { usePathname } from 'next/navigation';

import { render, screen } from '@testing-library/react';

import NavItem from '@/types/NavItem';

import NavigationItem from './NavigationItem';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const fixturesNavItem:NavItem = {
  title: 'PoPo',
  url: '/',
  activeIcon: 'popo-active',
  inactiveIcon: 'popo-inactive',
};
describe('NavigationItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (usePathname as jest.Mock).mockImplementation(() => given.pathname);
  });
  const renderNavigationItem = () => render(<NavigationItem item={fixturesNavItem} />);

  it('item props 를 받은대로 잘 렌더링하는가', () => {
    given('pathname', () => fixturesNavItem.url);

    renderNavigationItem();

    expect(screen.getByText(fixturesNavItem.title)).toBeInTheDocument();
    expect(screen.getByAltText(`${fixturesNavItem.title} icon`)).toBeInTheDocument();
  });

  context('url이 navigation item의 url과 일치할 경우(isActive: true)', () => {
    given('pathname', () => fixturesNavItem.url);

    it('icon 이미지가 activeIcon 이어야 하고, title 의 색상이 검은색이어야 한다.', () => {
      renderNavigationItem();

      expect(screen.getByText(fixturesNavItem.title)).toHaveStyleRule('color', '#1E1928');
      expect(screen.getByAltText(`${fixturesNavItem.title} icon`)).toHaveAttribute('src', `/images/${fixturesNavItem.activeIcon}.svg`);
    });
  });

  context('url이 navigation item의 url과 일치하지 않을 경우(isActive: false)', () => {
    given('pathname', () => '/alarm');

    it('icon 이미지가 inactiveIcon 이어야 하고, title 의 색상이 회색이어야 한다.', () => {
      renderNavigationItem();

      expect(screen.getByText(fixturesNavItem.title)).toHaveStyleRule('color', '#A19EAB');
      expect(screen.getByAltText(`${fixturesNavItem.title} icon`)).toHaveAttribute('src', `/images/${fixturesNavItem.inactiveIcon}.svg`);
    });
  });
});
