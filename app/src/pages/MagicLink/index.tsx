import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import useVerifyMagicLinkToken from './hooks/useVerifyMagicLinkToken';
import { AuthType } from '../../constants/auth';

const MagicLink = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { mutate } = useVerifyMagicLinkToken();

  useEffect(() => {
    if (token) {
      window.localStorage.setItem('authType', AuthType.MagicLink);
      mutate({ token });
    } else {
      return navigate('/');
    }
  }, [navigate, token]);

  return <LoadingSpinner centered />;
};

export default MagicLink;
