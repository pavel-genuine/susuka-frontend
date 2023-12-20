import { getStripePublickey } from '@/api/api';
import { CurrencyCode } from '@/constant';
import { Dialog, DialogContent } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PaymentForm from './payment-form.component';

export interface PaymentDialogProps {
    clientSecret: string;
    onSuccess?: () => void;
    onFailed?: () => void;
    onCloseModal?: () => void;
    currency?: CurrencyCode;
    price?: number;
}

export default function PaymentDialog({
    clientSecret,
    onSuccess,
    onFailed,
    onCloseModal,
    price,
    currency,
}: PaymentDialogProps) {
    const router = useRouter();
    const [stripe, setStripe] = useState(null);
    const [dialogShowStatus, setDialogShowStatus] = useState(true);

    useEffect(() => {
        if (clientSecret) {
            (async () => {
                const { data } = await getStripePublickey();
                if (data?.publicKey) {
                    setStripe(loadStripe(data?.publicKey || ''));
                }
            })();
        }
    }, [clientSecret]);
    if (!stripe) return <></>;
    const onSuccessfulPayment = () => {
        setDialogShowStatus(false);
        toast.success(
            'Your payment is processed. You will receive a receipt in email.'
        );
        if (onSuccess) onSuccess();
        else router.push('/');
    };
    const onFailedPayment = () => {
        setDialogShowStatus(false);
        toast.error('Unable to process your payment. Please try again.');
        if (onFailed) onFailed();
        else router.push('/');
    };

    return (
        <Dialog open={dialogShowStatus}>
            <DialogContent>
                {stripe && clientSecret && (
                    <Elements stripe={stripe} options={{ clientSecret }}>
                        <PaymentForm
                            onSuccessPayment={onSuccessfulPayment}
                            onFailedPayment={onFailed}
                            onCloseModal={onCloseModal}
                            price={price}
                        />
                    </Elements>
                )}
            </DialogContent>
        </Dialog>
    );
}

//1H

//1H
