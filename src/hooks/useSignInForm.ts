import { useRouter } from 'next/navigation';

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

  const onValid = (data: SignInForm) => {
    if (data.email !== 'popo@gmail.com' || data.password !== '1234') {
      setError('password', { message: '비밀번호가 일치하지 않아요.' });
      setFocus('password');
      return;
    }
    router.replace('/');
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
