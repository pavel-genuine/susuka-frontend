import { IPlanFeatures, IUser } from "./index";
export enum PLAN_STATUS { 
  ACTIVE = 'ACTIVE', 
  DISABLED = 'DISABLED',
}
export enum PLAN_TYPE {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export interface IPlan {
id?: number;
  name: string;
  price: number;
  type?: PLAN_TYPE;
  wordCredit: number;
  primaryHeading?: string;
  features?: IPlanFeatures[]; // this should be of type PlanFeatures
  trial?: boolean;
  trialExpiredBy?: number;
  expiresBy: number;
  paddleGatewayId?: string;
  users?: IUser[];
  status?: PLAN_STATUS; 
  currency?: string;
  createdAt?:Date;
  stripeProductId?:string

}
