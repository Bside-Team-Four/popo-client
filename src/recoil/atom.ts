import { atom } from 'recoil';

// eslint-disable-next-line import/prefer-default-export
export const selectedOptionState = atom({
  key: 'selectedOptionState',
  default: 'SCHOOL',
});
