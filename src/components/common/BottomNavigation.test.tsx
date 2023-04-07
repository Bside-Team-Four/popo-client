import { screen } from '@testing-library/react';

import BottomNavigation from '@/components/common/BottomNavigation';
import { renderWithProviders } from '@/utils/testHelper';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('BottomNavigation', () => {
  it('navigation items render', () => {
    renderWithProviders(<BottomNavigation />);

    expect(screen.getAllByRole('link')).toHaveLength(4);

    expect(screen.getByText('POPO')).toBeInTheDocument();
    expect(screen.getByText('WHO')).toBeInTheDocument();
    expect(screen.getByText('FRIEND')).toBeInTheDocument();
    expect(screen.getByText('PROFILE')).toBeInTheDocument();
  });
});
