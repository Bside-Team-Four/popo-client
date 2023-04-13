import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import useValidationPattern from '@/hooks/useValidationPattern';

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

  const { emailPattern, passwordPattern } = useValidationPattern();

  const {
    register, watch, formState, resetField, setFocus, handleSubmit, setError,
  } = useForm<FindPasswordForm>();

  const { errors } = formState;

  const reset = (name: FindPasswordName) => {
    resetField(name);
    setFocus(name);
  };

  const formData = {
    email: {
      register: register('email', {
        pattern: emailPattern,
      }),
      value: watch('email'),
      error: errors.email,
      onClickReset: () => reset('email'),
    },
    certificationNumber: {
      register: register('certificationNumber', {
        maxLength: {
          value: 6,
          message: '인증번호는 6자리를 입력해주세요.',
        },
        minLength: {
          value: 6,
          message: '인증번호는 6자리를 입력해주세요.',
        },
      }),
      value: watch('certificationNumber'),
      error: errors.certificationNumber,
      onClickReset: () => reset('certificationNumber'),
    },
    password: {
      register: register('password', {
        pattern: passwordPattern,
      }),
      value: watch('password'),
      error: errors.password,
      onClickReset: () => reset('password'),
    },
    passwordConfirm: {
      register: register('passwordConfirm', {
        validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
      }),
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
