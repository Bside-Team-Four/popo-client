import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import FixedSpinner from '@/components/common/FixedSpinner';
import SignTitle from '@/components/common/SignTitle';
import SmallButton from '@/components/common/SmallButton';
import LoginButtons from '@/components/signin/LoginButtons';
import LoginForm from '@/components/signin/LoginForm';
import useSignInForm from '@/hooks/useSignInForm';

export default function SignIn() {
  const {
    isLoading, email, password, onSubmit, isActive,
  } = useSignInForm();

  const router = useRouter();

  const goToFindPassword = () => {
    router.push('/find-password');
  };

  return (
    <Container onSubmit={onSubmit}>
      <SignTitle>{'이메일로\n로그인 할게요'}</SignTitle>
      <LoginForm
        email={email}
        password={password}
      />
      <SmallButton onClick={goToFindPassword}>비밀번호 찾기</SmallButton>
      <LoginButtons isActive={isActive} />
      {isLoading && <FixedSpinner type="pop" />}
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
