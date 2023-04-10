import { screen } from '@testing-library/react';

import LoginButtons from '@/components/signin/LoginButtons';
import { renderWithProviders } from '@/utils/testHelper';

describe('LoginButtons', () => {
  it('renders buttons', () => {
    renderWithProviders(<LoginButtons />);

    expect(screen.getByText(/로그인/)).toBeInTheDocument();
    expect(screen.getByText(/이메일로 회원가입/)).toBeInTheDocument();
  });
});
