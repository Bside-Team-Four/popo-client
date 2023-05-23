import { fireEvent, screen } from '@testing-library/react';

import ProfileDetail from '@/components/profile/ProfileDetail';
import fixtures from '@/fixtures';
import { renderWithProviders } from '@/utils/testHelper';

describe('ProfileDetail', () => {
  const writeText = jest.fn();

  Object.assign(navigator, {
    clipboard: {
      writeText,
    },
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
});
