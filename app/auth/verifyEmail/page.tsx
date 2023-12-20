"use client";
import { useAppSelector } from '@/hooks/reduxHooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import checkmarkGif from '@/assets/checkmark.gif'
import checkmarkImg from '@/assets/tickmark.png'

const EmailVerification = () => {
    const [staticTick,setStatickTick]=useState(false)
    const router = useRouter();
    const {profile} = useAppSelector((state) => state.ownProfile);

    useEffect(()=>{
    
        setTimeout(() => {
            setStatickTick(true)
        }, 1000);

        if (profile?.emailVerifiedAt ) {
            setTimeout(() => {
              router.push("/auth/emailVerified");
            }, 1500);
          }
      

    },[profile])

    console.log(profile,'pro');
    

  return (
    <div className='flex flex-col justify-center items-center h-[100vh] w-[100vw] bg-[white] '>
      <div className='text-center flex flex-col justify-center items-center  p-10 rounded mb-40 md:w-[30vw] w-[70vw]'>
      <img className='w-[5vw]' src={staticTick?'https://i.ibb.co/34tx2cx/tickmark.png':'https://i.ibb.co/7GQT62x/checkmark.gif'} alt=""  /> 
        <h3 className='mt-5 mb-2 text-xl font-bold'>Verify your account.</h3>
        <p >Thanks for joining Geniematic. We just sent a verification link to your email. Click on it to start generating awesome content.</p>
        <button onClick={()=>{router.push("/");}}  className="btn btn-dark text-center mt-5">
        OK
      </button>
      </div>
    </div>
    
  )
}

export default EmailVerification