'use client';
import {
    Button,
    CircularProgress,
    IconButton,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import {
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { CurrencyCode } from '@/constant';
import { useState } from 'react';
import { Col, Row } from '@/components/ui';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
export interface PaymentFormProps {
    onSuccessPayment: () => void;
    onFailedPayment?: () => void;
    price?: number;
    productName?: string;
    currency?: CurrencyCode;
    recurringText?: string;
    onCloseModal?: () => void;
    showCloseIcon?: boolean;
    tax?: number;
    taxIncluded?: boolean;
}

export default function PaymentForm({
    onSuccessPayment,
    onFailedPayment,
    onCloseModal,
    showCloseIcon=true,
    productName,
    price,
    currency,
}: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!stripe && !elements) {
        return <></>;
    }

    const handlePayment = async () => {
        setIsSubmitting(true);
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url:
                    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            },
            redirect: 'if_required',
        });
        setIsSubmitting(false);
        if (error) {
            onFailedPayment();
        } else {
            onSuccessPayment();
        }
    };
    return (
        <>
            <form>
                <Box
                    sx={{
                        pb: 1.5,
                        position: 'relative',
                        pt: 1,
                    }}
                >
                    {showCloseIcon && (
                        <IconButton
                            aria-label="CloseIcon"
                            sx={{
                                position: 'absolute',
                                top: -17,
                                right: -17,
                            }}
                            onClick={() => onCloseModal && onCloseModal()}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                    <Row>
                        <Col>
                            {/* <Icon sx={{ height: '5rem', width: '5rem' }} /> */}
                            <IconButton
                                sx={{
                                    height: 75,
                                    width: 75,
                                    borderWidth: 2,
                                    borderStyle: 'solid',
                                    borderColor: 'primary.main',
                                    borderRadius: 3,
                                }}
                            >
                                <GppGoodOutlinedIcon
                                    sx={{
                                        color: 'primary.main',
                                        fontSize: 42,
                                    }}
                                />
                            </IconButton>
                        </Col>
                        <Col
                            sx={{
                                padding: '0.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'space-between',
                            }}
                        >
                            <Typography
                                variant="inherit"
                                sx={{
                                    fontSize: '1.75rem',
                                    fontWeight: '600',
                                    lineHeight: '2rem',
                                }}
                            >
                                {productName}
                            </Typography>

                            <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                <Typography
                                    variant="inherit"
                                    sx={{
                                        fontSize: '2.25rem',
                                        fontWeight: '600',
                                        lineHeight: '2.5rem',
                                        display: 'inline',
                                        pr: 1,
                                        color: '#000',
                                    }}
                                >
                                    {currency?.toUpperCase()}
                                    {' $ '}
                                    {price?.toFixed(2)}
                                </Typography>
                            </Typography>
                        </Col>
                    </Row>
                    <Box sx={{ mt: 3 }}>
                        <PaymentElement />
                    </Box>
                    <Box
                        sx={{
                            mt: 3,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mt: 1,
                                width: '100%',
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePayment();
                            }}
                            variant="contained"
                            // color="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && (
                                <CircularProgress
                                    color="inherit"
                                    size={'1rem'}
                                    sx={{
                                        color: 'primary',
                                        my: 0.25,
                                        mr: 1,
                                    }}
                                />
                            )}
                            Pay Now
                        </Button>
                    </Box>
                </Box>
            </form>
        </>
    );
}
