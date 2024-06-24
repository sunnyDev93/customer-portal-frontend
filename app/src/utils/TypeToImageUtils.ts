import AirPlus from '../images/cc/air-plus.png';
import AmericanExpress from '../images/cc/american_express.jpg';
import CarteBleue from '../images/cc/carte_bleue.png';
import DanKort from '../images/cc/dankort.png';
import Diners from '../images/cc/diners.png';
import JCB from '../images/cc/jcb.png';
import Laser from '../images/cc/laser.png';
import Maestro from '../images/cc/maestro.png';
import VisaImage from '../images/cc/Visa-dark.png';
import MasterCardImage from '../images/cc/mastercard.jpeg';
import AchImage from '../images/cc/ach.png';
import DiscoverImage from '../images/cc/discover.jpg';
import DefaultCCImage from '../images/cc/default-card.png';
import { PaymentMethodProps } from 'components/PaymentMethodItem';

export const getPaymentMethodAvatar = (method: PaymentMethodProps) => {
  return method.paymentMethodType === 'ACH' ? AchImage : ccTypeToImage(method?.cardType);
};
export const getPaymentMethodType = (method: PaymentMethodProps) => {
  return method.paymentMethodType === 'ACH' ? method.accountType : (method?.cardType ? method?.cardType : 'Other');
};

export const ccTypeToImage = (value?: string) => {
  const type = value ? value.replace(/[^a-zA-Z]+/g, '').toLowerCase() : '';

  switch (type) {
    case 'airplus':
      return AirPlus;
    case 'americanexpress':
      return AmericanExpress;
    case 'amex':
      return AmericanExpress;
    case 'cartebleue':
      return CarteBleue;
    case 'dankort':
      return DanKort;
    case 'diners':
      return Diners;
    case 'discover':
      return DiscoverImage;
    case 'jcb':
      return JCB;
    case 'laser':
      return Laser;
    case 'maestro':
      return Maestro;
    case 'mastercard':
      return MasterCardImage;
    case 'visa':
      return VisaImage;
    case 'visaelectron':
      return VisaImage;
    default:
      return DefaultCCImage;
  }
};
