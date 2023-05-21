import styled from 'styled-components';

import SmallButton from '@/components/common/SmallButton';
import TextField from '@/components/common/TextField';
import InputItem from '@/types/InputForm';

type FindPasswordFormProps = {
  step: number;
  formData:{
    email: InputItem<string>;
    certificationNumber: InputItem<string>;
    password: InputItem<string>;
    passwordConfirm: InputItem<string>;
  }
  onResend: () => void;
};

export default function FindPasswordForm({ step, formData, onResend }:FindPasswordFormProps) {
  const {
    email, certificationNumber, password, passwordConfirm,
  } = formData;

  const renderForm = (currStep: number) => {
    if (currStep === 0) {
      return (
        <TextField
          label="이메일"
          placeholder="이메일"
          type="text"
          register={email.register}
          value={email.value}
          error={email.error}
          onClickReset={email.onClickReset}
        />
      );
    }

    if (currStep === 1) {
      return (
        <>
          <TextField
            label="인증번호"
            placeholder="6자리 숫자"
            type="number"
            register={certificationNumber.register}
            value={certificationNumber.value}
            error={certificationNumber.error}
            onClickReset={certificationNumber.onClickReset}
          />
          <SmallButton onClick={onResend}>인증번호 재전송</SmallButton>
        </>
      );
    }

    return (
      <>
        <PasswordInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
          register={password.register}
          value={password.value}
          error={password.error}
          onClickReset={password.onClickReset}
          message="8~20자리 (영문, 숫자, 특수문자 중 2가지 이상 조합"
        />
        <TextField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          register={passwordConfirm.register}
          value={passwordConfirm.value}
          error={passwordConfirm.error}
          onClickReset={passwordConfirm.onClickReset}
          message="비밀번호를 확인해주세요."
        />
      </>
    );
  };

  return (
    <Container>
      {renderForm(step)}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PasswordInput = styled(TextField)`
  margin-bottom: 8px;
`;
