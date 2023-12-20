import { Icon } from "@iconify/react";
import { useState } from "react";

const TAccordion = ({ items, className = "space-y-5" }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const [open, setOpen] = useState(false);

  const toggleAccrodian = (index) => {
    setActiveIndex(index);
    setOpen(!open);
  };

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div className="accordion  rounded-md" key={index}>
          <div
            className={`flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4 ${
              activeIndex === index
                ? "bg-slate-50 dark:bg-slate-700 dark:bg-opacity-60 rounded-t-md "
                : "bg-white dark:bg-slate-700  rounded-md"
            }`}
            onClick={() => toggleAccrodian(index)}
          >
            <span className="flex items-center space-x-2">
              <span>
                <img
                  className="h-6 w-6"
                  src="https://www.pngitem.com/pimgs/m/22-227227_transparent-email-clipart-email-icon-transparent-background-hd.png"
                  alt=""
                />
              </span>
              <span>{item.title}</span>{" "}
            </span>

            {activeIndex === index ? (
              <span
                className={`text-slate-900 dark:text-white text-[22px] transition-all duration-300 h-5`}
              >
                <Icon icon="ic:baseline-minus" />
              </span>
            ) : (
              <span
                className={`text-slate-900 dark:text-white text-[22px] transition-all duration-300 h-5`}
              >
                <Icon icon="ic:baseline-plus" />
              </span>
            )}
          </div>

          {activeIndex === index && (
            <div
              className={`${
                index === activeIndex
                  ? "dark:border dark:border-slate-700 dark:border-t-0"
                  : "l"
              } text-sm text-slate-600 font-normal bg-white dark:bg-slate-900 dark:text-slate-300 rounded-b-md`}
            >
              <div
                className="px-8 py-4"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default TAccordion;
