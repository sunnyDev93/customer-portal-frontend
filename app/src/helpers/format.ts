export interface FormatCurrencyOptions {
  currency?: string;
  maximumSignificantDigits?: number;
}

export const formatPhoneNumber = (phoneNumberString: string) => {
  const cleanNum = phoneNumberString.toString().replace(/\D/g, '');
  const match = cleanNum.match(/^(\d{3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    return '(' + match[1] + ') ' + (match[2] ? match[2] + '-' : '') + match[3];
  }
  return cleanNum;
};

export const formatName = (name: string | undefined, amount = 10) => {
  if (!name) return '';
  return name.length > amount ? `${name.substring(0, amount)}...` : name;
};

export const formatCurrency = (value: number, options?: FormatCurrencyOptions): string => {
  const { currency = 'USD', maximumSignificantDigits } = options || {};
  return Intl.NumberFormat('en-US', { style: 'currency', currency, maximumSignificantDigits }).format(value);
};
