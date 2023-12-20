import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { AppDispatch } from "@/store";
import { fetchOwnProfile } from "@/redux/features/user/ownProfileSlice";
import { changePassword, getOwnProfileInfo } from "@/api/api";
import Alert from "@/components/ui/Alert";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const schema = yup
  .object({
    password: yup.string().required("Password is Required"),
    passwordConfirm: yup.string().required("Password is Required"),
  })
  .required();

const ChangePass = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [passDismatch, setPassDismatch] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    console.log(email, token);

    if (data.password == data.passwordConfirm) {
      setPassDismatch(false);
      setAlert(true);
      const { data: res } = await changePassword({
        email,
        token,
        password: data.password,
      });

     
      console.log(res, "res");
      setMessage(res?.message);

      setTimeout(() => {
        setAlert(false);
        
        res?.message == "Password reset successfully." &&  router.push("/auth");
        
      }, 6000);
    } else {
      setPassDismatch(true);
    }
  };

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const paramsToken = queryParameters.get("token");
    const paramsEmail = queryParameters.get("email");

    setToken(paramsToken);
    setEmail(paramsEmail);
  }, []);

  console.log(token, "tokn");
  console.log(email, "eml");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Modal
        centered
        title="Message"
        onClose={() => setAlert(false)}
        activeModal={alert}
      >
        <div className="flex flex-col items-center justify-center space-y-5 p-5">
          {message == "Password reset successfully." ? (
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
          ) : message?(
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

          <p className={`font-bold text-center`}>{message}</p>
        </div>
      </Modal>

      <Textinput
        name="password"
        label="New Passwrod"
        type="password"
        placeholder=" "
        register={register}
        error={errors.password}
      />
      <Textinput
        name="passwordConfirm"
        label="Confirm New Passwrod"
        type="password"
        placeholder=" "
        register={register}
        error={errors.passwordConfirm}
      />

      <p className="text-[red] text-sm my-2">
        {passDismatch && "Passwords did not match."}
      </p>

      <button className="btn btn-dark block w-full text-center my-2">
        Change My Password
      </button>
    </form>
  );
};

export default ChangePass;
