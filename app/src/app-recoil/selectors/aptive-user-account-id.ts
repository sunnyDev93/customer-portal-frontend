import { selector } from 'recoil';
import { aptiveUserState } from 'app-recoil/atoms/auth/aptive-user';

const aptiveUserAccountId = selector<string>({
  key: 'aptiveUserAccountIdSelector',
  get: ({ get }) => {
    const aptiveUser = get(aptiveUserState);
    return aptiveUser?.accountId || '';
  },
});

export default aptiveUserAccountId;
