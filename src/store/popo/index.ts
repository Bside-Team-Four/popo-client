import { atom } from 'recoil';

import PollStatus from '@/types/PollStatus';

export const popoState = atom<PollStatus>({
  key: 'popoState',
  default: 'START',
});

// eslint-disable-next-line import/prefer-default-export
export const selectedOptionState = atom({
  key: 'selectedOptionState',
  default: 'SCHOOL',
});
