'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';

import { AppDispatch } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchAllPlans } from '@/redux/features/plan/allPlansSlice';
import Button from '@/components/ui/Button';
import { PLAN_TYPE } from '@/interfaces';
import Select from '@/components/ui/Select';
import Accordion from '@/components/ui/Accordion';
import Link from 'next/link';

const tables2 = [
    {
        title: 'Advanced',
        price_Yearly: '$96',
        price_Monthly: '$26',
        button: 'Buy now',
        bg: 'bg-white',
    },
    {
        title: 'Business',
        price_Yearly: '$196',
        price_Monthly: '$20',
        button: 'Buy now',
        bg: 'bg-slate-900',
        ribon: 'Most popular',
    },
    {
        title: 'Basic',
        price_Yearly: '$26',
        price_Monthly: '$16',
        button: 'Try it free',
        bg: 'bg-white',
    },
    {
        title: 'Got a large team?',
        price_Yearly: '$126',
        price_Monthly: '$16',
        button: 'Request a quote',
        bg: 'bg-white',
    },
];

const accordionItems = [
    {
        title: 'What is copy',
        content:
            'A copy refers to any published text or written material, this includes blog articles, websites, digital ads,...Copymatic AI helps you generate any type of copy with the click of a button.',
    },
    {
        title: 'What is copy',
        content:
            'A copy refers to any published text or written material, this includes blog articles, websites, digital ads,...Copymatic AI helps you generate any type of copy with the click of a button.',
    },
    {
        title: 'What is copy',
        content:
            'A copy refers to any published text or written material, this includes blog articles, websites, digital ads,...Copymatic AI helps you generate any type of copy with the click of a button.',
    },
];

