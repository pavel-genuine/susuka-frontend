"use client";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Switch from "@/components/ui/Switch";
import React, { useState } from "react";
// import Select from "react-select";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import InputGroup from "@/components/ui/InputGroup";
import TAccordion from "@/components/ui/TemplateAccordian";
import { Icon } from "@iconify/react";
import AI_MODELS from "@/interfaces/AI_MODELS";
import Select from "@/components/ui/Select";
import { promptSlug } from "@/constant/promtp-slug";
import { base_url } from "@/api/api";


const icons = [
  {
    name: "heroicons:pencil-square-solid",
  },
  {
    name: "heroicons:queue-list",
  },
  {
    name: "heroicons:clipboard-document-list-20-solid",
  },
];

const introStyles = [
  { value: "question", label: "Start With A Question" },
  { value: "inspiring", label: "Inspiring Intoduction" },
  { value: "punchy", label: "Punchy Introduction" },
];

const Languages = [
  { value: "English (USA)", label: "English (USA)" },
  { value: "English (UK)", label: "English (UK)" },
  { value: "Francais", label: "Francais" },
  { value: "Italiano", label: "Italiano" },
];
const Creativity = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];
const Tones = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];
const MaxLength = [
  { value: "200", label: "200" },
  { value: "300", label: "300" },
  { value: "400", label: "400" },
  { value: "500", label: "500" },
  { value: "600", label: "600" },
];
const Number = [
  { value: "1", label: "01" },
  { value: "2", label: "02" },
  { value: "3", label: "03" },
  { value: "4", label: "04" },
  { value: "5", label: "05" },
  { value: "6", label: "06" },
];

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "13px",
  }),
};


