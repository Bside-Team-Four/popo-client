import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import useSignUpEmailMutation from '@/hooks/api/useSignUpEmailMutation';
import Gender from '@/types/Gender';
import PopInfo, { getDefaultPopInfo } from '@/types/PopInfo';
import School from '@/types/School';

import usePOPOForm from './usePOPOForm';

export type SignUpName = 'email' | 'certificationNumber' | 'password' | 'passwordConfirm' | 'name' | 'year' | 'grade';

export type SignUpForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  certificationNumber: string;
  name: string;
  year: number;
  grade:number;
};

const useSignUpForm = () => {
  const router = useRouter();

  const [step, setStep] = useState(0);

  const [gender, setGender] = useState<Gender | null>(null);
  const [school, setSchool] = useState<School | null>(null);
  const [popInfo, setPopInfo] = useState<PopInfo>(getDefaultPopInfo());

  const {
    register, watch, getError, getDefaultRegister, getActiveCheck, reset, handleSubmit,
  } = usePOPOForm<SignUpForm>();

  const {
    signUpSendEmailMutation,
    signUpAuthEmailMutation,
  } = useSignUpEmailMutation();

  const onSubmit = handleSubmit(() => {
    if (step === 0) {
      signUpSendEmailMutation.mutate({
        email: watch('email'),
      }, {
        onSuccess: () => {
          setStep(1);
        },
        onError: () => {
          setPopInfo({
            show: true,
            title: '이미 가입된 이메일이에요.\n기존 계정으로 로그인해주세요.',
            okText: '확인',
            onClose: () => setPopInfo(getDefaultPopInfo()),
          });
        },
      });
      return;
    }

    if (step === 1) {
      signUpAuthEmailMutation.mutate({
        email: watch('email'),
        userCode: watch('certificationNumber'),
      }, {
        onSuccess: () => {
          setStep(2);
        },
        onError: () => {
          setPopInfo({
            show: true,
            title: '인증번호가 일치하지 않아요.\n다시 확인해 주세요.',
            okText: '확인',
            onClose: () => setPopInfo(getDefaultPopInfo()),
          });
        },
      });
      return;
    }

    if (step < 7) {
      setStep((prev) => prev + 1);
      return;
    }

    router.replace('/profile');
  });

  const getActive = useCallback((currentStep: number) => {
    if (currentStep === 0) {
      return getActiveCheck('email');
    }
    if (currentStep === 1) {
      return getActiveCheck('certificationNumber');
    }
    if (currentStep === 2) {
      return getActiveCheck('password') && getActiveCheck('passwordConfirm');
    }
    if (currentStep === 3) {
      return getActiveCheck('name');
    }
    if (currentStep === 4) {
      return getActiveCheck('year');
    }
    if (currentStep === 5) {
      return gender !== null;
    }
    if (currentStep === 6) {
      return school !== null && getActiveCheck('grade');
    }

    return true;
  }, [gender, getActiveCheck, school]);

  const onResend = () => {
    signUpSendEmailMutation.mutate({
      email: watch('email'),
    }, {
      onSuccess: () => {
        setPopInfo({
          show: true,
          title: '인증번호를 재전송했어요.\n인증번호를 입력해주세요.',
          okText: '확인',
          onClose: () => setPopInfo(getDefaultPopInfo()),
        });
      },
    });
  };

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
      name: {
        register: register('name'),
        value: watch('name'),
        error: getError('name'),
        onClickReset: () => reset('name'),
      },
      year: {
        register: register('year', {
          pattern: {
            value: /^[0-9]{4}$/,
            message: '입력 형식에 맞춰 입력해주세요.',
          },
        }),
        value: watch('year'),
        error: getError('year'),
        onClickReset: () => reset('year'),
      },
      grade: {
        register: register('grade', {
          pattern: {
            value: /^[1-3]$/,
            message: '1 ~ 3학년만 가입 가능합니다.',
          },
        }),
        value: watch('grade'),
        error: getError('grade'),
        onClickReset: () => reset('grade'),
      },
      gender: {
        value: gender,
        onChangeGender: (g: Gender) => setGender(g),
      },
      school: {
        value: school,
        onChangeSchool: (s: School) => setSchool(s),
      },
    },
    isActive: getActive(step),
    popInfo,
    onSubmit,
    onResend,
  };
};

export default useSignUpForm;
