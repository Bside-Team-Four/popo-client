import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import usePoPoForm from './usePoPoForm';

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
    watch, getError, getDefaultRegister, getActiveCheck, reset, handleSubmit,
  } = usePoPoForm<FindPasswordForm>();

  const getActive = useCallback((currentStep: number) => {
    if (currentStep === 0) {
      return getActiveCheck('email');
    }
    if (currentStep === 1) {
      return getActiveCheck('certificationNumber');
    }

    return getActiveCheck('password') && getActiveCheck('passwordConfirm');
  }, [getActiveCheck]);

  const onSubmit = handleSubmit(() => {
    if (step < 2) {
      setStep((prev) => prev + 1);
      return;
    }

    router.replace('/');
  });

  return {
    step,
    formData: {
      email: {
        register: getDefaultRegister({ name: 'email' }),
        value: watch('email'),
        error: getError('email'),
        onClickReset: () => reset('email'),
      },
      certificationNumber: {
        register: getDefaultRegister({ name: 'certificationNumber' }),
        value: watch('certificationNumber'),
        error: getError('certificationNumber'),
        onClickReset: () => reset('certificationNumber'),
      },
      password: {
        register: getDefaultRegister({ name: 'password' }),
        value: watch('password'),
        error: getError('password'),
        onClickReset: () => reset('password'),
      },
      passwordConfirm: {
        register: getDefaultRegister({ name: 'passwordConfirm', passwordValue: watch('password') }),
        value: watch('passwordConfirm'),
        error: getError('passwordConfirm'),
        onClickReset: () => reset('passwordConfirm'),
      },
    },
    isActive: getActive(step),
    onSubmit,
  };
};

export default useFindPasswordForm;
