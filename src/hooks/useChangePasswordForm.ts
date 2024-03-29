import { useState } from 'react';

import useChangePasswordMutation from '@/hooks/api/useChangePasswordMutation';
import usePOPOForm from '@/hooks/usePOPOForm';

export type ChangePasswordName = 'currentPassword' | 'password' | 'passwordConfirm';

export type ChangePasswordForm = {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
};

const useChangePasswordForm = () => {
  const [showPop, setShowPop] = useState(false);
  const passwordChangeMutation = useChangePasswordMutation();

  const {
    watch, getError, getDefaultRegister, getActiveCheck, reset, handleSubmit,
  } = usePOPOForm<ChangePasswordForm>();

  const onSubmit = handleSubmit(({ currentPassword, password }) => {
    passwordChangeMutation.mutate({ currPassword: currentPassword, toChangePassword: password }, {
      onSuccess: () => {
        setShowPop(true);
      },
    });
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
