import React, { useMemo } from 'react';
import Button from 'shared/components/Button';
import StepTitle from 'pages/SubscriptionRenewal/shared/components/StepTitle';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { aptiveUserDataState } from 'app-recoil/atoms/auth/aptive-user-data';
import { StringHelper } from 'helpers/string';

const Confirmation = () => {
  const aptiveUserData = useRecoilValue(aptiveUserDataState);
  const navigate = useNavigate();
  const itemDetails = useMemo(
    () => [
      {
        label: 'Time Window',
        value: <span className="bg-gray-100 rounded-md p-[10px]">1pm-5pm</span>,
      },
      {
        label: 'Customer Name',
        value: `${aptiveUserData?.firstName} ${aptiveUserData?.lastName}`,
      },
      {
        label: 'Service Type',
        value: 'Pro+ / Mosquito Initial',
      },
      {
        label: 'Customer Address',
        value: StringHelper.formatAddress(
          aptiveUserData?.address.address,
          aptiveUserData?.address.city,
          aptiveUserData?.address.state,
          aptiveUserData?.address.zip
        ),
      },
      {
        label: 'Appointment Duration',
        value: '60 minutes',
      },
    ],
    [aptiveUserData]
  );

  const handleOnDone = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <StepTitle title="Confirmation" subtitle="Your upgrade has been confirmed and your appointment has been scheduled" />
      <div className="flex justify-between items-start mt-6">
        <div className="w-[284px] shadow-lg rounded-[8px] p-[24px]">
          <div className="mb-[16px] font-medium text-[14px] text-[#374151]">SUBSCRIPTION INFORMATION</div>
          <div className="mb-[16px] h-[88px] rounded-[8px] bg-[#F3F4F6] flex justify-center items-center text-[#344C38] font-GTSuper text-[40px]">
            Pro+
          </div>

          <div className="pb-[16px] border-b border-[#D1D5DB] mb-[16px]">
            <div className="text-[#6B7280] text-[14px] font-medium">Service Plan</div>
            <div className="text-[14px] text-[#111827] font-semibold">Pro+ - 12 month</div>
            <div className="text-[14px] text-[#111827]">$169/treatment</div>
          </div>
          <div className="pb-[16px]">
            <div className="text-[#6B7280] text-[14px] font-medium">Specialty Pests</div>
            <div className="text-[14px] text-[#111827] font-semibold">Mosquito</div>
          </div>
        </div>

        <div className="w-[calc(100%-284px)] pl-[40px]">
          <div className="bg-white overflow-hidden">
            <ul className="divide-y divide-y-reverse divide-gray-200  ">
              <li className="border-b">
                <div className="px-4 py-6 sm:px-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm">Upcoming Appointment</p>
                      <p className="text-lg font-medium">30 August 2023</p>
                    </div>

                    <div className="ml-0 md:ml-2 flex-shrink-0 flex mt-5 sm:mt-0">
                      <div className="space-x-2 flex">
                        {/*<Link to="/billing/add-payment-methods">*/}
                        <Button label="Reschedule Appointment" type="button" color="muted" />
                        {/*</Link>*/}
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {itemDetails.map(item => (
                <li key={item.label}>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                      <div className="w-1/2 ">
                        <p className="text-gray-500 text-sm font-medium">{item.label}</p>
                      </div>

                      <div className="ml-2 flex w-full">
                        <p className="font-medium text-sm text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center mt-6">
        <Button label="Done: Return to Home" type="button" color="primary" onClick={handleOnDone} />
      </div>
    </>
  );
};

export default Confirmation;
