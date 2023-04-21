import { screen } from '@testing-library/react';

import signupField from '@/fixtures/signupField';
import { renderWithProviders } from '@/utils/testHelper';

import CertificationField from './CertificationField';

describe('CertificationField', () => {
  it('인증번호 입력 필드를 화면에 보여준다.', () => {
    renderWithProviders(
      <CertificationField certificationNumber={signupField.certificationNumber} />,
    );

    expect(screen.getByText('인증번호')).toBeInTheDocument();
  });
});
