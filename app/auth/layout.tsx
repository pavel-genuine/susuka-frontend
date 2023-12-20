'use client';

import useRtl from '@/hooks/useRtl';
import useDarkMode from '@/hooks/useDarkMode';
import useSkin from '@/hooks/useSkin';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { fetchOwnProfile } from '@/redux/features/user/ownProfileSlice';

export default function AuthLayout({ children }) {
    const [isRtl] = useRtl();
    const [isDark] = useDarkMode();
    const [skin] = useSkin();
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector((state) => state?.ownProfile);
    useEffect(() => {
        dispatch(fetchOwnProfile()); //try to get own profile info first
    }, []);
    return (
        <>
            <div
                dir={isRtl ? 'rtl' : 'ltr'}
                className={`app-warp ${isDark ? 'dark' : 'light'} ${
                    skin === 'bordered' ? 'skin--bordered' : 'skin--default'
                }`}
            >
                {children}
            </div>
        </>
    );
}
