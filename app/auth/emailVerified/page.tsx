"use client";
import { verifyEmail } from "@/api/api";
import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import checkmarkGif from '@/assets/checkmark.gif'
import checkmarkImg from '@/assets/tickmark.png'

const EmailVerification = () => {
  const [staticTick, setStatickTick] = useState(false);

  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerfied] = useState(false);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("");
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleRedirect = () => {
    if (userType == "user") {
      setCookie("user", "true");

      setTimeout(() => {
        router.push("/");
      }, 4000);
    }

    if (userType == "admin") {
      setCookie("admin", "true");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  };

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const paramsToken = queryParameters.get("token");
    const paramsEmail = queryParameters.get("email");

    console.log(paramsEmail);
    console.log(paramsToken);
    

    verifyEmail({ email: paramsEmail, token: paramsToken }).then(
      (res) => {
        console.log(res, "res");
        setUserType(res?.data?.user?.userType);
        setMessage(res?.data?.message);
      }
    );

    handleRedirect();

    setTimeout(() => {
      setStatickTick(true);
    }, 1000);
  }, [userType]);

  return (
    <div className="flex  flex-col justify-center items-center h-[100vh] w-[100vw] bg-[white] ">
      {message ? (
        <div className="flex flex-col justify-center items-center  p-10 rounded mb-40 md:w-[35vw] w-[70vw]">
          {message ==
          "Congratulation ! Email verified & LoggedIn successfully" ? (
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
          <h3 className="mt-5 mb-2 text-xl font-bold">{message}</h3>
          {message ==
            "Congratulation ! Email verified & LoggedIn successfully" && (
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

export default EmailVerification;
