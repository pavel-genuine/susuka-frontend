import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
// import { Button, Checkbox } from "@mui/material";
import { fetchSignUp } from "../../../redux/features/auth/signUpSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { USER_TYPE } from "@/interfaces";
import { setCookie } from "cookies-next";
import Checkbox from "@/components/ui/Checkbox";
import Alert from "@/components/ui/Alert";
import { base_url, googleLogin } from "@/api/api";
import Modal from "@/components/ui/Modal";
import Loading from "@/components/Loading";
import googleLogo from '@/assets/google.svg'

const schema = yup
  .object({
    name: yup.string().required("Name is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .max(20, "Password shouldn't be more than 20 characters")
      .required("Please enter password"),
    // confirm password
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const RegForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const [checked, setChecked] = useState(false);

  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [emailProviderAler, setEmailProviderAler] = useState(false);

  const router = useRouter();

  const label = {
    inputProps: {
      "aria-label": "You accept our Terms and Conditions and Privacy Policy",
    },
  };

  const dispatch = useAppDispatch();
  const { signUp } = useAppSelector((state) => state.signUp);

  const onSubmit = async (data) => {
    const emailProvider = data?.email?.split("@")[1];

    const approvedEmailProviders = [
      "gmail.com",
      "hotmail.com",
      "live.com",
      "yahoo.com",
    ];

    const isApproved = approvedEmailProviders.includes(emailProvider);

    isApproved ? setEmailProviderAler(false) : setEmailProviderAler(true);

    console.log(data?.email?.split("@"), "sp");

    const submit = dispatch(fetchSignUp(data));

    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 6000);
  };

  useEffect(() => {
    emailProviderAler
      ? setMessage('Your email provider is not approved by our system, please use any of gmail.com , hotmail.com , live.com or yahoo.com.')
      : setMessage(signUp?.message);

    if (signUp?.user?.userType) {
      setTimeout(() => {
        router.push("/auth/verifyEmail");
      }, 1500);
    }
  }, [signUp, emailProviderAler]);

  console.log(signUp, "signup");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
        <Modal
          centered
          title="Message"
          onClose={() => setAlert(false)}
          activeModal={alert}
        >
          <div className="flex flex-col items-center justify-center space-y-5 p-5">
            {message == "User created successfully" ? (
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
            ) : message ? (
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
            ) : (
              <div className="flex flex-col items-center justify-center w-[100px] h-[100px] overflow-hidden">
                <Loading></Loading>
              </div>
            )}

            <p className={`font-bold text-center`}>{message}</p>
          </div>
        </Modal>
        <Textinput
          name="name"
          label="name"
          type="text"
          placeholder=" Enter your name"
          register={register}
          error={errors.name}
        />{" "}
        <Textinput
          name="email"
          label="email"
          type="email"
          placeholder=" Enter your email"
          register={register}
          error={errors.email}
        />
        <Textinput
          name="password"
          label="passwrod"
          type="password"
          placeholder=" Enter your password"
          register={register}
          error={errors.password}
        />
        <Checkbox
          label={"You accept our Terms and Conditions and Privacy Policy"}
          value={checked}
          onChange={() => setChecked(!checked)}
        />
        <button className="btn btn-dark block w-full text-center">
          Create an account
        </button>
      </form>

      <div className=" text-center my-5 ">Or continue with</div>

      <form action={`${base_url}/auth/redirect/google/`} method="get">
        <button
          type="submit"
          className="border border-1 rounded px-4 py-3 font-bold rounded w-full  cursor-pointer mt-4 space-x-2 flex items-center justify-center bg-white "
        >
          <img
 src={googleLogo.src}            alt=""
          />{" "}
          <span className="font-bold">Start with Google</span>
        </button>
      </form>
    </div>
  );
};

export default RegForm;
