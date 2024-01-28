import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import Button from '@/components/common/Button';
import TextField from '@/components/common/TextField';
import NormalPopup from '@/components/popup/NormalPopup';
import useChangePasswordForm from '@/hooks/useChangePasswordForm';

export default function ChangePassword() {
  const router = useRouter();

  const {
    showPop, closeModal, formData, isActive, onSubmit,
  } = useChangePasswordForm();

  const { currentPassword, password, passwordConfirm } = formData;

  const onCloseAndMove = () => {
    closeModal();
    router.push('/');
  };

  return (
    <Container onSubmit={onSubmit}>
      <CurrentPasswordInput
        label="현재 비밀번호"
        type="password"
        placeholder="현재 비밀번호 입력"
        register={currentPassword.register}
        value={currentPassword.value}
        error={currentPassword.error}
        onClickReset={currentPassword.onClickReset}
        message="8~20자리 (영문, 숫자, 특수문자 중 2가지 이상 조합"
      />
      <PasswordInput
        label="변경할 비밀번호"
        type="password"
        placeholder="변경할 비밀번호 입력"
        register={password.register}
        value={password.value}
        error={password.error}
        onClickReset={password.onClickReset}
        message="8~20자리 (영문, 숫자, 특수문자 중 2가지 이상 조합"
      />
      <TextField
        label="변경할 비밀번호 확인"
        type="password"
        placeholder="변경할 비밀번호 확인 입력"
        register={passwordConfirm.register}
        value={passwordConfirm.value}
        error={passwordConfirm.error}
        onClickReset={passwordConfirm.onClickReset}
        message="비밀번호를 확인해주세요."
      />
      <SubmitButton disabled={!isActive}>변경하기</SubmitButton>
      <NormalPopup
        show={showPop}
        onClose={onCloseAndMove}
        title="비밀번호 변경이 완료되었습니다."
        okText="확인"
      />
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 24px;
  flex-direction: column;
  overflow: hidden;
`;

const CurrentPasswordInput = styled(TextField)`
  margin-top: 16px;
  margin-bottom: 48px;
`;

const PasswordInput = styled(TextField)`
  margin-bottom: 8px;
`;

const SubmitButton = styled(Button).attrs({ type: 'submit' })`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  left: 0;
  right: 0;
  padding: 0 24px;
  bottom: 39px;
  margin: 0 auto;
`;
