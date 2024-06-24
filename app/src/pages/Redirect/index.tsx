import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFusionAuth from '../../shared/hooks/AptiveAuth/useFusionAuth';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function RedirectPage() {
  const navigate = useNavigate();
  const { getAccessToken } = useFusionAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      getAccessToken(
        { code },
        {
          onSuccess: () => {
            navigate('/dashboard');
          },
          onError: () => {
            navigate('/logout');
          },
        }
      );
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <LoadingSpinner centered />;
}
