import { atom } from 'recoil';

const aptiveUserTokenKey = 'aptiveUserTokenKey';

export const aptiveUserTokenState = atom({
  key: aptiveUserTokenKey,
  default: '',
});
