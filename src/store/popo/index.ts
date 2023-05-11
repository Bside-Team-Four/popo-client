import { atom } from 'recoil';

import POPOState from '@/types/POPOState';

const popoState = atom<POPOState>({
  key: 'popoState',
  default: 'start',
});

export default popoState;
