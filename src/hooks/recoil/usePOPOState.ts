import { useRecoilState } from 'recoil';

import popoState from '@/store/popo';
import POPOState from '@/types/POPOState';

const usePOPOState = () => {
  const [state, setState] = useRecoilState(popoState);

  const setPOPOState = (newState: POPOState) => {
    setState(newState);
  };

  return {
    popoState: state,
    setPOPOState,
  };
};

export default usePOPOState;
