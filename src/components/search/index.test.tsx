import { screen } from '@testing-library/react';

import user from '@/fixtures/user';
import useGetInfiniteUsers from '@/hooks/api/useGetInfiniteUsers';
import { renderWithProviders } from '@/utils/testHelper';

import Search from './index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/useGetInfiniteUsers');
jest.mock('usehooks-ts', () => ({
  useDarkMode: () => ({ isDarkMode: false }),
  useDebounce: (value: string) => value,
}));

describe('Search', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetInfiniteUsers as jest.Mock).mockImplementation(() => ({
      userData: given.userData,
      refState: { lastItemRef: { current: null } },
    }));
  });

  const renderSearch = () => renderWithProviders(<Search />);

  context('검색 결과가 있으면', () => {
    given('userData', () => user);

    it('결과를 보여준다.', () => {
      renderSearch();

      expect(screen.getAllByTestId('user-card')[0]).toBeInTheDocument();
    });
  });
});
