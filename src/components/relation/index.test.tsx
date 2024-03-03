import { screen } from '@testing-library/react';

import user from '@/fixtures/user';
import useGetInfiniteRelations from '@/hooks/api/useGetInfiniteRelations';
import { renderWithProviders } from '@/utils/testHelper';

import Search from './index';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));
jest.mock('@/hooks/api/useGetInfiniteRelations');
jest.mock('usehooks-ts', () => ({
  useDarkMode: () => ({ isDarkMode: false }),
  useDebounce: (value: string) => value,
}));

describe('Search', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetInfiniteRelations as jest.Mock).mockImplementation(() => ({
      userData: given.userData,
      refState: { lastItemRef: { current: null } },
    }));
  });

  const renderSearch = () => renderWithProviders(<Search />);

  context('팔로우 혹은 팔로워가 있으면', () => {
    given('userData', () => user);

    it('결과를 보여준다.', () => {
      renderSearch();

      expect(screen.getAllByTestId('user-card')[0]).toBeInTheDocument();
    });
  });
});
