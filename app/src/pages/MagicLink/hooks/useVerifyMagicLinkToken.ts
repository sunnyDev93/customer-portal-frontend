import { useMutation } from 'react-query';
import aptiveAPI, { configRequestToken } from '../../../services/config';
import { AuthType, Token } from '../../../constants/auth';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const useVerifyMagicLinkToken = () => {
  const navigate = useNavigate();
  return useMutation<{ data: { jwt: string } }, AxiosError, { token: string }>(
    ({ token }: { token: string }) =>
      aptiveAPI.post(`/magicjwt`, { token }, { headers: { 'X-Auth-Type': AuthType.MagicLink, Authorization: `Bearer ${token}` } }),
    {
      onSuccess: data => {
        const { jwt } = data.data;
        window.localStorage.setItem(Token.AccessToken, jwt);
        configRequestToken({ newToken: jwt, authType: AuthType.MagicLink });
        navigate('/dashboard');
      },
      onError: error => {
        if (error.response?.status === 460 || error.response?.status === 461) {
          navigate(`/magic-link-expired?errorCode=${error.response.status}`);
        } else {
          navigate('/');
        }
      },
    }
  );
};

export default useVerifyMagicLinkToken;
