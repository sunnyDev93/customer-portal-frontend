import React from 'react';

const CompleteIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="10" fill="#4b9c42" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.3657 6.23431C15.6781 6.54673 15.6781 7.05327 15.3657 7.36569L8.96571 13.7657C8.65329 14.0781 8.14676 14.0781 7.83434 13.7657L4.63434 10.5657C4.32192 10.2533 4.32192 9.74673 4.63434 9.43431C4.94676 9.1219 5.45329 9.1219 5.76571 9.43431L8.40002 12.0686L14.2343 6.23431C14.5468 5.9219 15.0533 5.9219 15.3657 6.23431Z"
        fill="white"
      />
    </svg>
  );
};

interface EachStepProps {
  title?: string;
  isActive?: boolean;
  customClass?: string;
}

const EachStep: React.FC<EachStepProps> = ({ title, isActive, customClass = 'text-center' }) => {
  return (
    <div className={`${customClass} flex "breakpoint-max-970:justify-center justify-start items-center breakpoint-max-970:mb-[8px]`}>
      {isActive && (
        <div className="breakpoint-max-970:block hidden mr-[4px]">
          <CompleteIcon />
        </div>
      )}
      <div className={` text-[14px] font-semibold ${isActive ? 'text-[#309C42]' : 'text-[#9CA3AF]'}`}>{title}</div>
    </div>
  );
};

interface SubscriptionRenewalLayoutProps {
  children?: React.ReactNode;
  step?: number;
}

export const SubscriptionRenewalLayout: React.FC<SubscriptionRenewalLayoutProps> = ({ children, step = 1 }) => {
  return (
    <div className="shadow-md rounded-[8px] pt-[24px] pb-[40px] pr-[24px] pl-[24px] bg-[#FFFFFF]">
      <div className="breakpoint-max-970:hidden block overflow-hidden h-[8px] rounded-[8px] bg-[#E1E3E8] w-full mb-[5px] flex justify-start items-center">
        {step >= 1 && <div className={`w-[calc(100%/6)] h-full bg-[#309C42] ${step === 1 ? 'rounded-tr-[8px] rounded-br-[8px]' : ''}`} />}
        {step >= 2 && <div className={`w-[calc(100%/6)] h-full bg-[#309C42] ${step === 2 ? 'rounded-tr-[8px] rounded-br-[8px]' : ''}`} />}
        {step >= 3 && <div className={`w-[calc(100%/6)] h-full bg-[#309C42] ${step === 3 ? 'rounded-tr-[8px] rounded-br-[8px]' : ''}`} />}
        {step >= 4 && <div className={`w-[calc(100%/6)] h-full bg-[#309C42] ${step === 4 ? 'rounded-tr-[8px] rounded-br-[8px]' : ''}`} />}
        {step >= 5 && <div className={`w-[calc(100%/6)] h-full bg-[#309C42] ${step === 5 ? 'rounded-tr-[8px] rounded-br-[8px]' : ''}`} />}
        {step >= 6 && <div className={`w-[calc(100%/6)] h-full bg-[#309C42] ${step === 6 ? 'rounded-tr-[8px] rounded-br-[8px]' : ''}`} />}
      </div>
      <div className="pb-[14px] border-b border-[#D1D5DB] breakpoint-max-970:flex-col  flex breakpoint-max-970:justify-start justify-start items-start">
        <EachStep isActive={step >= 1} customClass="text-left breakpoint-max-970:w-full w-[calc(100%/6)] " title="Select a Plan" />
        <EachStep
          isActive={step >= 2}
          customClass="text-right breakpoint-max-970:text-left breakpoint-max-970:w-full w-[calc(100%/6)] "
          title="Additional Services"
        />
        <EachStep
          isActive={step >= 3}
          customClass="text-right breakpoint-max-970:text-left breakpoint-max-970:w-full w-[calc(100%/6)] "
          title="Overview"
        />
        <EachStep
          isActive={step >= 4}
          customClass="text-right breakpoint-max-970:text-left breakpoint-max-970:w-full w-[calc(100%/6)] "
          title="Service Agreement"
        />
        <EachStep
          isActive={step >= 5}
          customClass="text-right breakpoint-max-970:text-left breakpoint-max-970:w-full w-[calc(100%/6)] "
          title="Schedule Service"
        />
        <EachStep
          isActive={step >= 6}
          customClass="text-right breakpoint-max-970:text-left breakpoint-max-970:w-full w-[calc(100%/6)] "
          title="Confirmation"
        />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SubscriptionRenewalLayout;
