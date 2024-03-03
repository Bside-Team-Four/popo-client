import { atom } from 'recoil';

const outOfRewordState = atom<boolean>({
  key: 'outOfRewordState',
  default: false,
});

export default outOfRewordState;
