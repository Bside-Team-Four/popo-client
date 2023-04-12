import { screen } from '@testing-library/react';

import StepButton from '@/components/find-password/StepButton';
import { renderWithProviders } from '@/utils/testHelper';

describe('StepButton', () => {
  const renderStepButton = (step: number, isActive = true) => renderWithProviders(
    <StepButton step={step} isActive={isActive} />,
  );

  it('isActive 가 false일때 Button을 disabled 시킨다.', () => {
    renderStepButton(0, false);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  context('with step 0', () => {
    it('이메일 입력 Title 출력', () => {
      renderStepButton(0);

      expect(screen.getByText(/이메일로 인증번호 전송/)).toBeInTheDocument();
    });
  });

  context('with step 1', () => {
    it('인증번호 입력 Title 출력', () => {
      renderStepButton(1);

      expect(screen.getByText(/확인/)).toBeInTheDocument();
    });
  });

  context('with step 2', () => {
    it('새로운 비밀번호 입력 Title 출력', () => {
      renderStepButton(2);

      expect(screen.getByText(/비밀번호 변경/)).toBeInTheDocument();
    });
  });
});
