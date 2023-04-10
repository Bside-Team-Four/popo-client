import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import styled from 'styled-components';

import TextField from '@/components/common/TextField';

type InputItem = {
  register: UseFormRegisterReturn;
  value: string;
  error?: FieldError;
};

type LoginFormProps = {
  email:InputItem;
  password: InputItem;
  reset: (name: 'email' | 'password') => void;
};

export default function LoginForm({ email, password, reset }:LoginFormProps) {
  return (
    <Container>
      <EmailInput
        label="이메일"
        type="email"
        placeholder="이메일"
        register={email.register}
        value={email.value}
        error={email.error}
        onClickReset={() => reset('email')}
      />
      <PasswordInput
        label="비밀번호"
        type="password"
        placeholder="비밀번호"
        register={password.register}
        value={password.value}
        error={password.error}
        onClickReset={() => reset('password')}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailInput = styled(TextField)`
  margin-bottom: 8px;
`;

const PasswordInput = styled(TextField)``;
