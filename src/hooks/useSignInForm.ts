import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import usePOPOForm from './usePOPOForm';

export type SignInForm = {
  email: string;
  password: string;
};

const useSignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register, watch, getError, getDefaultRegister, reset, setError, setFocus, handleSubmit,
  } = usePOPOForm<SignInForm>();

  const onValid = async (data: SignInForm) => {
    setIsLoading(true);

    const res = await signIn('credentials', {
      email: data.email, password: data.password, redirect: false,
    });

    setIsLoading(false);

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
    isLoading,
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
