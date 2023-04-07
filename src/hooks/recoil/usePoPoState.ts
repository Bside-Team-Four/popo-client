import { useRecoilState } from 'recoil';

import popoState from '@/store/popo';
import PoPoState from '@/types/PoPoState';

const usePoPoState = () => {
  const [state, setState] = useRecoilState(popoState);

  const setPoPoState = (newState: PoPoState) => {
    setState(newState);
  };

  return {
    popoState: state,
    setPoPoState,
  };
};

export default usePoPoState;
