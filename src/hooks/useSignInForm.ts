import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

type SignInForm = {
  email: string;
  password: string;
};

const useSignInForm = () => {
  const router = useRouter();

  const {
    register, watch, formState, resetField, setFocus, setError, handleSubmit,
  } = useForm<SignInForm>();

  const { errors } = formState;

  const reset = (name: 'email' | 'password') => {
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
        required: '이메일을 입력해주세요.',
      }),
      value: watch('email'),
      error: errors.email,
    },
    password: {
      register: register('password', {
        required: '비밀번호를 입력해주세요.',
      }),
      value: watch('password'),
      error: errors.password,
    },
    reset,
    onSubmit,
    isActive: !!watch('email') && !!watch('password'),
  };
};

export default useSignInForm;
