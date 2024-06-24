import { SubscriptionPlan } from '../types/plan';
import { mockPlanList, mockUserPlan } from '../mocks/responseMocks';

export const getPlanList = (): Promise<SubscriptionPlan[]> => Promise.resolve<SubscriptionPlan[]>(mockPlanList);

export const getUserSubscription = (userId: string): Promise<SubscriptionPlan> => Promise.resolve<SubscriptionPlan>(mockUserPlan);
