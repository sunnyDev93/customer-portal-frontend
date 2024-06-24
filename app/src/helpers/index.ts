import { CustomerPaymentProfile } from 'types/request';
import { PaymentMethodProps } from 'components/PaymentMethodItem';
import { AuthType } from '../constants/auth';

export const toDollars = (value: number | string | undefined | null) => {
  if (!value && value !== 0) return '';
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(Number(value));
};

export const getAccountType = (paymentProfile: CustomerPaymentProfile | undefined): string => {
  return paymentProfile?.accountType ? 'Savings' : 'Checking';
};

export const getCardType = (paymentProfile: PaymentMethodProps): string => {
  return paymentProfile.paymentMethodType === 'CC' ? paymentProfile.cardType : paymentProfile?.accountType;
};

export const concat = (firstValue: string, secondValue: string, separator = '/'): string => {
  return secondValue === '' ? firstValue : `${firstValue}${separator}${secondValue}`;
};

export const isUsingMagicLinkAuthen = () => {
  const pathname = window.location.pathname;
  return pathname.match(/^(\/magic-link\/).+/g) || window.localStorage.getItem('authType') === AuthType.MagicLink;
};
