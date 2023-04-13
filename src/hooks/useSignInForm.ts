import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import useValidationPattern from '@/hooks/useValidationPattern';

export type SignInName = 'email' | 'password';

export type SignInForm = {
  email: string;
  password: string;
};

const useSignInForm = () => {
  const router = useRouter();

  const { emailPattern } = useValidationPattern();

  const {
    register, watch, formState, resetField, setFocus, setError, handleSubmit,
  } = useForm<SignInForm>();

  const { errors } = formState;

  const reset = (name: SignInName) => {
    resetField(name);
    setFocus(name);
  };

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
      register: register('email', {
        pattern: emailPattern,
      }),
      value: watch('email'),
      error: errors.email,
      onClickReset: () => reset('email'),
    },
    password: {
      register: register('password'),
      value: watch('password'),
      error: errors.password,
      onClickReset: () => reset('password'),
    },
    reset,
    onSubmit,
    isActive: !!watch('email') && !!watch('password'),
  };
};

export default useSignInForm;
