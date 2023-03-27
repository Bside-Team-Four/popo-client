import { usePathname } from 'next/navigation';

import { render, screen } from '@testing-library/react';

import fixtures from '@/fixtures';

import NavigationItem from './NavigationItem';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('NavigationItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (usePathname as jest.Mock).mockImplementation(() => given.pathname);
  });
  const renderNavigationItem = () => render(<NavigationItem item={fixtures.navItem} />);

  it('item props rendering', () => {
    given('pathname', () => fixtures.navItem.url);

    renderNavigationItem();

    expect(screen.getByText(fixtures.navItem.title)).toBeInTheDocument();
    expect(screen.getByAltText(`${fixtures.navItem.title} icon`)).toBeInTheDocument();
  });

  context('현재 url이 NavigationItem의 url과 일치할 경우 - (isActive: true)', () => {
    given('pathname', () => fixtures.navItem.url);

    it('icon 이미지가 activeIcon 이어야 하고, title 의 색상이 검은색이어야 한다.', () => {
      renderNavigationItem();

      expect(screen.getByText(fixtures.navItem.title)).toHaveStyleRule('color', '#1E1928');
      expect(screen.getByAltText(`${fixtures.navItem.title} icon`)).toHaveAttribute('src', `/images/${fixtures.navItem.activeIcon}.svg`);
    });
  });

  context('현재 url이 NavigationItem의 url과 일치하지 않을 경우 - (isActive: false)', () => {
    given('pathname', () => '/alarm');

    it('icon 이미지가 inactiveIcon 이어야 하고, title 의 색상이 회색이어야 한다.', () => {
      renderNavigationItem();

      expect(screen.getByText(fixtures.navItem.title)).toHaveStyleRule('color', '#A19EAB');
      expect(screen.getByAltText(`${fixtures.navItem.title} icon`)).toHaveAttribute('src', `/images/${fixtures.navItem.inactiveIcon}.svg`);
    });
  });
});
