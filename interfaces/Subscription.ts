import { IUser, IPlan } from "./index";
export enum SUBSCRIPTION_STATUS {
  PAID = "paid",
  DUE = "due",
  CANCELLED = "cancelled",
  PENDING = "pending",
  SUSPEND = "suspend",
}
export enum SUBSCRIPTION_FREQUENCY {
  MONTHLY = "monthly",
  YEARLY = "yearly",
  LIFETIME = "lifetime",
}
export interface ISubscription {
  id?: number;
  userId: number;
  user?: IUser;
  planId: number;
  plan?: IPlan;
  status?: SUBSCRIPTION_STATUS; //i think this should be enum
  wordCredit: number;
  frequency?: SUBSCRIPTION_FREQUENCY; //enum
  paidBy?: string;
  paidAt?: string;
  paymentId?: string;

}
