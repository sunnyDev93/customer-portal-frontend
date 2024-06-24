import { PlanServiceStatus, SubscriptionPlan } from 'types/plan';
import { useCallback, useMemo } from 'react';
import useSelectSubscriptionPlan from '../../hooks/useSelectSubscriptionPlan';
import useGetCustomerProducts from 'pages/SubscriptionRenewal/SelectPlan/hooks/useGetCustomerProducts';
import useGetCustomerProductUpgrades from 'pages/SubscriptionRenewal/SelectPlan/hooks/useGetCustomerProductUpgrades';
import { PlanAttributes, PlanResponse, CustomerProductUpgradesResponse, Addon } from 'types/request';

const generatePriceDescription = (initialPrice: number, recurringPrice: number) => {
  const recurringPriceString = recurringPrice ? `additional $${recurringPrice} / per service` : '';
  return `${initialPrice ? '$' + initialPrice + ' initial & ' : ''}${recurringPriceString}`;
};

const generateUpgradeDescription = (nextPlan?: PlanResponse) => {
  return nextPlan ? `upgrade to ${nextPlan.attributes.name} or higher` : undefined;
};

const getStatus = (productId: number, planAttributes: PlanAttributes) => {
  if (planAttributes.products.includes(productId)) {
    return PlanServiceStatus.Included;
  }
  if (!planAttributes.products.includes(productId) && !planAttributes.addons.some(addon => addon.attributes.product_id === productId)) {
    return PlanServiceStatus.Disabled;
  }
  return PlanServiceStatus.Enable;
};

export interface IPurchasedInfo {
  product_id: number,
  purchased?: boolean
}

const getPurchasedInfo = (customerProductUpgrades: CustomerProductUpgradesResponse): IPurchasedInfo[] => {
  const result: IPurchasedInfo[] = [];
  customerProductUpgrades.forEach((upgradeInfo: PlanResponse) => {
    upgradeInfo.attributes.addons.forEach((addon: Addon) => {
      result.push({
        product_id: addon.attributes.product_id,
        purchased: addon.attributes.purchased
      })
    })
  })
  return result
}


const usePlanList = () => {
  const { isLoading: isLoadingCustomerProducts, data: customerProducts } = useGetCustomerProducts();

  const { isLoading: isLoadingCustomerProductUpgrades, data: customerProductUpgrades } = useGetCustomerProductUpgrades();
  const { selectedPlan, onSelect } = useSelectSubscriptionPlan();

  const generateAddons = useCallback(
    (attributes: PlanAttributes, nextPlan?: PlanResponse) => {
      return (
        customerProducts?.map(product => {
          const status = getStatus(+product.id, attributes);
          const description =
            status === PlanServiceStatus.Disabled
              ? generateUpgradeDescription(nextPlan)
              : generatePriceDescription(product.attributes.initial_price, product.attributes.recurring_price);
          return {
            id: product.id,
            addonId: product.id,
            name: product.attributes.name,
            initialTreatmentPrice: product.attributes.initial_price,
            recurringPrice: product.attributes.recurring_price,
            iconSrc: product.attributes.image,

            description,
            status,
            is_recurring: product.attributes.is_recurring
          };
        }) || []
      );
    },
    [customerProducts]
  );

  const planList = useMemo<SubscriptionPlan[]>(() => {
    const currentProductUpgrade = customerProductUpgrades?.find(productUpgrade => productUpgrade.attributes.is_current_plan);
    const nextPlan = currentProductUpgrade
      ? customerProductUpgrades?.find(productUpgrade => productUpgrade.attributes.order > currentProductUpgrade?.attributes.order)
      : undefined;
    return (
      customerProductUpgrades?.map(({ attributes }) => {
        return {
          id: attributes.plan_id.toString(),
          order: attributes.order,
          name: attributes.name,
          pricePerService: attributes.recurring_price,
          initialTreatmentPrice: attributes.initial_price,
          treatmentFrequency: attributes.frequency,
          agreementLength: attributes.agreement_length,
          addons: generateAddons(attributes, nextPlan),
        };
      }) || []
    );
  }, [customerProductUpgrades, customerProducts]);

  const userPlan = useMemo(() => {
    const currentProductUpgrade = customerProductUpgrades?.find(productUpgrade => productUpgrade.attributes.is_current_plan);
    const rs = planList?.find(plan => +plan.id === currentProductUpgrade?.attributes.plan_id);
    if (selectedPlan === undefined && rs && customerProducts) {
      onSelect(rs);
    }
    return rs;
  }, [planList, customerProductUpgrades, customerProducts]);

  return {
    isLoading: isLoadingCustomerProducts || isLoadingCustomerProductUpgrades,
    planList,
    userPlan,
    getPurchasedInfo
  };
};

export default usePlanList;
