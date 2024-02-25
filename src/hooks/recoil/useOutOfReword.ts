import { useRecoilState } from 'recoil';

import outOfRewordState from '@/store/out-of-reword';

const useOutOfReword = () => {
  const [outOfReword, setOutOfReword] = useRecoilState(outOfRewordState);

  return {
    outOfReword,
    setOutOfReword,
  };
};

export default useOutOfReword;
