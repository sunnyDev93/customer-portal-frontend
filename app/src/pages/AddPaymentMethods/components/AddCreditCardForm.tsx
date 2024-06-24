import React, { useEffect, useState, useRef } from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { usePaymentServiceAuthToken } from '../hooks/usePaymentServiceAuthToken';

const CARD_TYPES = ['Visa', 'Mastercard', 'Discover', 'Amex'] as const;
type CardTypes = typeof CARD_TYPES[number];

interface TokenizeResponse {
  firstSix: string;
  lastFour: string;
  referenceNumber: string;
  token: string;
  tokenHMAC: string;
}
export interface TokenexData extends TokenizeResponse {
  cardType: CardTypes;
  expirationMonth: string;
  expirationYear: string;
}

interface PaymentFormProps {
  isTokenizing?: boolean;
  onSubmit?: (data: TokenexData) => void;
  setIsTokenizing?: React.Dispatch<boolean>;
}

const getCurrentTimestamp = () => {
  return new Date()
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, -3);
};

declare global {
  interface Window {
    TokenEx: any;
  }
}

const HOST_NAME = window.location.origin;

const currentTimeStamp = getCurrentTimestamp();

const PaymentForm: React.FC<PaymentFormProps> = ({ isTokenizing, onSubmit, setIsTokenizing }) => {
  const currentYear = new Date().getFullYear();
  const expirationYears = Array.from({ length: 10 }, (_, i) => currentYear + i);

  const [authKey, setAuthKey] = useState<string | null>(null);
  const [tokenexIframe, setTokenexIframe] = useState<any | null>(null);
  const [isSubmitOne, setIsSubmitOne] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState('01');
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedCardType, setSelectedCardType] = useState<CardTypes>(CARD_TYPES[0]);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [iframeErrorMessage, setIframeErrorMessage] = useState<string>('');

  const tokenExIframeRef = useRef<HTMLDivElement | null>(null);
  const { isLoading, data, error } = usePaymentServiceAuthToken({ origin: HOST_NAME, timestamp: currentTimeStamp }, !authKey);

  useEffect(() => {
    if (tokenExIframeRef.current && authKey) {
      const iframeConfig = {
        origin: HOST_NAME,
        timestamp: currentTimeStamp,
        tokenExID: '9008701043721125',
        tokenScheme: 'PCI',
        authenticationKey: authKey,
        pci: true,
        enablePrettyFormat: true,
        styles: {
          base: 'font-family: Helvetica, Arial, sans-serif;padding: 0 8px;border: 1px solid #ccc;;margin: 0;width: 100%;font-size: 16px;line-height: 30px;height: 35px;box-sizing: border-box;-moz-box-sizing: border-box; border-radius: 4px;',
          focus: 'box-shadow: 0 0 6px 0 rgba(0, 132, 255, 0.5);border: 1px solid rgba(0, 132, 255, 0.5);outline: 0;',
          error: 'box-shadow: 0 0 6px 0 rgba(224, 57, 57, 0.5);border: 1px solid rgba(224, 57, 57, 0.5);',
        },
      };

      setTimeout(() => {
        try {
          const iframe = new window.TokenEx.Iframe(tokenExIframeRef.current?.id, iframeConfig);
          setTokenexIframe(iframe);
          iframe.load();
        } catch (err: any) {
          setIframeErrorMessage('Cannot load the Iframe. Please refresh to try again.');
        }
      }, 0);
    }
  }, [tokenExIframeRef, authKey]);

  // GET AUTH TOKEN KEY
  useEffect(() => {
    if (!authKey && data?.authentication_key) {
      setAuthKey(data.authentication_key);
    }
  }, [data, authKey]);

  if (tokenexIframe) {
    tokenexIframe.on('validate', function (data: any) {
      if (!data.isValid) {
        if (data.validator === 'format') {
          setErrorMessage('Invalid card format');
        } else if (data.validator === 'required') {
          setErrorMessage('Card number is required');
        } else {
          setErrorMessage('Card validation failed');
        }
      } else {
        setErrorMessage('');
        setIsTokenizing && setIsTokenizing(true);
        tokenexIframe.tokenize();
      }
    });

    tokenexIframe.on('tokenize', function (data: TokenizeResponse) {
      if (data) {
        setIsTokenizing && setIsTokenizing(false);
        onSubmit &&
          onSubmit({
            ...data,
            expirationMonth: selectedMonth,
            expirationYear: selectedYear,
            cardType: selectedCardType,
          });
      }
    });
  }

  const tokenexValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const selectedMonthInt = parseInt(selectedMonth, 10);
    const selectedYearInt = parseInt(selectedYear, 10);

    if (selectedYearInt < currentYear || (selectedYearInt === currentYear && selectedMonthInt < currentMonth)) {
      setErrorMessage('Card is expired');
    } else {
      if (!isSubmitOne) {
        tokenexIframe.validate();
        setIsSubmitOne(true);
      }
    }
  };

  return (
    <div className="mt-3 space-y-3">
      <h3 className="col-span-12 font-bold text-lg mb-0">Card Information</h3>
      <div>
        <label htmlFor="tokenExIframeDiv" className="block text-sm font-medium text-gray-900">
          Card Number
        </label>

        {isLoading && <LoadingSpinner label="Loading..." />}
        {error && <p className="text-sm text-red-800">{error.message || error.response?.statusText}</p>}
        <div ref={tokenExIframeRef} id="tokenExIframeDiv" className="text-gray-600 h-[35px] mt-1">
          {iframeErrorMessage && <div className="text-red-800 text-sm">{iframeErrorMessage}</div>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Card Type</label>
        <select
          value={selectedCardType}
          onChange={e => setSelectedCardType(e.target.value as CardTypes)}
          className="mt-1 block w-full shadow-sm sm:text-sm p-2 border border-gray-300 rounded-md fs-exclude"
        >
          {CARD_TYPES.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900">Expiration</label>

        <div className="flex space-x-2 w-1/2">
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm p-2 border border-gray-300 rounded-md fs-exclude"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const monthValue = (i + 1).toString().padStart(2, '0');
              return (
                <option key={monthValue} value={monthValue}>
                  {monthValue}
                </option>
              );
            })}
          </select>

          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm p-2 border border-gray-300 rounded-md fs-exclude"
          >
            {expirationYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {errorMessage && <div className="text-red-800 text-sm">{errorMessage}</div>}

      <button
        disabled={isLoading || isTokenizing}
        onClick={tokenexValidate}
        className="Button_customButton__WZUMq text-white bg-aptive-900 hover:bg-gray-400 disabled:bg-gray-50 disabled:border-none disabled:text-gray-400 pt-2 pb-2 pl-6 pr-6 border text-sm rounded shadow-sm block text-center mr-3"
      >
        Submit
      </button>
    </div>
  );
};

export default PaymentForm;
