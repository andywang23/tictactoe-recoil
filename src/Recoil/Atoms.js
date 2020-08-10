import { atom } from 'recoil';

const boardState = atom({
  key: 'boardState',
  default: [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-'],
  ],
});

export { boardState };
