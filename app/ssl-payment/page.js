"use client";
import { verifyEmail } from "@/api/api";
import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import checkmarkGif from '@/assets/checkmark.gif'
import checkmarkImg from '@/assets/tickmark.png'

const SSLPayment = () => {
    const [staticTick, setStatickTick] = useState(false);

    const [email, setEmail] = useState("");
    const [emailVerified, setEmailVerfied] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const router = useRouter();

    const dispatch = useAppDispatch();

    const handleRedirect = () => {


        setTimeout(() => {
            router.push("/");
        }, 4000);

    };

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        const paramsStatus = queryParameters.get("status");


        console.log(paramsStatus);

        setStatus(paramsStatus)

        paramsStatus == 'paid' && setTimeout(() => {
            router.push("/");
        }, 4000);


        setTimeout(() => {
            setStatickTick(true);
        }, 1000);
    }, []);

    return (
        <div className="flex  flex-col justify-center items-center h-[100vh] w-[100%] bg-[white] ">
            {status ? (
                <div className="flex flex-col justify-center items-center  p-10 rounded mb-40 md:w-[35vw] w-[70vw]">
                    {status ==
                        "paid" ? (
                        <img
                            className="w-[5vw]"
                            src={
                                staticTick
                                    ? "https://i.ibb.co/34tx2cx/tickmark.png"
                                    : "https://i.ibb.co/7GQT62x/checkmark.gif"
                            }
                            alt=""
                        />
                    ) : (
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
                    )}
                    <h3 className="mt-5 mb-2 text-xl font-bold">Your Payment is {status}.</h3>
                    {(
                        <div className="flex flex-col justify-center items-center">
                            <p>Keep exploring Geniematic.</p>
                            <button
                                onClick={() => {
                                    handleRedirect();
                                }}
                                className="btn btn-dark text-center mt-5"
                            >
                                OK
                            </button>
                        </div>
                    )}


                </div>
            ) : (
                <Loading></Loading>
            )}
        </div>
    );
};

export default SSLPayment;
