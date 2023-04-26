import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import usePoPoForm from './usePoPoForm';

export type SignInForm = {
  email: string;
  password: string;
};

const useSignInForm = () => {
  const router = useRouter();

  const {
    register, watch, getError, getDefaultRegister, reset, setError, setFocus, handleSubmit,
  } = usePoPoForm<SignInForm>();

  const onValid = async (data: SignInForm) => {
    const res = await signIn('credentials', {
      email: data.email, password: data.password, redirect: false,
    });

    if (res?.ok) {
      router.replace('/');
      return;
    }

    if (res?.error) {
      setError('password', { message: '비밀번호가 일치하지 않아요.' });
      setFocus('password');
    }
  };

  const onSubmit = handleSubmit(onValid);

  return {
    email: {
      register: getDefaultRegister({ name: 'email' }),
      value: watch('email'),
      error: getError('email'),
      onClickReset: () => reset('email'),
    },
    password: {
      register: register('password'),
      value: watch('password'),
      error: getError('password'),
      onClickReset: () => reset('password'),
    },
    reset,
    onSubmit,
    isActive: !!watch('email') && !!watch('password'),
  };
};

export default useSignInForm;
