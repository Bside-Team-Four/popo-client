import styled from 'styled-components';

import TextField from '@/components/common/TextField';
import InputItem from '@/types/InputForm';

type LoginFormProps = {
  email:InputItem;
  password: InputItem;
};

export default function LoginForm({ email, password }:LoginFormProps) {
  return (
    <Container>
      <EmailInput
        label="이메일"
        placeholder="이메일"
        type="text"
        register={email.register}
        value={email.value}
        error={email.error}
        onClickReset={email.onClickReset}
      />
      <PasswordInput
        label="비밀번호"
        type="password"
        placeholder="비밀번호"
        register={password.register}
        value={password.value}
        error={password.error}
        onClickReset={password.onClickReset}
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
