import React, { PropsWithChildren } from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';

interface ServicePreviewCardProps {
  serviceImage: string;
  name: string;
  price: string;
  des: string;
  serviceDate: string;
}

export const ServicePreviewCard: React.FC<PropsWithChildren<ServicePreviewCardProps>> = ({
  serviceImage,
  name,
  price,
  des,
  serviceDate,
}) => {
  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-start">
        <div className="w-140px h-140px bg-gray-100 flex flex-col justify-center items-center">
          <img data-testid="service-image" src={serviceImage} alt="placeholder" className="w-78px" />
        </div>
        <div className="w-140px-offset pl-6">
          <div className="mb-3 flex justify-between items-center">
            <div data-testid="service-name" className="text-black text-font-14px leading-16px font-medium">
              {name}
            </div>
            <div data-testid="service-price" className="text-black text-font-14px leading-16px font-medium">
              {price}
            </div>
          </div>
          <div data-testid="service-des" className="text-gray-500 text-font-14px leading-16px">
            {des}
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <CheckCircleIcon width="16px" color="#309C42" />
        <div data-testid="service-date" className="ml-3 text-font-14px leading-16px font-medium text-gray-500">
          Serviced on {serviceDate}
        </div>
      </div>
    </div>
  );
};

export default ServicePreviewCard;
