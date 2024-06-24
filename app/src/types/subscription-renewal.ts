import { PlanAddon, SubscriptionPlan } from './plan';

export type SubscriptionRenewalInfo = {
  currentStep: number;
  selectedPlan?: SubscriptionPlan;
  additionalServices?: PlanAddon[];
};
