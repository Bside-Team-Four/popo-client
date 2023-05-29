import { useRouter } from 'next/navigation';

import { fireEvent, screen } from '@testing-library/react';

import ProfileDetail from '@/components/profile/ProfileDetail';
import fixtures from '@/fixtures';
import { renderWithProviders } from '@/utils/testHelper';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ProfileDetail', () => {
  const writeText = jest.fn();
  const routerPush = jest.fn();

  Object.assign(navigator, {
    clipboard: {
      writeText,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: routerPush,
    }));
  });

  const renderProfileDetail = () => renderWithProviders(
    <ProfileDetail {...fixtures.profile} gender={given.gender} />,
  );

  it('프로필 정보를 화면에 보여준다.', () => {
    given('gender', () => 'MALE');

    renderWithProviders(<ProfileDetail {...fixtures.profile} />);

    fireEvent.click(screen.getByText('프로필 공유'));

    expect(screen.getByText(fixtures.profile.userName)).toBeInTheDocument();
    expect(screen.getByText('포포 고등학교 1학년 남자')).toBeInTheDocument();
    expect(screen.getByText('21 PPP')).toBeInTheDocument();
  });

  context('성별이 여성일 경우', () => {
    given('gender', () => 'FEMALE');

    it('여자 성별을 화면에 보여준다.', () => {
      renderProfileDetail();

      expect(screen.getByText('포포 고등학교 1학년 여자')).toBeInTheDocument();
    });
  });

  it('리워드 정보를 클릭할 경우, 리워드 이용내역 페이지로 이동한다.', () => {
    given('gender', () => 'MALE');
    renderProfileDetail();

    fireEvent.click(screen.getByText('21 PPP'));

    expect(routerPush).toHaveBeenCalledWith('/reward-history');
  });
});
