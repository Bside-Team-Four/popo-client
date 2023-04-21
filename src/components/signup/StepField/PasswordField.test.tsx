import { screen } from '@testing-library/react';

import signupField from '@/fixtures/signupField';
import { renderWithProviders } from '@/utils/testHelper';

import PasswordField from './PasswordField';

describe('PasswordField', () => {
  it('패스워드 입력 필드를 화면에 보여준다.', () => {
    renderWithProviders(
      <PasswordField
        password={signupField.password}
        passwordConfirm={signupField.passwordConfirm}
      />,
    );

    expect(screen.getByText('비밀번호')).toBeInTheDocument();
    expect(screen.getByText('비밀번호 확인')).toBeInTheDocument();
  });
});