const PricingPage = () => {
    const [check, setCheck] = useState(true);
    const toggle = () => {
        setCheck(!check);
    };
    const [billingMode, setBillingMode] = useState(PLAN_TYPE.MONTHLY);

    const dispatch: AppDispatch = useAppDispatch();
    const { plans } = useAppSelector((state) => state?.allPlans);

    useEffect(() => {
        dispatch(fetchAllPlans());
    }, []);
    console.log(plans,'plANS');

    return (
        <div>
            <div className="space-y-8">
                <Card>
                    <div className="space-y-8">
                        <div className="md:w-[50%] mx-auto space-y-5">
                            <h2 className="text-center text-4xl  ">
                                Pick the Plan that Support your Content Writing
                                Goals
                            </h2>
                            <p className="text-center text-[grey]">
                                Lorem ipsum dolor sit amet consectetur. Velit
                                aliquet pulvinar adipiscing velit mauris quam.
                            </p>
                        </div>

                        <div className="text-center flex p-1 rounded-lg bg-success-50 bg-opacity-10 justify-between items-center md:w-[540px] mx-auto">
                            <div
                                onClick={() =>
                                    setBillingMode(PLAN_TYPE.MONTHLY)
                                }
                                className={`${
                                    billingMode == PLAN_TYPE.MONTHLY
                                        ? 'text-[white] bg-success-50 rounded w-[50%]'
                                        : 'text-success-50 '
                                } p-2 w-[50%] cursor-pointer md:h-[60px]`}
                            >
                                <p className="text-center p-2">
                                    Monthly Billing
                                </p>
                            </div>
                            <div
                                onClick={() => setBillingMode(PLAN_TYPE.YEARLY)}
                                className={`${
                                    billingMode == PLAN_TYPE.YEARLY
                                        ? 'text-[white] bg-success-50 rounded  w-[50%]'
                                        : 'text-success-50 '
                                } p-2 w-[50%] cursor-pointer md:h-[60px]`}
                            >
                                <p>Yearly Billing</p>
                                <p className="text-sm">Save 20%</p>
                            </div>
                        </div>

                        <div className="flex items-center w-[200px] mx-auto">
                            <p className="font-semibold text-sm md:text-md mr-5 ">
                                Currency:
                            </p>
                            <Select
                                icon=""
                                className=""
                                options={[
                                    {
                                        label: 'BDT',
                                        value: 1,
                                    },
                                    {
                                        label: 'USD',
                                        value: 21,
                                    },
                                ]}
                            ></Select>
                        </div>
                    </div>
                </Card>

                <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 md:w-[80%] mx-auto">
                    {plans.map(
                        (item, i) =>
                            item?.name !== 'Custom' && (
                                <div className="">
                                    {billingMode == PLAN_TYPE.MONTHLY
                                        ? item?.type == PLAN_TYPE.MONTHLY && (
                                              <div
                                                  className={`
                          h-[500px]  bg-white
            price-table rounded-[6px] shadow-base dark:bg-slate-800 p-6 text-slate-900 dark:text-white relative overflow-hidden z-[1]
            `}
                                                  key={i}
                                              >
                                                  <div className="overlay absolute right-0 top-0 w-full h-full z-[-1]">
                                                      {/* <img src={item.bg} alt="" className="ml-auto block" /> */}
                                                  </div>

                                                  {item?.name == 'Basic' && (
                                                      <div className="text-sm font-medium  text-slate-900 dark:text-slate-300 py-2 text-center absolute ltr:-right-[33px] rtl:-left-[43px] top-4 px-10 transform ltr:rotate-[45deg] rtl:-rotate-45 bg-[orange]">
                                                          {'Popular'}
                                                      </div>
                                                  )}

                                                  <header className="mb-6">
                                                      <div className="border-b dark:border-slate-700 border-gray-200 pb-2 mb-2  ">
                                                          <h4
                                                              className={` text-center text-xl mb-5 `}
                                                          >
                                                              {item.name}
                                                          </h4>
                                                      </div>
                                                  </header>

                                                  <div>
                                                      <h4
                                                          className={` text-center text-xl mb-2 `}
                                                      >
                                                          ${item.price}/{' '}
                                                          <span className="text-lg text-[grey]">
                                                              mo
                                                          </span>
                                                      </h4>
                                                      <p className=" text-center text-[grey] mb-5">
                                                          {item?.wordCredit}{' '}
                                                          Words
                                                      </p>
                                                  </div>

                                                  <Link href={`/dashboard/utility/checkout/${item?.id}`}>
                                              <div className="price-body space-y-8">
                                                      <div>
                                                          <Button
                                                            //   onClick={onClick}
                                                              text={
                                                                  item?.name ==
                                                                  'Free Plan'
                                                                      ? 'Try it Free'
                                                                      : `Buy Now`
                                                              }
                                                              className={` w-full  bg-success-50  ${
                                                                  item?.name !=
                                                                  'Basic'
                                                                      ? 'bg-opacity-20  text-success-50'
                                                                      : 'text-[white]'
                                                              }`}
                                                          />
                                                      </div>
                                                  </div></Link>

                                                  <div className="space-y-1 mt-5">
                                                      <p className="text-sm text-[grey]">
                                                          Quick Overview
                                                      </p>
                                                      <div>
                                                          {item?.features?.map(
                                                              (i) => (
                                                                  <div className="space-y-2">
                                                                      <p className="text-sm font-semibold flex ">
                                                                          <svg
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              strokeWidth={
                                                                                  1.5
                                                                              }
                                                                              stroke="currentColor"
                                                                              className="w-6 h-6 text-success-50 mr-1"
                                                                          >
                                                                              <path
                                                                                  strokeLinecap="round"
                                                                                  strokeLinejoin="round"
                                                                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                              />
                                                                          </svg>
                                                                          {
                                                                              i?.name
                                                                          }
                                                                          .
                                                                      </p>
                                                                  </div>
                                                              )
                                                          )}
                                                      </div>
                                                  </div>
                                              </div>
                                          )
                                        : item?.type == PLAN_TYPE.YEARLY && (
                                              <div
                                                  className={`h-[500px] bg-white
            
            price-table rounded-[6px] shadow-base dark:bg-slate-800 p-6 text-slate-900 dark:text-white relative overflow-hidden z-[1]
            `}
                                                  key={i}
                                              >
                                                  <div className="overlay absolute right-0 top-0 w-full h-full z-[-1]">
                                                      {/* <img src={item.bg} alt="" className="ml-auto block" /> */}
                                                  </div>

                                                  {item?.name == 'Basic' && (
                                                      <div className="text-sm font-medium  text-slate-900 dark:text-slate-300 py-2 text-center absolute ltr:-right-[33px] rtl:-left-[43px] top-4 px-10 transform ltr:rotate-[45deg] rtl:-rotate-45 bg-[orange]">
                                                          {'Popular'}
                                                      </div>
                                                  )}

                                                  <header className="mb-6">
                                                      <div className="border-b dark:border-slate-700 border-gray-200 pb-2 mb-2  ">
                                                          <h4
                                                              className={` text-center text-xl mb-5 `}
                                                          >
                                                              {item.name}
                                                          </h4>
                                                      </div>
                                                  </header>

                                                  <div>
                                                      <h4
                                                          className={` text-center text-xl mb-2 `}
                                                      >
                                                          ${item.price}/{' '}
                                                          <span className="text-lg text-[grey]">
                                                              mo
                                                          </span>
                                                      </h4>
                                                      <p className=" text-center text-[grey] mb-5">
                                                          {item?.wordCredit}{' '}
                                                          Words
                                                      </p>
                                                  </div>

                                                  <div className="price-body space-y-8">
                                                      <div>
                                                          <Button
                                                              text={
                                                                  item?.name ==
                                                                  'Free Plan'
                                                                      ? 'Try it Free'
                                                                      : `Buy Now`
                                                              }
                                                              className={` w-full  bg-success-50  ${
                                                                  item?.name !=
                                                                  'Basic'
                                                                      ? 'bg-opacity-20  text-success-50'
                                                                      : 'text-[white]'
                                                              }`}
                                                          />
                                                      </div>
                                                  </div>

                                                  <div className="space-y-1 mt-5">
                                                      <p className="text-sm text-[grey]">
                                                          Quick Overview
                                                      </p>
                                                      <div>
                                                          {item?.features?.map(
                                                              (i) => (
                                                                  <div className="space-y-2">
                                                                      <p className="text-sm font-semibold flex ">
                                                                          <svg
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              strokeWidth={
                                                                                  1.5
                                                                              }
                                                                              stroke="currentColor"
                                                                              className="w-6 h-6 text-success-50 mr-1"
                                                                          >
                                                                              <path
                                                                                  strokeLinecap="round"
                                                                                  strokeLinejoin="round"
                                                                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                              />
                                                                          </svg>
                                                                          {
                                                                              i?.name
                                                                          }
                                                                          .
                                                                      </p>
                                                                  </div>
                                                              )
                                                          )}
                                                      </div>
                                                  </div>
                                              </div>
                                          )}
                                </div>
                            )
                    )}
                </div>

                <div className="md:w-[70%] mx-auto mt-24">
                    <h4 className="text-3xl mb-8 text-center ">
                        Frequently Asked Questions
                    </h4>
                    <Accordion items={accordionItems}></Accordion>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
