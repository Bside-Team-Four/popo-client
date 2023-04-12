import { screen } from '@testing-library/react';

import StepTitle from '@/components/find-password/StepTitle';
import { renderWithProviders } from '@/utils/testHelper';

describe('StepTitle', () => {
  const renderStepTitle = (step: number) => renderWithProviders(<StepTitle step={step} />);

  context('with step 0', () => {
    it('이메일 입력 Title 출력', () => {
      renderStepTitle(0);

      expect(screen.getByText(/가입한 이메일/)).toBeInTheDocument();
    });
  });

  context('with step 1', () => {
    it('인증번호 입력 Title 출력', () => {
      renderStepTitle(1);

      expect(screen.getByText(/이메일로 받은 인증번호/)).toBeInTheDocument();
    });
  });

  context('with step 2', () => {
    it('새로운 비밀번호 입력 Title 출력', () => {
      renderStepTitle(2);

      expect(screen.getByText(/새로운 비밀번호/)).toBeInTheDocument();
    });
  });
});
