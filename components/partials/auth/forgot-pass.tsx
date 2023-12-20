import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@mui/material";
import { forgotPassword } from "@/api/api";
import Alert from "@/components/ui/Alert";
import Modal from "@/components/ui/Modal";
import Loading from "@/components/Loading";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
  })
  .required();

const ForgotPass = () => {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data, "email");
    setAlert(true);
    const { data: res } = await forgotPassword(data);
    console.log(res, "res");
 
    setMessage(res?.message);

    setTimeout(() => {
      setAlert(false)
    }, 6000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
 

      <Modal
        centered
        title="Message"
        onClose={() => setAlert(false)}
        activeModal={alert}
      >
        <div className="flex flex-col items-center justify-center space-y-5 p-5">
          {message == "Email sent successfully" ? (
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
          )  : message?(
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
          ):
          <div className="flex flex-col items-center justify-center w-[100px] h-[100px] overflow-hidden">
            <Loading></Loading>
          </div>
          }

          <p className={`font-bold text-center`}>
            {message == "Email sent successfully"
              ? "Reset password email sent, please check your email."
              : message == "User not found"
              ? "User is not exsit , please provide a valid email."
              : message}
          </p>
        </div>
      </Modal>

      <Textinput
        name="email"
        label="email"
        // defaultValue="dashcode@gmail.com"
        type="email"
        register={register}
        error={errors?.email}
      />
      <button className="btn btn-dark block w-full text-center">
        Send recovery email
      </button>
    </form>
  );
};

export default ForgotPass;
