export enum PlanServiceStatus {
  Included = 'included',
  Selected = 'selected',
  Enable = 'enable',
  Disabled = 'disabled',
}

export type Addon = {
  id: string;
  name: string;
  iconName: string;
};

export type PlanAddon = {
  is_recurring?: boolean;
  id: string;
  addonId: string;
  name: string;
  price?: number;
  initialTreatmentPrice?: number;
  recurringPrice?: number;
  iconName?: string;
  iconSrc?: string;
  description?: string;
  status: PlanServiceStatus;
};

export type SubscriptionPlan = {
  id: string;
  order: number;
  name: string;
  pricePerService: number;
  initialTreatmentPrice: number;
  agreementLength?: string;
  treatmentFrequency: string[] | string;
  addons: PlanAddon[];
};
