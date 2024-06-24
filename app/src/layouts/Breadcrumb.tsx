import React from 'react';

export const Breadcrumb = () => {
  const getLevel1 = () => {
    if (window.location.pathname.indexOf('/dashboard') !== -1) return 'My Account';
    else if (window.location.pathname.indexOf('/billing') !== -1) return 'Payments & Invoices';
    else return 'Appointments';
  };

  const getLevel2 = () => {
    if (window.location.pathname.split('/').pop() === 'dashboard') return 'Home';
    else if (window.location.pathname.split('/').pop() === 'documents') return 'My Documents';
    else if (window.location.pathname.split('/').pop() === 'subscription-renewal') return 'Subscription Renewal';
    else if (window.location.pathname.split('/').pop() === 'make-payments') return 'Make a Payment';
    else if (window.location.pathname.split('/').pop() === 'payment-settings') return 'Payment Settings';
    else if (window.location.pathname.split('/').pop() === 'add-payment-methods') return 'Add Payment Method';
    else if (window.location.pathname.split('/').pop() === 'invoice-history') return 'Invoice History';
    else if (window.location.pathname.split('/').pop() === 'upcoming') return 'Upcoming Appointment';
    else return 'Schedule an Appointment';
  };

  return (
    <div data-testid="breadscrum" className="pl-[16px] md:pl-[0px] mt-[16px] mb-[16px] text-[14px] leading-[16px]">
      <span data-testid="level1-id" className="text-[#78856E]">
        {getLevel1()} /{' '}
      </span>
      <span data-testid="level2-id" className="text-[#111827]">
        {getLevel2()}
      </span>
    </div>
  );
};

export default Breadcrumb;
