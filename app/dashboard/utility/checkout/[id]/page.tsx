'use client';
import Card from '@/components/ui/Card';

import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AppDispatch } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchAllPlans } from '@/redux/features/plan/allPlansSlice';
import {
    createStripeTransaction,
    createSubscription,
    getSslCommerz,
} from '@/api/api';
import PaymentDialog from '@/components/application-components/payment/payment-dialog.component';
import { toast } from 'react-toastify';

import ssllogo from '../../../../../public/assets/images/all-img/ssl.png';
import stripelogo from '../../../../../public/assets/images/all-img/stripe.png';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Checkoutpage = ({ params }) => {
    const dispatch: AppDispatch = useAppDispatch();
    const { plans } = useAppSelector((state) => state?.allPlans);
    const router = useRouter();

    const [clientScrete, setClientScrete] = useState('');
    const [paymentAttempt, setPaymentAttempt] = useState<boolean>();
    const [selectedGateway, setSelectedGateway] = useState('');

    useEffect(() => {
        dispatch(fetchAllPlans());
    }, []);

    const onPaymentSuccessful = () => {
        toast.success('Success!');
        setPaymentAttempt(false);
    };

    const onPaymentFailed = () => {
        toast.error('Error!');
        setPaymentAttempt(false);
    };

    const onCloseModal = () => {
        toast.warning('Closed');
        setPaymentAttempt(false);
    };
    useEffect(() => {
        dispatch(fetchAllPlans());
    }, []);

    const selectedPlan = plans?.find((plan) => plan?.id == params?.id);

    const checkoutHandler = async () => {
        const { data } =
            selectedGateway &&
            (await createSubscription({
                planId: selectedPlan?.id,
                userId: 1,
                status: selectedPlan?.status,
                paidBy: 'Stripe',
                paidAt: new Date(),
                paymentId: selectedPlan?.stripeProductId,
                frequency: selectedPlan?.type,
                wordCredit: selectedPlan?.wordCredit,
            }));


        if (data?.id && selectedGateway == 'stripe') {
            console.log('strip active');

            const res = await createStripeTransaction({
                country: 'bd',
                email: 'email@gmail.com',
                subscriptionId: data?.id,
            });

            setClientScrete(res?.data?.clientSecret);

            res?.data?.clientSecret && setPaymentAttempt(true);

        } else if (selectedGateway == 'sslcommerz') {
            const response = await getSslCommerz(
                data?.id,
                'bd',
                'email@gmail.com'
            ); 
            console.log(response, 'res ssl');
            router.push(response?.data)
            
        }
    };

    // console.log(clientScrete,'ccssss');

    // console.log(selectedGateway, 'sss');

    return (
        <div className="md:flex ">
            <div className="md:w-[30%] md:mr-5">
                <Card>
                    <div className="md:h-[70vh]">
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel
                                    value="sslcommerz"
                                    onChange={(e) => {
                                        setSelectedGateway('sslcommerz');
                                    }}
                                    control={<Radio />}
                                    label={
                                        <div className="flex justify-center items-center">
                                            <p className="mr-2">SSLCommerz</p>
                                            <img
                                                className="w-[80px]"
                                                src="/assets/images/all-img/ssl.png"
                                                alt=""
                                            />
                                        </div>
                                    }
                                />
                                {/* <FormControlLabel
                                    value="paddle"
                                    control={<Radio />}
                                    label="Paddle"
                                /> */}
                                <FormControlLabel
                                    value="stripe"
                                    onChange={(e) => {
                                        setSelectedGateway('stripe');
                                    }}
                                    control={<Radio />}
                                    label={
                                        <div className="flex justify-center items-center">
                                            <p className="mr-2">Stripe</p>
                                            <img
                                                className="w-[80px]"
                                                src="/assets/images/all-img/stripe.png"
                                                alt=""
                                            />
                                        </div>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>

                        <p className="flex  mt-4">
                            {' '}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 mr-3"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                />
                            </svg>
                            Encrypted and Secure Payment
                        </p>
                    </div>
                </Card>
            </div>

            <div className="md:w-[60%]">
                <Card>
                    <div className="md:h-[70vh]">
                        <h3 className="mb-4 text-xl font-semibold">
                            Purchase Summary
                        </h3>
                        <div className="flex justify-between items-center mb-2">
                            <p>{selectedPlan?.name}</p>
                            <p>{selectedPlan?.price}</p>
                        </div>

                        <div className="flex justify-between items-center pb-2 mb-2 border-b dark:border-slate-700 border-gray-200">
                            <p>Plan Discount - </p>
                            <p></p>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <h3 className="mb-4 text-xl">Sub Total</h3>
                            <h3 className="mb-4 text-xl">
                                {selectedPlan?.price}
                            </h3>
                        </div>

                        <p className="text-success-50 my-2">
                            Have a coupon code ?
                        </p>

                        <div className="flex items-center space-x-4 ">
                            <input
                                className="rounded border px-2 h-[40px]"
                                type="text"
                            />{' '}
                            <button className="h-[40px] bg-[black] text-[white] p-2 rounded text-center w-[100px]">
                                Apply{' '}
                            </button>
                        </div>
                        <p className="text-xl  my-2">Coupon code : </p>
                        <div className="flex items-center space-x-4  border-b dark:border-slate-700 border-gray-200  pb-2 mb-2 ">
                            <p className="text-[grey] my-2"> code</p>
                            <button className="h-[40px] font-semibold text-[red] p-2 rounded text-center w-[100px]">
                                REMOVE
                            </button>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <h3 className="mb-4 text-xl">Total</h3>
                            <h3 className="mb-4 text-xl">
                                {selectedPlan?.price}
                            </h3>
                        </div>

                        <button
                            onClick={checkoutHandler}
                            className="h-[50px] bg-success-50 text-[white] p-2 rounded text-center px-5 w-[300px]"
                        >
                            Checkout{' '}
                        </button>
                    </div>
                </Card>
            </div>

            {paymentAttempt && (
                <PaymentDialog
                    clientSecret={clientScrete}
                    onFailed={onPaymentFailed}
                    onSuccess={onPaymentSuccessful}
                    // productName={selectedMembershipTier?.name}
                    // price={price}
                    // currency={selectedMembershipTier?.currency}
                    // recurringText="Year"
                    // showCoseIcon={true}
                    onCloseModal={onCloseModal}
                    price={selectedPlan?.price}
                />
            )}
        </div>
    );
};

export default Checkoutpage;
