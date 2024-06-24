import { getPaymentMethodAvatar, ccTypeToImage } from './TypeToImageUtils';

import AchImage from '../images/cc/ach.png';
import DefaultCCImage from '../images/cc/default-card.png';
import { PaymentMethodProps } from 'components/PaymentMethodItem';

describe('getPaymentMethodAvatar', () => {
  it('should return AchImage for paymentMethod 2', () => {
    const result = getPaymentMethodAvatar({ paymentMethodType: 'ACH' } as PaymentMethodProps);
    expect(result).toBe(AchImage);
  });

  it('should return corresponding image for valid card type', () => {
    const cardTypes = [
      'airplus',
      'americanexpress',
      'amex',
      'cartebleue',
      'dankort',
      'diners',
      'discover',
      'jcb',
      'laser',
      'maestro',
      'mastercard',
      'visa',
      'visaelectron',
    ];

    cardTypes.forEach(cardType => {
      const result = getPaymentMethodAvatar({ cardType } as PaymentMethodProps);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string'); // Ensure it's a string (image path)
    });
  });

  it('should return DefaultCCImage for unknown card type', () => {
    const result = getPaymentMethodAvatar({ cardType: 'unknown' } as PaymentMethodProps);
    expect(result).toBe(DefaultCCImage);
  });
});

describe('ccTypeToImage', () => {
  it('should return corresponding image for valid card type', () => {
    const cardTypes = [
      'airplus',
      'americanexpress',
      'amex',
      'cartebleue',
      'dankort',
      'diners',
      'discover',
      'jcb',
      'laser',
      'maestro',
      'mastercard',
      'visa',
      'visaelectron',
    ];

    cardTypes.forEach(cardType => {
      const result = ccTypeToImage(cardType);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string'); // Ensure it's a string (image path)
    });
  });

  it('should return DefaultCCImage for unknown card type', () => {
    const result = ccTypeToImage('unknown');
    expect(result).toBe(DefaultCCImage);
  });

  it('should handle undefined input', () => {
    const result = ccTypeToImage(undefined);
    expect(result).toBe(DefaultCCImage);
  });
});
