import styled from 'styled-components';

import Button from '@/components/common/Button';

type StepButtonProps = {
  step: number;
  isActive: boolean;
};

const getButtonText = (step: number) => {
  if (step === 0) {
    return '이메일로 인증번호 전송';
  }
  if (step === 1) {
    return '확인';
  }
  return '비밀번호 변경';
};

export default function StepButton({ step, isActive }:StepButtonProps) {
  return (
    <Container>
      <SubmitButton disabled={!isActive}>
        {getButtonText(step)}
      </SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  left: 0;
  right: 0;
  padding: 0 24px;
  bottom: 39px;
`;

const SubmitButton = styled(Button).attrs({ type: 'submit' })``;
