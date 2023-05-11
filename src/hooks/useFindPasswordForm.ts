import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import useChangePasswordMutation from '@/hooks/api/useChangePasswordMutation';
import PopInfo, { getDefaultPopInfo } from '@/types/PopInfo';

import usePOPOForm from './usePOPOForm';

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
  const [userId, setUserId] = useState<undefined | number>();
  const [popInfo, setPopInfo] = useState<PopInfo>(getDefaultPopInfo());

  const {
    watch, getError, getDefaultRegister, getActiveCheck, reset, handleSubmit,
  } = usePOPOForm<FindPasswordForm>();

  const {
    passwordMissingMutation,
    passwordMissingAuthMutation,
    passwordResetMutation,
  } = useChangePasswordMutation();

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
    if (step === 0) {
      passwordMissingMutation.mutate({
        email: watch('email'),
      }, {
        onSuccess: (data) => {
          setUserId(data.value.userId);
          setStep(1);
        },
        onError: () => {
          setPopInfo({
            show: true,
            title: '등록된 이메일이 없어요\n회원가입하시겠어요?',
            okText: '회원가입',
            cancelText: '취소',
            onOk: () => router.push('/signup'),
            onClose: () => setPopInfo(getDefaultPopInfo()),
          });
        },
      });

      return;
    }
    if (step === 1) {
      passwordMissingAuthMutation.mutate({
        userId,
        userCode: watch('certificationNumber'),
      }, {
        onSuccess: () => {
          setStep(2);
        },
        onError: () => {
          setPopInfo({
            show: true,
            title: '인증번호가 일치하지 않아요.\n다시 확인해주세요.',
            okText: '확인',
            onClose: () => setPopInfo(getDefaultPopInfo()),
          });
        },
      });
      return;
    }

    passwordResetMutation.mutate(
      {
        userId,
        toChangePassword: watch('password'),
      },
      {
        onError: () => {
          setPopInfo({
            show: true,
            title: '이전 비밀번호와 동일한 비밀번호를\n사용할 수 없어요.',
            okText: '확인',
            onClose: () => setPopInfo(getDefaultPopInfo()),
          });
        },
        onSuccess: () => {
          setPopInfo({
            show: true,
            title: '비밀번호를 성공적으로 변경했어요.\n새로운 비밀번호로 로그인해주세요.',
            okText: '확인',
            onClose: () => router.push('/signin'),
          });
        },
      },
    );
  });

  const onResend = () => {
    passwordMissingMutation.mutate({
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
    },
    isActive: getActive(step),
    popInfo,
    onSubmit,
    onResend,
  };
};

export default useFindPasswordForm;
