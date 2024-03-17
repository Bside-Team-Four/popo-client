import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/testHelper';

import SignUpTitle from './SignUpTitle';

describe('SignUpTitle', () => {
  const renderStepTitle = () => renderWithProviders(<SignUpTitle step={given.step} />);

  context('회원가입 첫 번째 페이지일 경우', () => {
    given('step', () => 0);
    it('이메일 입력 타이틀을 화면에 보여준다.', () => {
      renderStepTitle();

      expect(screen.getByText(/약관을 확인/)).toBeInTheDocument();
    });
  });

  context('회원가입 두 번째 페이지일 경우', () => {
    given('step', () => 1);
    it('이메일 입력 타이틀을 화면에 보여준다.', () => {
      renderStepTitle();

      expect(screen.getByText(/가입할 이메일을/)).toBeInTheDocument();
    });
  });

  context('회원가입 세 번째 페이지일 경우', () => {
    given('step', () => 2);
    it('인증번호 입력 타이틀을 화면에 보여준다.', () => {
      renderStepTitle();

      expect(screen.getByText(/이메일로 받은 인증번호를/)).toBeInTheDocument();
    });
  });

  context('회원가입 네 번째 페이지일 경우', () => {
    given('step', () => 3);
    it('비밀번호 입력 타이틀을 화면에 보여준다.', () => {
      renderStepTitle();

      expect(screen.getByText(/로그인에 사용할 비밀번호를/)).toBeInTheDocument();
    });
  });

  context('회원가입 다섯 번째 페이지일 경우', () => {
    given('step', () => 4);
    it('이름 입력 타이틀을 화면에 보여준다.', () => {
      renderStepTitle();

      expect(screen.getByText(/이름을/)).toBeInTheDocument();
    });
  });

  context('회원가입 여섯 번째 페이지일 경우', () => {
    given('step', () => 5);
    it('년도 입력 타이틀을 화면에 보여준다.', () => {
      renderStepTitle();

      expect(screen.getByText(/태어난 년도를/)).toBeInTheDocument();
    });
  });

  context('회원가입 일곱 번째 페이지일 경우', () => {
    given('step', () => 6);
    it('성별 선택 타이틀을 화면에 보여준다.', () => {
      renderStepTitle();

      expect(screen.getByText(/성별을/)).toBeInTheDocument();
    });
  });

  context('회원가입 여덟 번째 페이지일 경우', () => {
    given('step', () => 7);
    it('학교 선택 타이틀을 화면에 보여준다.', () => {
      renderStepTitle();

      expect(screen.getByText(/학교와 학년을/)).toBeInTheDocument();
    });
  });

  context('회원가입 마지막 페이지일 경우', () => {
    given('step', () => 8);
    it('입력한 정보 확인 타이틀을 화면에 보여준다.', () => {
      renderStepTitle();

      expect(screen.getByText(/입력한 정보를/)).toBeInTheDocument();
    });
  });
});
