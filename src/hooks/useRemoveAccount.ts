import { useState } from 'react';

import { signOut } from 'next-auth/react';

import PopInfo from '@/types/PopInfo';

import useRemoveAccountMutation from './api/useRemoveAccountMutation';

const useRemoveAccount = () => {
  const [popInfo, setPopInffo] = useState<PopInfo>({
    show: false,
    title: 'POPO 탈퇴가 완료되었습니다.',
    okText: '확인',
    onClose: signOut,
  });

  const removeAccount = useRemoveAccountMutation().bind(null, {
    onSuccess: () => {
      setPopInffo((info) => ({ ...info, show: true }));
    },
  });

  return { removeAccount, popInfo };
};

export default useRemoveAccount;
