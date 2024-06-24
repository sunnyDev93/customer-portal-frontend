import { PLAN_CATEGORIES } from 'pages/SubscriptionRenewal/SelectPlan/constants/plan-categories';
import XIcon from 'images/x-icon.png';
import React from 'react';

const PlanCategories = () => (
  <div className="w-full flex justify-start items-end flex-wrap">
    {PLAN_CATEGORIES.map(category => (
      <div data-testid="plan-category" key={category} className="flex justify-start items-center mr-4">
        <svg className="mr-[8px]" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.14111 13.355C6.64404 13.355 7.02979 13.1572 7.29834 12.7617L14.1172 2.32471C14.21 2.17822 14.2783 2.03662 14.3223 1.8999C14.3662 1.76318 14.3882 1.63135 14.3882 1.50439C14.3882 1.1626 14.2734 0.879395 14.0439 0.654785C13.8145 0.430176 13.5239 0.317871 13.1724 0.317871C12.9331 0.317871 12.7305 0.366699 12.5645 0.464355C12.4033 0.557129 12.2471 0.718262 12.0957 0.947754L6.11182 10.4033L3.06494 6.63135C2.80615 6.31396 2.48145 6.15527 2.09082 6.15527C1.73926 6.15527 1.44629 6.27002 1.21191 6.49951C0.982422 6.72412 0.867676 7.00977 0.867676 7.35645C0.867676 7.50781 0.894531 7.6543 0.948242 7.7959C1.00195 7.9375 1.09473 8.08398 1.22656 8.23535L5.00586 12.813C5.30859 13.1743 5.68701 13.355 6.14111 13.355Z"
            fill="#8D9886"
          />
        </svg>
        <span className="text-[12px] font-bold">{category}</span>
      </div>
    ))}
  </div>
);

export default PlanCategories;
