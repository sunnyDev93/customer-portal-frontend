import React, { useState } from 'react';
import SlideOut from 'components/shared/slide-out/SlideOut';
import ReferralTermsConditions from 'components/modal-content/referral-terms-conditions/ReferralTermsConditions';

interface ReferralSectionProps {
  customerId: string;
  discount?: string;
}

const ReferralSection: React.FC<ReferralSectionProps> = ({ customerId, discount = 50 }) => {
  const [openReferralAndTerms, setOpenReferralAndTerms] = useState(false);
  return (
    <div className="p-[24px] shadow-mode-2 rounded-[8px] bg-white">
      <h1 data-testid="referral-section-head-title" className="mb-[16px] text-black text-[24px] leading-[31px] font-GTSuper">
        A better home is better shared.
      </h1>
      <div className="relative h-[124px] mb-[16px]">
        <svg
          className="absolute w-full left-[0px] top-[0px]"
          width="242"
          height="130"
          viewBox="0 0 242 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_352_4002)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 14C3 7.37259 8.37258 2 15 2H227C233.627 2 239 7.37258 239 14V43.3336C227.853 43.3337 218.816 52.5865 218.816 64.0003C218.816 75.4142 227.853 84.6669 239 84.667V114C239 120.627 233.627 126 227 126H15C8.37259 126 3 120.627 3 114V84.6669H3.00013C14.1476 84.6669 23.1843 75.4141 23.1843 64.0002C23.1843 52.5863 14.1476 43.3336 3.00013 43.3336H3V14Z"
              fill="#F5F7ED"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_352_4002"
              x="0"
              y="0"
              width="242"
              height="130"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_352_4002" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_352_4002" result="shape" />
            </filter>
          </defs>
        </svg>
        <div className="absolute w-full h-full flex justify-between items-center">
          <div className="w-[calc(50%)] border-gray-300 border-r h-full relative top-[2px]">
            <div className="w-full h-full relative top-[-2px] left-[-20px] flex flex-col justify-center items-end text-aptive-900 font-bold font-GTSuper">
              <span data-testid="referral-section-discount-amount" className="text-[32px] leading-[26px]">
                ${discount}
              </span>
              <span className="text-[20px] relative left-[-6px] leading-[26px]">OFF</span>
            </div>
          </div>
          <div className="w-[calc(50%)] h-full flex flex-col justify-center items-start ">
            <svg className="relative left-[32px]" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33.1089 39.7307C29.6238 42.6931 25.6158 44 21.3465 44C15.0733 44 9.14851 41.2119 5.40198 36.8554C2.09109 33.0218 0 27.7941 0 22.0436C0 9.58416 9.23564 0 20.7366 0C25.5287 0 29.798 1.56832 33.1089 4.26931V0.871286H44V43.1287H33.1089V39.7307ZM11.3267 22.0435C11.3267 28.6653 16.1188 33.5445 22.4792 33.5445C26.7485 33.5445 30.495 31.4534 32.6733 28.3167V15.6831C30.3208 12.5464 26.5742 10.4554 22.2178 10.4554C15.596 10.4554 11.3267 15.9445 11.3267 22.0435Z"
                fill="#344C38"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="text-[14px] leading-[18px] text-gray-600 mb-[16px]">
        <p className="mb-[16px]">Want to share the gift of pest control?</p>
        <p>
          <span data-testid="referral-section-discount-description">
            When you refer a friend to Aptive, they’ll save $150 on their first service and you’ll get ${discount} off your next scheduled
            treatment with us.
          </span>{' '}
          <span
            data-testid="referral-section-term-condition-action"
            onClick={() => setOpenReferralAndTerms(true)}
            className="underline cursor-pointer"
          >
            Terms and conditions apply
          </span>
          .
          <br />
          <br />
          <span>Share your referral link or QR code with your friends & family:</span>
          <br />
          <br />
          <a href={`https://go.aptive.us/${customerId}`} target="_blank" rel="noreferrer">
            <span className="underline cursor-pointer">go.aptive.us/{customerId}</span>
          </a>
          <br />
          <br />
          <span>Once they’ve entered your referral code and completed their first service, you’ll get rewarded. It’s that easy!</span>
        </p>
      </div>
      <div className="flex justify-center items-center">
        <img src={`https://go.aptive.us/qr/${customerId}`} alt="image-5" />
      </div>
      <SlideOut isOpen={openReferralAndTerms} onClose={() => setOpenReferralAndTerms(false)}>
        <ReferralTermsConditions />
      </SlideOut>
    </div>
  );
};

export default ReferralSection;
