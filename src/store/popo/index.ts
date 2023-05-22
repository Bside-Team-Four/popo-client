import { atom } from 'recoil';

import PollStatus from '@/types/PollStatus';

const popoState = atom<PollStatus>({
  key: 'popoState',
  default: 'START',
});

export default popoState;