export default function Temple() {

  const [checked5, setChecked5] = useState(true);
  const [data, setData] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [toneOfVoice, setToneOfVoice] = useState("");
  const [lan, setLan] = useState("");
  const [token, setToken] = useState(0);
  const [keyPoints, setKeyPoints] = useState('');
  const [introType,setIntroType]=useState('question')
  
console.log(keyPoints,'kp');


  const handleClick = async () => {
    const response = await fetch(`${base_url}/openaiApi`, {
      method: "POST",
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        slug: promptSlug.blog_intro,
        max_token: 800,
        userDescription: prompt,
        keyPoints:keyPoints,
        chat: true,
        modelName: AI_MODELS.GPT35_TURBO,
        language: lan? lan :"English(USA)",
        toneOfVoice: toneOfVoice,
        introStyle:introType
      }),
    });

    // eslint-disable-next-line no-undef
    let decoder = new TextDecoderStream();
    const reader = response.body.pipeThrough(decoder).getReader();

    while (true) {
      const { value, done } = await reader.read();

      if (value) {
        let x = value.split("data: ");

        console.log(x[1]?.replace("\n\n", ""));
        setData((prev): any => {
          return prev + x[1]?.replace("\n\n", "");
        });
      }

      if (done) {
        break;
      }
    }
  };

  return (
    <div className="">
      <div className="grid lg:grid-cols-12 md:grid-cols-3  grid-cols-1 gap-4">
        <Card className="bg-white shadow-lg lg:col-span-5 md:col-span-1 rounded-[10px]">
          <div className="text-black dark:text-white flex items-center space-x-2">
            <div className="">
              <img
                className="h-10 w-10"
                src="https://png.pngtree.com/png-clipart/20180626/ourmid/pngtree-instagram-icon-instagram-logo-png-image_3584852.png"
                alt=""
              />
            </div>
            <p className="text-xl font-bold">Blog Intro</p>
          </div>
          {/* <div className=" w-full h-px bg-slate-500 mt-4"></div> */}
          <div className=" py-4">
            <p className=" text-sm text-slate-600 dark:text-slate-300">
              Nobody wants to read boring introduction, generate catchy blog
              introduction with this tool.
            </p>
          </div>

          {/* article form */}
          <form>
            <div className="">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor=" hh"
                    className="form-label text-black font-semibold"
                  >
                    Select Intro Style
                  </label>
                  <select 

                 onChange={(e)=>{setIntroType(e.target.value)
                 }}

                   className="h-[42px] text-black/70 bg-white px-3 py-2 transition-all cursor-pointer border hover:border-success-50  border-gray-200 rounded-lg outline-success-50 w-full appearance-none invalid:text-black/30 ">
                    {introStyles?.map((intro) => (
                      <option  key={intro.value} value={intro.value}  className="hover:bg-success-50">
                        {intro.label}
                        
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor=" hh"
                    className="form-label text-black font-semibold"
                  >
                    Language
                  </label>
                  <select onChange={(e)=>setLan(e.target.value)} className="h-[42px] text-black/70 bg-white px-3 py-2 transition-all cursor-pointer border hover:border-success-50  border-gray-200 rounded-lg outline-success-50 w-full appearance-none invalid:text-black/30 ">
                    {Languages?.map((lan) => (
                      <option className="hover:bg-success-50">
                        {lan.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor=" hh"
                    className="form-label text-black font-semibold"
                  >
                    What is your blog post about?
                  </label>
                  <Textarea
                    id="smallsize2"
                    className=" h-[83px] rounded-[10px] border-gray-200 focus:border-success-50 focus:ring-0"
                    type="text"
                    placeholder="Describe your blog post"
                    rows="2"
                    label={undefined}
                    register={undefined}
                    name={undefined}
                    readonly={undefined}
                    error={undefined}
                    icon={undefined}
                    disabled={undefined}
                    horizontal={undefined}
                    validate={undefined}
                    msgTooltip={undefined}
                    description={undefined}
                    cols={undefined}
                    // dvalue={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor=" hh"
                    className="form-label text-black font-semibold"
                  >
                    Mention The Key Points You Want To Include
                  </label>
                  <Textinput onChange={(e)=>setKeyPoints(e.target.value)}
                    // name={" "}
                    // register={register}
                    className="rounded-[10px] border-gray-200 focus:border-success-50 focus:ring-0"
                    type="text"
                    horizontal
                  />
                </div>

                <div>
                  <label
                    htmlFor=" hh"
                    className="form-label text-black font-semibold"
                  >
                    Creativity
                  </label>
                  <select className="h-[42px] text-black/70 bg-white px-3 py-2 transition-all cursor-pointer border hover:border-success-50  border-gray-200 rounded-lg outline-success-50 w-full appearance-none invalid:text-black/30 ">
                    {Creativity?.map((creative) => (
                      <option className="hover:bg-success-50">
                        {creative.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor=" hh"
                    className="form-label text-black font-semibold"
                  >
                    Tone Of Voice
                  </label>
                  <select onChange={(e)=>setToneOfVoice(e.target.value)} className="h-[42px] text-black/70 bg-white px-3 py-2 transition-all cursor-pointer border hover:border-success-50  border-gray-200 rounded-lg outline-success-50 w-full appearance-none invalid:text-black/30 ">
                    {Tones?.map((tone) => (
                      <option className="hover:bg-success-50">
                        {tone.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor=" hh"
                    className="form-label text-black font-semibold"
                  >
                    Number of result
                  </label>
                  <select className="h-[42px] text-black/70 bg-white px-3 py-2 transition-all cursor-pointer border hover:border-success-50  border-gray-200 rounded-lg outline-success-50 w-full appearance-none invalid:text-black/30 ">
                    {Number?.map((result) => (
                      <option className="hover:bg-success-50">
                        {result.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-center items-center mt-5">
                  <div
                    onClick={handleClick}
                    // icon="mdi:thunder-circle"
                    // iconClass="text-[30px]"
                    // text="Generate"
                    className="btn-success rounded-[4px] cursor-pointer w-full bg-success-50 block-btn flex justify-center items-center  font-semibold text-[20px] text-base  h-[48px] "
                  >
                    {" "}
                    <Icon
                      icon="mdi:thunder-circle"
                      color="white"
                      width={"30px"}
                      // height={"20px"}
                    ></Icon>
                    <p className="ml-[5px]">Generate</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Card>

        <div className="lg:col-span-7 md:col-span-2">
          <Card className="bg-white shadow-md rounded-[10px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <p className="text-xl">Title here</p>
                <p className="text-lg cursor-pointer">
                  <Icon
                    icon="heroicons:pencil-square-solid"
                    className={undefined}
                    width={undefined}
                    rotate={undefined}
                    hFlip={undefined}
                    vFlip={undefined}
                  ></Icon>
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-success-50 rounded-md text-white cursor-pointer p-2">
                  <Icon
                    icon="tabler:download"
                    className={undefined}
                    width={undefined}
                    rotate={undefined}
                    hFlip={undefined}
                    vFlip={undefined}
                  ></Icon>
                </div>
                <div className="bg-success-50 rounded-md text-white cursor-pointer p-2">
                  <Icon
                    icon="basil:save-outline"
                    className={undefined}
                    width={undefined}
                    rotate={undefined}
                    hFlip={undefined}
                    vFlip={undefined}
                  ></Icon>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white shadow-md mt-4 rounded-[10px]">
            <div>
              <div className="">
                <textarea
                  // className="rounded-[10px] border-gray-200 focus:border-success-50 focus:ring-0"
                  className="h-[250px] rounded-[10px] p-3 border border-gray-200 focus:outline-success-50 focus:ring-0  bg-[#C6DDCD] bg-opacity-10 w-full"
                  // value={d ? `${d}` : ""}
                  value={data.length > 0 ? `${data}` : ""}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="">
                <p className="">Variation:1 | 150 words</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="border-[.1px]  border-success-50 hover:bg-success-50 text-xl rounded-md text-success-50 hover:text-white cursor-pointer p-2">
                  <Icon
                    icon="uil:copy"
                    className={undefined}
                    width={undefined}
                    rotate={undefined}
                    hFlip={undefined}
                    vFlip={undefined}
                  ></Icon>
                </div>
                {/* <div className="border border-bg-success-50 text-sm font-bold hover:bg-success-50 rounded-md text-success-50 hover:text-white cursor-pointer p-2">
                  Regenerate
                </div> */}
              </div>
            </div>
          </Card>

          <div className="flex justify-center items-center mt-5">
            <div
              // onClick={handleClick}
              // icon="mdi:thunder-circle"
              // iconClass="text-[30px]"
              // text="Generate"
              className="btn-success  rounded-[4px] cursor-pointer w-[189px] bg-success-50 block-btn flex justify-center items-center  font-semibold text-[20px] text-base  h-[48px] "
            >
              {" "}
              <Icon
                icon="mdi:thunder-circle"
                color="white"
                width={"30px"}
                // height={"20px"}
              ></Icon>
              <p className="ml-[5px]">Generate More</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
