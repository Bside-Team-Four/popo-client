import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import useGetDefaultRegister from '@/hooks/useGetDefaultRegister';

export type FindPasswordName = 'email' | 'certificationNumber' | 'password' | 'passwordConfirm';

export type FindPasswordForm = {
  email: string;
  certificationNumber: string;
  password: string;
  passwordConfirm: string;
};

const useFindPasswordForm = () => {
  const router = useRouter();

  const [step, setStep] = useState(0);

  const {
    register, watch, formState, resetField, setFocus, handleSubmit, setError,
  } = useForm<FindPasswordForm>();

  const getDefaultRegister = useGetDefaultRegister(register);

  const { errors } = formState;

  const reset = (name: FindPasswordName) => {
    resetField(name);
    setFocus(name);
  };

  const formData = {
    email: {
      register: getDefaultRegister({ name: 'email' }),
      value: watch('email'),
      error: errors.email,
      onClickReset: () => reset('email'),
    },
    certificationNumber: {
      register: getDefaultRegister({ name: 'certificationNumber' }),
      value: watch('certificationNumber'),
      error: errors.certificationNumber,
      onClickReset: () => reset('certificationNumber'),
    },
    password: {
      register: getDefaultRegister({ name: 'password' }),
      value: watch('password'),
      error: errors.password,
      onClickReset: () => reset('password'),
    },
    passwordConfirm: {
      register: getDefaultRegister({ name: 'passwordConfirm', passwordValue: watch('password') }),
      value: watch('passwordConfirm'),
      error: errors.passwordConfirm,
      onClickReset: () => reset('passwordConfirm'),
    },
  };

  const getActive = useCallback((currentStep: number) => {
    if (currentStep === 0) {
      return !!watch('email');
    }
    if (currentStep === 1) {
      return !!watch('certificationNumber');
    }

    return !!watch('password') && !!watch('passwordConfirm');
  }, [watch]);

  const onSubmit = handleSubmit((data: FindPasswordForm) => {
    if (step === 0) {
      setStep(1);
      return;
    }
    if (step === 1) {
      setStep(2);
      return;
    }

    router.replace('/');
  });

  return {
    step,
    formData,
    isActive: getActive(step),
    onSubmit,
  };
};

export default useFindPasswordForm;
