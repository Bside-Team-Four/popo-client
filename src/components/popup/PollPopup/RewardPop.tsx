import { useCallback } from 'react';

import NormalPopup from '@/components/popup/NormalPopup';
import useGetPollStatus from '@/hooks/api/useGetPollStatus';

type RewardPopProps = {
  show:boolean;
  setShow: (show:boolean) => void;
  onClose:()=>void;
};

export default function RewardPop({ show, onClose, setShow }:RewardPopProps) {
  const { refetch } = useGetPollStatus();

  const onCloseRewardPop = useCallback(async () => {
    await refetch();
    setShow(false);
    onClose();
  }, [onClose, refetch, setShow]);

  return (
    <NormalPopup
      show={show}
      onClose={onCloseRewardPop}
      title="100 리워드가 적립 완료."
      okText="확인"
    />
  );
}
