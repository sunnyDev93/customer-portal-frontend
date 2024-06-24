import React, { useLayoutEffect } from 'react';

import { useTrackingView } from '../shared/hooks/useTrackingView';
import { useAptiveAuth } from '../shared/hooks/AptiveAuth';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAptiveAuth();
  const navigate = useNavigate();
  useTrackingView();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect?.();
    } else {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return null;
};

export default AuthPage;
