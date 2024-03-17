"use client";

import { auth, db } from "@/app/firebase/config";
import { Loading } from "@/components";
import { RootState } from "@/store";
import { setLoading } from "@/store/slice/pageSlice";
import { setKeywords, setUser, setWatchList } from "@/store/slice/userSlice";
import { setCollapse, setScrollY } from "@/store/slice/windowSlice";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

type Props = any;

const withHOC = (Component: React.ComponentType<Props>) => {
    const WithHOC = (props: Props) => {
        const dispatch = useDispatch();
        const router = useRouter();
        const pathname = usePathname();
        const { collapse } = useSelector((state: RootState) => state.window);
        const { loading } = useSelector((state: RootState) => state.page);

        // Event listener callbacks
        const handleScrollChange = () => {
            dispatch(setScrollY(window.scrollY));
        };

        const handleWindowResize = () => {
            if (window.innerWidth < 768) {
                dispatch(setCollapse(false));
            }
        };

        // Add event listeners on component mount
        useEffect(() => {
            window.addEventListener("scroll", handleScrollChange);
            window.addEventListener('resize', handleWindowResize);

            // Cleanup on component unmount
            return () => {
                window.removeEventListener("scroll", handleScrollChange);
                window.removeEventListener('resize', handleWindowResize);
            };
        }, []);

        useEffect(() => {
            if(window.innerWidth < 768) {// if browser screen size less than 768 width hide the sidebar filter
                dispatch(setCollapse(false));
            }
        }, [])

        useEffect(() => {
            if(collapse && window.innerWidth < 768) { 
                document.body.classList.add("overflow-y-hidden"); 
            }
            else { 
                document.body.classList.remove("overflow-y-hidden"); 
            }
        }, [collapse])

        const getUserProfile = async (uid: string) => {
            const userProfilesQuery = query(collection(db, "user_profiles"), where("uid", "==", uid), limit(1));
            const userProfilesSnapshot = await getDocs(userProfilesQuery);
            return !userProfilesSnapshot.empty ? userProfilesSnapshot.docs[0].data() : null;
        };

        const dispatchUserData = (user: any, userProfiles: any) => {
            dispatch(setUser({
                uid: user.uid,
                username: userProfiles.username,
                email: user.email,
            }));
            dispatch(setWatchList(userProfiles.movies_ids));
            dispatch(setKeywords(userProfiles.keywords));
        };

        useEffect(() => {
            const handleAuthStateChanged = async (user: any) => {
                if (pathname.includes("/auth/profile")) {
                    if (user) {
                        const user_profiles = await getUserProfile(user.uid);

                        if (user_profiles) {
                            dispatchUserData(user, user_profiles);
                            dispatch(setLoading(false));
                        } else {
                            router.push("/auth/login");
                        }
                    } else {
                        router.push("/auth/login");
                    }
                } else if (pathname.includes("/auth/login")) {
                    if (user) {
                        router.push("/movie?page=1");
                    } else {
                        dispatch(setLoading(false));
                    }
                } else {
                    if(user) {
                        const user_profiles = await getUserProfile(user.uid);

                        if (user_profiles) {
                            dispatchUserData(user, user_profiles);
                        }
                    }
                    dispatch(setLoading(false));
                }
            };

            onAuthStateChanged(auth, handleAuthStateChanged);
        }, [pathname]);

        // Return the component with props
        if(loading) return <div className="flex items-center justify-center h-screen w-screen"><Loading /></div>
        return <Component {...props} />;
    };

    // Return the functional component
    return WithHOC;
};

export default withHOC;