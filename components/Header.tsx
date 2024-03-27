"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { PiPopcornDuotone } from "react-icons/pi";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/app/firebase/config";
import { RootState } from "@/store";
import { setKeyword, setOpenSearchBar } from "@/store/slice/filterSlice";
import { setLoading } from "@/store/slice/pageSlice";
import { setCollapse } from "@/store/slice/windowSlice";
import { setKeywords } from "@/store/slice/userSlice";
import dynamic from "next/dynamic";

const Dropdown = dynamic(() => import('./Dropdown'));

const Header = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryKeyword = searchParams.get('keyword')

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const { openSearchBar, keyword } = useSelector((state: RootState) => state.filter);
    const { scrollY, collapse } = useSelector((state: RootState) => state.window);
    const { loading, page } = useSelector((state: RootState) => state.movies);

    const [ isLogin, setIsLogin ] = useState<boolean>(false);

    const saveSearchHistoryAPI = async (keywordStr: string) => {
        const userProfileQuery = await getDocs(query(collection(db, "user_profiles"), where("uid", "==", user.uid)));
        userProfileQuery.forEach(async (doc) => {
            try {
                let keywordsSet = new Set<string>(user.keywords);
                keywordsSet.add(keywordStr);
                const keywordsArr = Array.from(keywordsSet.values())

                await updateDoc(doc.ref, {
                    keywords: keywordsArr
                })
                dispatch(setKeywords(keywordsArr));
            } catch (error) {
                console.log(error)
            }
        })
    }

    const clearSearch = () => {
        if (!loading) { 
            dispatch(setKeyword("")); 
            dispatch(setOpenSearchBar(false)); 
            router.push("/movie?page=" + page); 
        }
    }

    useEffect(() => {
        if (queryKeyword) {
            dispatch(setOpenSearchBar(true));
            dispatch(setKeyword(queryKeyword));
            if(user.uid != "") saveSearchHistoryAPI(queryKeyword);
        }
    }, [queryKeyword])

    useEffect(() => {
        if(user.uid != "") {
            setIsLogin(true);
        }
    }, [user])

    return (<motion.div
        id="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${scrollY > 0 ? "bg-white pl-3 sm:pl-6" : "bg-black pl-6 shadow-lg text-yellow-300 sm:pl-12"} duration-300 font-bold flex flex-row gap-2 h-16 items-center justify-between pr-6 relative sticky top-0 z-10`}>
        <div className="flex flex-row gap-2 items-center">
            {!queryKeyword && <BsArrowLeftCircleFill className={`${scrollY > 0 ? "text-black shadow-lg rounded-full" : "text-white"} cursor-pointer duration-300 text-3xl ${!collapse && "rotate-180"}`} onClick={() => dispatch(setCollapse(!collapse))} />}
            <button className="flex items-center gap-2 text-sm md:text-lg" onClick={clearSearch}>
                <PiPopcornDuotone className={`${scrollY > 0 ? "-rotate-12" : "rotate-12"} duration-[400ms] text-4xl transform`} /> SIXiDES POPCORN TIME
            </button>
        </div>
        <div className="duration-300 flex flex-row items-center gap-3">
            {   isLogin ? <Dropdown>
                    <div className={`${scrollY > 0 ? "rounded-full shadow-lg text-black" : "text-white"} cursor-pointer text-3xl`}><FaUserCircle /></div>
                </Dropdown> :
                <button onClick={() => {
                    dispatch(setLoading(true));
                    router.push("/auth/login");
                }} className={`${scrollY > 0 ? "text-black" : "text-white"} text-xs sm:text-lg`}>SIGN IN</button>
            }
            <div className={`${scrollY > 0 ? "bg-black" : "bg-white"} h-6 rounded-md w-1`}></div>
            <div onClick={() => dispatch(setOpenSearchBar(!openSearchBar))} className={`${openSearchBar ? (scrollY > 0 ? "bg-yellow-400 p-1 rounded-md shadow-md text-black" : "text-yellow-400") : (scrollY > 0 ? "text-black" : "text-white")} text-4xl cursor-pointer duration-300`}><MdOutlineScreenSearchDesktop /></div>
        </div>
        <AnimatePresence>
            {openSearchBar &&
                <motion.div id="searchBar" className={`absolute bg-black flex flex-row font-bold gap-2 h-12 items-center pr-4 right-0 top-16 w-full`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                        bounce: 0,
                        duration: 0.5
                    }}
                >
                    <input onKeyDown={(e) => { if (e.key === "Enter" && !loading && keyword) router.push("/movie?page=1&keyword=" + keyword); }} value={keyword || ""} onChange={e => {
                        dispatch(setKeyword(e.target.value));
                    }} className="bg-black h-12 focus:outline-none px-4 text-right text-white w-full" placeholder="Search for a movie name" />
                    <button onClick={() => {
                        if (!loading && keyword) router.push("/movie?page=1&keyword=" + keyword);
                    }} className={`${(loading || !keyword) ? "cursor-not-allowed opacity-50" : ""} bg-yellow-300 flex flex-row font-bold items-center px-2 py-1 relative rounded-sm text-black`}>
                        <CiSearch className="text-xl" /> Search {loading && <span className="absolute animate-ping bg-white h-3 rounded-full -right-1 -top-1 w-3"></span>}
                    </button>
                    <button onClick={clearSearch} className={`${loading && "cursor-not-allowed opacity-50"} text-white font-bold text-xl`}><IoClose /></button>
                </motion.div>
            }
        </AnimatePresence>
    </motion.div>)
}

export default Header;