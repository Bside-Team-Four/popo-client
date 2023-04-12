import styled from 'styled-components';

import FindPasswordForm from '@/components/find-password/FindPasswordForm';
import StepButton from '@/components/find-password/StepButton';
import StepTitle from '@/components/find-password/StepTitle';
import useFindPasswordForm from '@/hooks/useFindPasswordForm';

export default function FindPassword() {
  const {
    step, isActive, formData, onSubmit,
  } = useFindPasswordForm();

  return (
    <Container onSubmit={onSubmit}>
      <StepTitle step={step} />
      <StepButton step={step} isActive={isActive} />
      <FindPasswordForm step={step} formData={formData} />
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
