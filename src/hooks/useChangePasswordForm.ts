import { useState } from 'react';

import usePoPoForm from '@/hooks/usePoPoForm';

export type ChangePasswordName = 'currentPassword' | 'password' | 'passwordConfirm';

export type ChangePasswordForm = {

  currentPassword: string;
  password: string;
  passwordConfirm: string;
};

const useChangePasswordForm = () => {
  const [showPop, setShowPop] = useState(false);

  const {
    watch, getError, getDefaultRegister, getActiveCheck, reset, handleSubmit,
  } = usePoPoForm<ChangePasswordForm>();

  const onSubmit = handleSubmit(() => {
    setShowPop(true);
  });

  const closeModal = () => {
    setShowPop(false);
  };

  return {
    showPop,
    closeModal,
    formData: {
      currentPassword: {
        register: getDefaultRegister({ name: 'currentPassword' }),
        value: watch('currentPassword'),
        error: getError('currentPassword'),
        onClickReset: () => reset('currentPassword'),
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
    isActive: getActiveCheck('currentPassword') && getActiveCheck('password') && getActiveCheck('passwordConfirm'),
    onSubmit,
  };
};

export default useChangePasswordForm;
