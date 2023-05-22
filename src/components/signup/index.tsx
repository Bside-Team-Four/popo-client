import styled from 'styled-components';

import NormalPopup from '@/components/popup/NormalPopup';
import useSignUpForm from '@/hooks/useSignUpForm';

import SignUpButton from './SignUpButton';
import SignUpForm from './SignUpForm';
import SignUpTitle from './SignUpTitle';

export default function SignUp() {
  const {
    step, isActive, onSubmit, formData, onResend, popInfo,
  } = useSignUpForm();

  return (
    <Container onSubmit={onSubmit}>
      <SignUpTitle step={step} />
      <SignUpForm step={step} formData={formData} onResend={onResend} />
      <SignUpButton step={step} isActive={isActive} />
      <NormalPopup {...popInfo} />
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;;
  justify-content: center;
  padding: 0 24px;
  overflow: hidden;
`;
