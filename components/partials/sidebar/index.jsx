import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";
import { menuItems, menuItemsUser } from "@/constant/data";
import SimpleBar from "simplebar-react";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current.addEventListener("scroll", handleScroll);
  }, [scrollableNodeRef]);

  const [collapsed, setMenuCollapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState(false);

  // semi dark option
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();
  return (
    <div className={isSemiDark ? "dark" : ""}>
      <div
        className={`sidebar-wrapper bg-white dark:bg-slate-800     ${
          collapsed ? "w-[72px] close_sidebar" : "w-[248px]"
        }
      ${menuHover ? "sidebar-hovered" : ""}
      ${
        skin === "bordered"
          ? "border-r border-slate-200 dark:border-slate-700"
          : "shadow-base"
      }
      `}
        onMouseEnter={() => {
          setMenuHover(true);
        }}
        onMouseLeave={() => {
          setMenuHover(false);
        }}
      >

        <SidebarLogo menuHover={menuHover} />
        
        <div
          className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${
            scroll ? " opacity-100" : " opacity-0"
          }`}
        ></div>

        <SimpleBar
          className="sidebar-menu px-4 h-[calc(100%-80px)] relative"
          scrollableNodeProps={{ ref: scrollableNodeRef }}
        >
          <Navmenu menus={menuItems} menuUser={menuItemsUser}/>
          {!collapsed && (
            <div className="absolute bottom-[20px]">
             

              <div className="rounded border border-1 mt-[60%]">
                <div className=" m-2 flex  rounded-[4px]  items-center h-[42px]   p-[10px]">
                  <Icon
                    icon="solar:crown-bold"
                    className=" "
                    width={"22px"}
                    color="#FF6849"
                    rotate={undefined}
                    hFlip={undefined}
                    vFlip={undefined}
                  />
                  <p className="md:text-[16px]  font-semibold  ml-[10px]">
                    Free Plan
                  </p>
                </div>

                <p className="mt-1 mb-4 mx-4">Words: 10,000</p>

                <div className=" cursor-pointer m-2 flex bg-gradient-to-r from-[#FF6849] to-[#FF9400] rounded-[4px]  items-center h-[42px]   p-[10px]">
                  <Icon
                    icon="material-symbols-light:diamond-outline" 
                    className=" "
                    width={"22px"}
                    color="white"
                    rotate={undefined}
                    hFlip={undefined}
                    vFlip={undefined}
                  />
                  <p className="md:text-[12px]  font-semibold text-white ml-[10px]">
                    GENIEMATIC PREMIUM
                  </p>
                </div>
              </div>
            </div>
          )}
        </SimpleBar>
      </div>
    </div>
  );
};

export default Sidebar;
