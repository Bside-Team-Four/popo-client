import { screen } from '@testing-library/react';

import fixtures from '@/fixtures';
import { renderWithProviders } from '@/utils/testHelper';

import ProfileInfo from './ProfileInfo';

describe('ProfileInfo', () => {
  it('프로필 정보를 화면에 보여준다.', () => {
    renderWithProviders(<ProfileInfo data={fixtures.profile} />);

    expect(screen.getByText('Test POPO')).toBeInTheDocument();
    expect(screen.getByText('포포 고등학교 1학년 남자')).toBeInTheDocument();
    expect(screen.getByText('21 PPP')).toBeInTheDocument();
  });
});
