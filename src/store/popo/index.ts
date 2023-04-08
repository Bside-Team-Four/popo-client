import { atom } from 'recoil';

import PoPoState from '@/types/PoPoState';

const popoState = atom<PoPoState>({
  key: 'popoState',
  default: 'start',
});

export default popoState;
