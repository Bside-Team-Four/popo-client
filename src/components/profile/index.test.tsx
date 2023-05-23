import { screen } from '@testing-library/react';

import fixtures from '@/fixtures';
import useGetMyProfile from '@/hooks/api/useGetMyProfile';
import { renderWithProviders } from '@/utils/testHelper';

import Profile from './index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/api/useGetMyProfile');

describe('Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetMyProfile as jest.Mock).mockImplementation(() => ({
      isLoading: given.isLoading,
      data: given.data,
    }));
  });

  const renderProfile = () => renderWithProviders(<Profile />);

  context('프로필 데이터를 불러 오고 있을 경우(로딩 중일 경우)', () => {
    given('isLoading', () => true);
    given('data', () => undefined);

    it('로딩 스피너가 보여야 한다.', () => {
      renderProfile();

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  context('프로필 데이터를 불러 온 경우', () => {
    given('isLoading', () => false);
    given('data', () => fixtures.profile);

    it('프로필이 보여야 한다.', () => {
      renderProfile();

      expect(screen.getByText('Test POPO')).toBeInTheDocument();
      expect(screen.getByText('팔로워')).toBeInTheDocument();
    });
  });
});
