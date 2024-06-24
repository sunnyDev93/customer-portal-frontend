import { useCallback } from 'react';
import { aptiveUserState } from 'app-recoil/atoms/auth/aptive-user';
import { useSetRecoilState } from 'recoil';
import { configRequestToken } from 'services/config';
import { aptiveUserAccountsState } from 'app-recoil/atoms/auth/aptive-user-accounts';
import { aptiveUserTokenState } from 'app-recoil/atoms/auth/aptive-user-token';
import { aptiveUserDataState } from 'app-recoil/atoms/auth/aptive-user-data';
import useSessionStorageState from 'use-session-storage-state';
import useLocalStorage from 'use-local-storage';
import { useAptiveAuth } from './AptiveAuth';
import { Token } from '../../constants/auth';

export default function useLogout() {
  const { logout: logoutAptiveAuth } = useAptiveAuth();

  const [aptiveUserIndex, setAptiveUserIndex] = useSessionStorageState<number>('aptiveUserIndex', { defaultValue: 0 });
  const [aptiveUserPersist, setAptiveUserPersist] = useLocalStorage('aptiveUserPersist', { accountId: '', email: '' });
  const setAptiveUser = useSetRecoilState(aptiveUserState);
  const setAptiveUserAccounts = useSetRecoilState(aptiveUserAccountsState);
  const setAptiveUserToken = useSetRecoilState(aptiveUserTokenState);
  const setAptiveUserData = useSetRecoilState(aptiveUserDataState);

  const logout = useCallback(() => {
    localStorage.removeItem(Token.AccessToken);
    localStorage.removeItem('aptiveErrorCounter');
    configRequestToken();

    logoutAptiveAuth?.();
  }, [setAptiveUser, setAptiveUserAccounts, setAptiveUserData, setAptiveUserToken, setAptiveUserPersist]);

  return { logout };
}
