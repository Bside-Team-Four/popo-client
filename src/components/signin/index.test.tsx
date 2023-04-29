import { useRouter } from 'next/navigation';

import { fireEvent, screen } from '@testing-library/react';

import SignIn from '@/components/signin/index';
import { renderWithProviders } from '@/utils/testHelper';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SingIn', () => {
  const routerPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: routerPush,
    }));
  });

  const renderSignIn = () => renderWithProviders(<SignIn />);

  it('비밀번호 찾기 버튼 작동', () => {
    renderSignIn();

    const findPasswordButton = screen.getByRole('button', { name: '비밀번호 찾기' });

    expect(findPasswordButton).toBeInTheDocument();

    fireEvent.click(findPasswordButton);

    expect(routerPush).toHaveBeenCalledWith('/find-password');
  });
});
