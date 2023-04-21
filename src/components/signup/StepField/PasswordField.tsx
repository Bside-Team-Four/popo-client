import styled from 'styled-components';

import TextField from '@/components/common/TextField';
import InputItem from '@/types/InputForm';

type PasswordFieldProps = {
  password: InputItem<string>;
  passwordConfirm: InputItem<string>;
};

export default function PasswordField({ password, passwordConfirm }:PasswordFieldProps) {
  return (
    <Container>
      <TextField
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
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  :nth-child(1){
    margin-bottom: 8px;
  };
`;
