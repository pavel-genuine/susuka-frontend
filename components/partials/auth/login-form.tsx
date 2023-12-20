import React, { useEffect, useState } from 'react';
import Textinput from '@/components/ui/Textinput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import { Button, Checkbox } from "@mui/material";
import { fetchSignIn } from '@/redux/features/auth/signInSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { USER_TYPE } from '@/interfaces';
import { updateProfile } from '@/redux/features/user/updateUserSlice';
import { deleteCookie, setCookie } from 'cookies-next';
import Checkbox from '@/components/ui/Checkbox';
import { base_url, sendVerificationEmail, verifyEmail } from '@/api/api';
import Alert from '@/components/ui/Alert';
import Modal from '@/components/ui/Modal';
import { sign } from 'crypto';
import Loading from '@/components/Loading';
import googleLogo from '@/assets/google.svg';
import { fetchOwnProfile } from '@/redux/features/user/ownProfileSlice';

const schema = yup
    .object({
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is Required'),
        password: yup.string().required('Password is Required'),
    })
    .required();
const LoginForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        //
        mode: 'all',
    });

    const label = { inputProps: { 'aria-label': 'Keep Me Signed In' } };

    const [checked, setChecked] = useState(false);

    const [alert, setAlert] = useState(false);
    const [verifyAlert, setVerifyAlert] = useState(false);

    const [message, setMessage] = useState('');
    const [credentials, setCredentials] = useState({});

    const router = useRouter();

    const dispatch = useAppDispatch();

    const { signIn } = useAppSelector((state) => state?.signIn);
    const { profile } = useAppSelector((state) => state?.ownProfile);

    const handleSendEmail = async () => {
        const { data } = await sendVerificationEmail(credentials);

        console.log(data, 'data send email');
        setMessage(data?.message);

        setTimeout(() => {
            setAlert(false);
        }, 200);
        setTimeout(() => {
            setVerifyAlert(true);
        }, 300);
        setTimeout(() => {
            setVerifyAlert(false);
        }, 6000);
    };

    const onSubmit = async (data) => {
        setCredentials(data);

        dispatch(fetchSignIn(data));

        setAlert(true);

        setTimeout(() => {
            setAlert(false);
        }, 6000);
    };

    // profile?.email &&
    //   setTimeout(() => {
    //     router.push("/");
    //   }, 4000);
    
    useEffect(() => {
        setMessage(signIn?.message);
        if (signIn?.user?.userType == 'user' && signIn?.user?.emailVerifiedAt) {
            deleteCookie('admin');

            setCookie('user', 'true');

            setTimeout(() => {
                router.push('/');
            }, 1000);
        }
        if (
            signIn?.user?.userType == USER_TYPE.SUBSCRIBER &&
            signIn?.user?.emailVerifiedAt
        ) {
            deleteCookie('admin');

            setCookie(USER_TYPE.USER, 'true');

            setTimeout(() => {
                router.push('/');
            }, 1000);
        }

        if (
            signIn?.user?.userType == 'admin' &&
            signIn?.user?.emailVerifiedAt
        ) {
            deleteCookie('user');

            setCookie('admin', 'true');

            setTimeout(() => {
                router.push('/');
            }, 1000);
        }
    }, [signIn]);

    return (
        <div>
            {message && (
                //  ||verifyAlert
                <Modal
                    centered
                    title="Message"
                    onClose={() => {
                        setAlert(false);
                        setVerifyAlert(false);
                    }}
                    activeModal={verifyAlert ? verifyAlert : alert}
                >
                    <div className="flex flex-col items-center justify-center space-y-4 p-5">
                        {(message == 'LoggedIn successfully' &&
                            signIn?.user?.emailVerifiedAt) ||
                        verifyAlert ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-20 h-20 text-success-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        ) : (
                            message && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-20 h-20 text-warning-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            )
                        )}

                        <p className={`font-bold text-center`}>
                            {message == 'User not found.'
                                ? 'User is not exsit , please provide a valid email.'
                                : message}
                        </p>
                        {message ==
                            'Your email is not verified yet. Please verify your email to activate your account.' && (
                            <button
                                onClick={handleSendEmail}
                                className="btn btn-dark block  text-center"
                            >
                                Send Verification Email
                            </button>
                        )}
                    </div>
                </Modal>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                <Textinput
                    name="email"
                    label="email"
                    // defaultValue="dashcode@gmail.com"
                    type="email"
                    register={register}
                    error={errors?.email}
                />
                <Textinput
                    name="password"
                    label="passwrod"
                    type="password"
                    // defaultValue="dashcode"
                    register={register}
                    error={errors.password}
                />
                <div className="flex justify-between">
                    <Checkbox
                        label={'Keep Me Signed In'}
                        value={checked}
                        onChange={() => setChecked(!checked)}
                    />

                    <Link
                        href="/auth/forgot-password"
                        className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
                    >
                        Forgot Password?{' '}
                    </Link>
                </div>

                <button className="btn btn-dark block w-full text-center">
                    Sign in
                </button>
            </form>

            <div className=" text-center my-5 ">Or continue with</div>

            <form action={`${base_url}/auth/redirect/google/`} method="get">
                <button
                    type="submit"
                    className="border border-1 rounded px-4 py-3 font-bold rounded w-full  cursor-pointer mt-4 space-x-2 flex items-center justify-center bg-white "
                >
                    <img src={googleLogo.src} alt="" />{' '}
                    <span className="font-bold">Start with Google</span>
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
