import { useRecoilState } from 'recoil';

import popoState from '@/store/popo';

const usePollStatus = () => {
  const [pollStatus, setPollStatus] = useRecoilState(popoState);

  return {
    pollStatus,
    setPollStatus,
  };
};

export default usePollStatus;
