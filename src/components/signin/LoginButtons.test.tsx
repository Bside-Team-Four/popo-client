import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import LoginButtons from './LoginButtons';

describe('LoginButtons', () => {
  const renderButtons = (isActive = false) => renderWithProviders(
    <LoginButtons isActive={isActive} />,
  );

  it('renders buttons', () => {
    renderButtons();

    expect(screen.getByText(/로그인/)).toBeInTheDocument();
    expect(screen.getByText(/이메일로 회원가입/)).toBeInTheDocument();
  });

  context('when isActive is true', () => {
    it('SubmitButton이 활성화 된다.', () => {
      renderButtons(true);

      expect(screen.getByText(/로그인/)).not.toBeDisabled();
    });
  });

  context('when isActive is false', () => {
    it('SubmitButton이 disabled 된다.', () => {
      renderButtons();

      expect(screen.getByText(/로그인/)).toBeDisabled();
    });
  });
});
