import { screen } from '@testing-library/react';

import fixtures from '@/fixtures';
import { renderWithProviders } from '@/utils/testHelper';

import ProfileCount from './ProfileCount';

describe('Profile Count', () => {
  it('선택된 POPO, 선택한 POPO, 팔로워, 팔로잉 수를 보여준다.', () => {
    renderWithProviders(<ProfileCount {...fixtures.profile} />);

    expect(screen.getByText('선택된 POPO')).toBeInTheDocument();
    expect(screen.getByText('선택한 POPO')).toBeInTheDocument();
    expect(screen.getByText('팔로워')).toBeInTheDocument();
    expect(screen.getByText('팔로잉')).toBeInTheDocument();

    expect(screen.getByText('243')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('230')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });
});
