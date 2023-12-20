import { ISubscription } from "./Subscription";
import { IUser } from "./User";
export enum TRANSACTION_STATUS {
  PENDING = "pending",//before transaction completes the transaction will be in this state
  PAID = "paid",
  DEU = "due",//if the user doesn't pay full amount then it will show due... 
}
export interface ITransaction {
  id?: number;
  orderId: string;
  customerName?: string;
  email: string;
  subscriptionId: number;
  subscription?: ISubscription;
  paymentStatus?: TRANSACTION_STATUS;
  gateway?: string;
  paidOn?: Date;
  currency?: string;
  country?: string;
  userId: number;
  user?: IUser;
  tran_id?: string; //transaction_id for sslcommerze unique transaction id.
}
