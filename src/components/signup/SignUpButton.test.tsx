import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import SignUpButton from './SignUpButton';

describe('StepButton', () => {
  const renderStepButton = (isActive = true) => renderWithProviders(
    <SignUpButton step={given.step} isActive={isActive} />,
  );

  it('전달받은 isActive 가 false일 경우 Button을 비활성화 시킨다.', () => {
    renderStepButton(false);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  context('회원가입 첫 번째 페이지일 경우', () => {
    given('step', () => 1);
    it('"이메일로 인증번호 전송"버튼을 화면에 보여준다.', () => {
      renderStepButton();

      expect(screen.getByText(/이메일로 인증번호 전송/)).toBeInTheDocument();
    });
  });

  context('회원가입 두 번째 페이지일 경우', () => {
    given('step', () => 2);
    it('"확인"버튼을 화면에 보여준다.', () => {
      renderStepButton();

      expect(screen.getByText(/확인/)).toBeInTheDocument();
    });
  });

  context('회원가입 마지막 페이지일 경우', () => {
    given('step', () => 8);
    it('"가입 완료"버튼을 화면에 보여준다.', () => {
      renderStepButton();

      expect(screen.getByText(/가입 완료/)).toBeInTheDocument();
    });
  });

  context('그 외의 페이지의 경우', () => {
    given('step', () => 6);
    it('"다음"버튼을 화면에 보여준다.', () => {
      renderStepButton();

      expect(screen.getByText(/다음/)).toBeInTheDocument();
    });
  });
});
