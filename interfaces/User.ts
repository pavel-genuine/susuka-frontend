import {ITransaction} from "./Transaction";

export enum USER_STATUS {
  ACTIVE = "active",
  SUSPENDED = "suspended",
  PENDING = "pending",
  BLOCKED = "blocked",
}
export enum USER_TYPE {
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    USER = 'user',
    SUBSCRIBER = 'subscriber',
    ANONYMOUS = 'anonymous',
}

export interface IUser {
    id?: number;
    name: string;
    email: string;
    emailVerifiedAt?: Date;
    phone?: string;
    password?: string;
    profilePicture?: string;
    oauthId?: string;
    oAuthType?: string;
    twoFA?: boolean;
    country?: string;
    status?: USER_STATUS;
    tag?: string;
    companyName?: string;
    website?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    ip?: string;
    macAddress?: string;
    //   planId?: number;
    //   plan?: Plan;
    userType?: USER_TYPE;
    bonusCredit?: number;
    bonusActiveDate?: Date;
    bonusExpiredBy?: number;
    stripeCustomerId?: string;
    transactions?: ITransaction;
    createdAt?: Date;
    subscription: any[];

    subscriptionId: number | string;
    verificationToken: string;

    wordCredit?: number;
    usedWordCredit?: number;

    planExpiredBy?: Date;
    planActiveDate?: Date;
}
 