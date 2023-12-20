'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/partials/header';
import Sidebar from '@/components/partials/sidebar';
import Settings from '@/components/partials/settings';
import useWidth from '@/hooks/useWidth';
import useSidebar from '@/hooks/useSidebar';
import useContentWidth from '@/hooks/useContentWidth';
import useMenulayout from '@/hooks/useMenulayout';
import useMenuHidden from '@/hooks/useMenuHidden';
import Footer from '@/components/partials/footer';
// import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MobileMenu from '@/components/partials/sidebar/MobileMenu';
import useMobileMenu from '@/hooks/useMobileMenu';
import MobileFooter from '@/components/partials/footer/MobileFooter';
import useRtl from '@/hooks/useRtl';
import useDarkMode from '@/hooks/useDarkMode';
import useSkin from '@/hooks/useSkin';
import Loading from '@/components/Loading';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import useNavbarType from '@/hooks/useNavbarType';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { fetchOwnProfile } from '@/redux/features/user/ownProfileSlice';

export default function RootLayout({ children }) {
    const { width, breakpoints } = useWidth();
    const [collapsed] = useSidebar();
    const [isRtl] = useRtl();
    const [isDark] = useDarkMode();
    const [skin] = useSkin();
    const [navbarType] = useNavbarType();

    const router = useRouter();
    // const { isAuth } = useSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        
        dispatch(fetchOwnProfile());
        // if (!isAuth) {
        //   router.push("/");
        // }
    }, []);
    const location = usePathname();
    // header switch class
    const switchHeaderClass = () => {
        if (menuType === 'horizontal' || menuHidden) {
            return 'ltr:ml-0 rtl:mr-0';
        } else if (collapsed) {
            return 'ltr:ml-[72px] rtl:mr-[72px]';
        } else {
            return 'ltr:ml-[248px] rtl:mr-[248px]';
        }
    };

    // content width
    const [contentWidth] = useContentWidth();
    const [menuType] = useMenulayout();
    const [menuHidden] = useMenuHidden();
    // mobile menu
    const [mobileMenu, setMobileMenu] = useMobileMenu();

  return (
    <> 
    <div>
      {children}
    </div>
    </>
  );
}
