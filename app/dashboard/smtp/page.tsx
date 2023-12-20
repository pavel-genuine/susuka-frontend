"use client";
import React from 'react'
import Textinput from "@/components/ui/Textinput";
import Select from "@/components/ui/Select";
import Card from '@/components/ui/Card';

function SMTP() {
    return (
      <div className='md:w-[40%]'>
        <Card title='SMTP Settings'>
        <div className="space-y-4 ">
            <Textinput
                onChange={() => { }}
                defaultValue={''}
                label="SMTP Host"
                type="text"
            />
            <Textinput
                onChange={() => { }}
                defaultValue={''}
                label="SMTP Port"
                type="text"
            />
            <Textinput
                onChange={() => { }}
                defaultValue={''}
                label="SMTP Username"
                type="text"
            />
            <Textinput
                onChange={() => { }}
                defaultValue={''}
                label="SMTP Password"

                type="text"
            />
            <Textinput
                onChange={() => { }}
                defaultValue={''}
                label="Sender Email Address"

                type="email"
            />
            <Textinput
                onChange={() => { }}
                defaultValue={''}
                label="Sender Name"

                type="text"
            />

            <div className="">
                <p className="font-semibold text-sm md:text-md mb-5 ">
                    SMTP Encryption
                </p>
                <Select
                    icon=""
                    className=""
                    options={[{
                        value: 1,
                        label: 'SSL',
                    },
                    {
                        value: 2,
                        label: 'TSL',
                    }]
                    }
                    onChange={() => { }}
                ></Select>
            </div>
        </div>
        </Card>
      </div>
    )
}

export default SMTP