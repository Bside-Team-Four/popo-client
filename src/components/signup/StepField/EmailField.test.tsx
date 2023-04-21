import { screen } from '@testing-library/react';

import signupField from '@/fixtures/signupField';
import { renderWithProviders } from '@/utils/testHelper';

import EmailField from './EmailField';

describe('EmailField', () => {
  it('이메일 입력 필드를 화면에 보여준다.', () => {
    renderWithProviders(<EmailField email={signupField.email} />);

    expect(screen.getByText('이메일')).toBeInTheDocument();
  });
});
