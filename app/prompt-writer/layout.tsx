"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Header from "@/components/partials/header";
import Sidebar from "@/components/partials/sidebar";
import Settings from "@/components/partials/settings";
import useWidth from "@/hooks/useWidth";
import useSidebar from "@/hooks/useSidebar";
import useContentWidth from "@/hooks/useContentWidth";
import useMenulayout from "@/hooks/useMenulayout";
import useMenuHidden from "@/hooks/useMenuHidden";
import Footer from "@/components/partials/footer";
// import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MobileMenu from "@/components/partials/sidebar/MobileMenu";
import useMobileMenu from "@/hooks/useMobileMenu";
import MobileFooter from "@/components/partials/footer/MobileFooter";
import useRtl from "@/hooks/useRtl";
import useDarkMode from "@/hooks/useDarkMode";
import useSkin from "@/hooks/useSkin";
import Loading from "@/components/Loading";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import useNavbarType from "@/hooks/useNavbarType";
import { motion, AnimatePresence } from "framer-motion";
import TAccordion from "@/components/ui/TemplateAccordian";
import Card from "@/components/ui/Card";
import { Icon } from "@iconify/react";
import InputGroup from "@/components/ui/InputGroup";

export default function RootLayout({ children }) {
  const { width, breakpoints } = useWidth();
  const [collapsed] = useSidebar();
  const [isRtl] = useRtl();
  const [isDark] = useDarkMode();
  const [skin] = useSkin();
  const [navbarType] = useNavbarType();

  const router = useRouter();
  // const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    // if (!isAuth) {
    //   router.push("/");
    // }
  }, []);
  const location = usePathname();
  // header switch class
  const switchHeaderClass = () => {
    if (menuType === "horizontal" || menuHidden) {
      return "ltr:ml-0 rtl:mr-0";
    } else if (collapsed) {
      return "ltr:ml-[72px] rtl:mr-[72px]";
    } else {
      return "ltr:ml-[248px] rtl:mr-[248px]";
    }
  };

  // content width
  const [contentWidth] = useContentWidth();
  const [menuType] = useMenulayout();
  const [menuHidden] = useMenuHidden();
  // mobile menu
  const [mobileMenu, setMobileMenu] = useMobileMenu();

  const items = [
    {
      title: "Digital Ads",
      content: "Jornalists call this critical, ",
    },
    {
      title: "Email Tools",
      content: "Jornalists call this critical, introductory section the.",
    },
    {
      title: "Startup Tools",
      content: "Jornalists call this critical, introductory.",
    },
    {
      title: "Personal Copy",
      content: "Jornalists call this critical, introductory.",
    },
    {
      title: "Blog Tools",
      content: "Jornalists call this critical, introductory.",
    },
  ];

  return (
    <div className="grid lg:grid-cols-12 md:grid-cols-3  grid-cols-1 gap-4">

      <Card className="bg-white shadow-lg lg:col-span-3 md:col-span-1 rounded-[10px]">
        <div className="text-black dark:text-white flex items-center space-x-2">
          <div className=" h-[33px] bg-[#fe903c] w-[33px] rounded-lg flex justify-center items-center">
            <Icon
              color="white"
              width={"20px"}
              height={"20px"}
              icon="et:documents"
            />
          </div>
          <p className="text-xl font-bold">Choose Template</p>
        </div>
        {/* <div className=" w-full h-px bg-slate-500 mt-4"></div> */}

        <div className="mt-4">
          <InputGroup
            className="w-full outline-none focus:border focus:border-[grey]  py-3"
            placeholder="Search"
            prepend={
              <Icon
                icon="heroicons-outline:search"
                className="outline-none focus:border focus:border-[grey] "
                width={undefined}
                rotate={undefined}
                hFlip={undefined}
                vFlip={undefined}
              />
            }
            type="text"
            label={undefined}
            register={undefined}
            name={undefined}
            readonly={undefined}
            value={undefined}
            error={undefined}
            icon={undefined}
            disabled={undefined}
            id={undefined}
            horizontal={undefined}
            validate={undefined}
            isMask={undefined}
            msgTooltip={undefined}
            description={undefined}
            hasicon={undefined}
            onChange={undefined}
            merged={undefined}
            append={undefined}
            options={undefined}
            onFocus={undefined}
          />
        </div>

        <div className="mt-3">
          <TAccordion items={items} />
        </div>
      </Card>
      <div className="lg:col-span-9 md:col-span-2">
        {children}
      </div>
    </div>
  );
}
