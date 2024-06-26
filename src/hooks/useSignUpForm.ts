import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import dayjs from 'dayjs';

import useSignUpEmailMutation from '@/hooks/api/useSignUpEmailMutation';
import useSignUpMutation from '@/hooks/api/useSignUpMutation';
import Gender from '@/types/Gender';
import PopInfo, { getDefaultPopInfo } from '@/types/PopInfo';
import School from '@/types/School';
import { nativeBridge } from '@/utils/nativeBridge';

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

  const [tosAgree, setTosAgree] = useState<boolean>(false);
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

  const signUp = useSignUpMutation();

  const onSubmit = handleSubmit(() => {
    if (step === 1) {
      signUpSendEmailMutation.mutate({
        email: watch('email'),
      }, {
        onSuccess: () => {
          setStep(2);
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

    if (step === 2) {
      signUpAuthEmailMutation.mutate({
        email: watch('email'),
        userCode: watch('certificationNumber'),
      }, {
        onSuccess: () => {
          setStep(3);
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

    if (step < 8) {
      setStep((prev) => prev + 1);
      return;
    }

    signUp({
      gender: gender === 'MALE' ? 0 : 1,
      email: watch('email'),
      password: watch('password'),
      grade: Number(watch('grade')),
      name: watch('name'),
      schoolId: school?.id || 0,
    }, {
      onSuccess: async (data, payload) => {
        toast('POPO 가입을 환영합니다.', {
          position: 'top-center',
          type: 'success',
          autoClose: 1000,
          hideProgressBar: true,
        });

        const fcmToken = await nativeBridge.getFcmToken();
        await signIn('credentials', {
          email: payload.email, password: payload.password, fcmToken, redirect: false,
        });

        /*
        *TODO: 회원가입 후 프로필 사진 등록 페이지로 이동
        */
        router.replace('/');
      },
      onError: () => {
        setPopInfo({
          show: true,
          title: '회원가입에 실패했어요.\n다시 시도해주세요.',
          okText: '확인',
          onClose: () => setPopInfo(getDefaultPopInfo()),
        });
      },
    });
  });

  const getActive = useCallback((currentStep: number) => {
    if (currentStep === 0) {
      return tosAgree !== false;
    }
    if (currentStep === 1) {
      return getActiveCheck('email');
    }
    if (currentStep === 2) {
      return getActiveCheck('certificationNumber');
    }
    if (currentStep === 3) {
      return getActiveCheck('password') && getActiveCheck('passwordConfirm');
    }
    if (currentStep === 4) {
      return getActiveCheck('name');
    }
    if (currentStep === 5) {
      return getActiveCheck('year');
    }
    if (currentStep === 6) {
      return gender !== null;
    }
    if (currentStep === 7) {
      return school !== null && getActiveCheck('grade');
    }

    return true;
  }, [tosAgree, gender, getActiveCheck, school]);

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
      tosAgree: {
        value: tosAgree,
        onChangeTosAgree: (agree: boolean) => setTosAgree(agree),
      },
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
        register: register('name', {
          pattern: {
            value: /^[가-힣]{2,4}$/,
            message: '이름은 한글 2~4자리로 작성해주세요.',
          },
        }),
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
          validate: (value) => {
            const now = dayjs();
            const year = now.year();

            if (year - value < 14) {
              return '만 14세 미만은 회원가입을 할 수 없어요.';
            }

            if (year - value > 19) {
              return '만 19세 초과는 회원가입을 할 수 없어요.';
            }

            return true;
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
