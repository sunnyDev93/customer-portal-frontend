import React from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import { withAuthenticationRequired } from '../../shared/hooks/AptiveAuth';
import AddPaymentMethodsPage from './AddPaymentMethodsPage';

export default withAuthenticationRequired(AddPaymentMethodsPage, {
  onRedirecting: () => <LoadingSpinner centered />,
});
