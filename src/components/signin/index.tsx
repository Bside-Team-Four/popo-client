import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import SignTitle from '@/components/common/SignTitle';
import SmallButton from '@/components/common/SmallButton';
import LoginButtons from '@/components/signin/LoginButtons';
import LoginForm from '@/components/signin/LoginForm';

type IForm = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register, watch, resetField, formState, setError, setFocus, handleSubmit,
  } = useForm<IForm>();

  const router = useRouter();

  const reset = (name: 'email' | 'password') => {
    resetField(name);
    setFocus(name);
  };

  const goToFindPassword = () => {
    router.push('/find-password');
  };

  const onValid = (data: IForm) => {
    if (data.email !== 'popo@gmail.com' || data.password !== '1234') {
      setError('password', { message: '비밀번호가 일치하지 않아요.' });
      setFocus('password');
      return;
    }
    router.replace('/');
  };

  return (
    <Container onSubmit={handleSubmit(onValid)}>
      <SignTitle>{'이메일로\n로그인 할게요'}</SignTitle>
      <LoginForm
        email={{
          register: register('email', {
            required: '이메일을 입력해주세요.',
          }),
          value: watch('email'),
          error: formState.errors.email,
        }}
        password={{
          register: register('password', {
            required: '비밀번호를 입력해주세요.',
          }),
          value: watch('password'),
          error: formState.errors.password,
        }}
        reset={reset}
      />
      <SmallButton onClick={goToFindPassword}>비밀번호 찾기</SmallButton>
      <LoginButtons />
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
