import { usePathname } from 'next/navigation';

import { screen } from '@testing-library/react';

import { renderWithThemeProviders } from '@/utils/testHelper';

import NavigationItem from './NavigationItem';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('NavigationItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (usePathname as jest.Mock).mockImplementation(() => given.pathname);
  });
  const renderNavigationItem = () => renderWithThemeProviders(
    <NavigationItem url={given.url} title={given.title} />,
  );

  it('item props rendering', () => {
    given('pathname', () => '/');
    given('url', () => '/');
    given('title', () => 'POPO');

    renderNavigationItem();

    expect(screen.getByText('POPO')).toBeInTheDocument();
  });

  context('title에 맞게 아이콘을 출력', () => {
    given('pathname', () => '/');
    given('url', () => '/');

    it('title이 POPO일때 POPO 아이콘을 출력', () => {
      given('title', () => 'POPO');

      renderNavigationItem();

      expect(screen.getByTestId('popo-icon')).toBeInTheDocument();
    });
    it('title이 WHO일때 WHO 아이콘을 출력', () => {
      given('title', () => 'WHO');

      renderNavigationItem();

      expect(screen.getByTestId('who-icon')).toBeInTheDocument();
    });
    it('title이 FRIEND일때 FRIEND아이콘을 출력', () => {
      given('title', () => 'FRIEND');

      renderNavigationItem();

      expect(screen.getByTestId('friend-icon')).toBeInTheDocument();
    });
    it('title이 PROFILE일때 MY 아이콘을 출력', () => {
      given('title', () => 'PROFILE');

      renderNavigationItem();

      expect(screen.getByTestId('my-icon')).toBeInTheDocument();
    });
  });

  context('현재 url이 NavigationItem의 url과 일치할 경우 - (isActive: true)', () => {
    given('pathname', () => '/');
    given('url', () => '/');
    given('title', () => 'POPO');

    it('icon 이미지의 fill이 #000000이고 title의 font-weight가 600이어야 한다.', () => {
      renderNavigationItem();

      expect(screen.getByText('POPO')).toHaveStyleRule('font-weight', '600');
      expect(screen.getByTestId('popo-icon')).toHaveStyleRule('fill', '#000000');
    });
  });

  context('현재 url이 NavigationItem의 url과 일치하지 않을 경우 - (isActive: false)', () => {
    given('pathname', () => '/alarm');
    given('url', () => '/');
    given('title', () => 'POPO');

    it('icon 이미지의 fill이 none이고 title의 font-weight가 400이어야 한다.', () => {
      renderNavigationItem();

      expect(screen.getByText('POPO')).toHaveStyleRule('font-weight', '400');
      expect(screen.getByTestId('popo-icon')).toHaveStyleRule('fill', 'none');
    });
  });
});
