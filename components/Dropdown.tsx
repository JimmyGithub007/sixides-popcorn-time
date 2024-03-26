"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { setLoading } from "@/store/slice/pageSlice";
import { initialState, setUser } from "@/store/slice/userSlice";

const Dropdown = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const Logout = () => {
        signOut(auth).then(() => {
            dispatch(setLoading(true));
            dispatch(setUser(initialState));
            router.push("/auth/login");
        })
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (<div className="flex items-center relative" ref={dropdownRef}>
        <button onClick={() => { setIsOpen(!isOpen); }}>{children}</button>
        <AnimatePresence>
            {isOpen &&
                <motion.div
                    id="dropdownMenu"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{
                        bounce: 0,
                        duration: 0.2
                    }}
                    className="absolute bg-yellow-400 flex flex-col font-bold gap-1 p-1 -right-2 rounded-sm shadow-lg top-[40px] w-max text-black z-10">
                    <button onClick={() => {
                        dispatch(setLoading(true));
                        router.push("/auth/profile");
                    }} className="hover:bg-black hover:text-yellow-400 duration-200 px-4 py-1">My Profile</button>
                    <button onClick={() => {
                        dispatch(setLoading(true));
                        router.push("/auth/profile/watchlist");
                    }} className="hover:bg-black hover:text-yellow-400 duration-200 px-4 py-1">My Watchlist</button>
                    <button className="hover:bg-black hover:text-yellow-400 duration-200 px-4 py-1" onClick={Logout}>Logout</button>
                </motion.div>}
        </AnimatePresence>
    </div>)
}

export default Dropdown;