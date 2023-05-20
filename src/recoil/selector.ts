import { selector } from 'recoil';

import { selectedOptionState } from './atom';

// eslint-disable-next-line import/prefer-default-export
export const selectedOptionSelector = selector({
  key: 'selectedOptionSelector',
  get: ({ get }) => get(selectedOptionState),
});
