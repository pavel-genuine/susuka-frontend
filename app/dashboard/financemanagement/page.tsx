"use client";
import React from "react";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function Finance() {
  return (
    <div className="md:w-[40%]">
      <Card title="SSLCommerz Settings">
        <div className="space-y-4 ">
          <FormControlLabel
            control={<Switch />}
            label="Enable SSLCommerz Payment"
          />
          <div>
            <FormControlLabel control={<Switch />} label="Enable Testmode" />
            <p className="text-sm text-[grey]">
              Use Sandbox (testmode) API for development purpose. Dont't forget
              to uncheck before going live
            </p>
          </div>
          <FormControlLabel
            control={<Switch />}
            label="Enable Hosted Checkout"
          />

          <Textinput
            onChange={() => {}}
            defaultValue={""}
            label="Title To Show"
            horizontal
            type="text"
          />
          <Textarea
            onChange={() => {}}
            defaultValue={""}
            label="Description To Show"
            horizontal
            type="text"
          />
          <Textinput
            onChange={() => {}}
            defaultValue={""}
            label="Store ID"
            horizontal
            type="text"
          />
          <Textinput
            onChange={() => {}}
            defaultValue={""}
            label="Store Password"
            horizontal
            type="password"
          />
        </div>
      </Card>
    </div>
  );
}

export default Finance;
