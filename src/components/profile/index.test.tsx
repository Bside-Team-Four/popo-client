import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import Profile from './index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Profile', () => {
  it('GrayBar를 화면에 보여준다.', () => {
    renderWithProviders(<Profile />);

    expect(screen.getByTestId('graybar')).toBeInTheDocument();
  });
});
