"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { PiPopcornDuotone } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "@/store";
import { setKeyword, setOpenSearchBar } from "@/store/slice/filterSlice";
import { setCollapse } from "@/store/slice/windowSlice";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { setLoading } from "@/store/slice/pageSlice";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { setKeywords } from "@/store/slice/userSlice";
import Dropdown from "./Dropdown";

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

    return (<><motion.div
        id="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${scrollY > 0 ? "bg-white pl-3 sm:pl-6" : "bg-black pl-6 shadow-lg text-yellow-300 sm:pl-12"} duration-300 font-bold flex flex-row gap-2 h-16 items-center justify-between pr-6 relative sticky top-0 z-10`}>
        <div className="flex flex-row gap-2 items-center">
            {!queryKeyword && <BsArrowLeftCircleFill className={`${scrollY > 0 ? "text-black shadow-lg rounded-full" : "text-white"} cursor-pointer duration-300 text-3xl ${!collapse && "rotate-180"}`} onClick={() => dispatch(setCollapse(!collapse))} />}
            <PiPopcornDuotone className={`${scrollY > 0 ? "-rotate-12" : "rotate-12"} transform text-4xl duration-[400ms]`} />
            <span className="text-sm md:text-lg">SIXiDES POPCORN TIME</span>
        </div>
        <div className="flex flex-row items-center gap-3 duration-300">
            {   isLogin ? <Dropdown>
                    <div className={`${scrollY > 0 ? "text-black shadow-lg rounded-full" : "text-white"} text-3xl cursor-pointer`}><FaUserCircle /></div>
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
                <motion.div id="searchBar" className={`bg-black h-12 flex flex-row items-center font-bold gap-2 absolute top-16 w-full right-0 pr-4`}
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
                    }} className="bg-black text-white h-12 text-right w-full focus:outline-none px-4" placeholder="Search for a movie name" />
                    <button onClick={() => {
                        if (!loading && keyword) router.push("/movie?page=1&keyword=" + keyword);
                    }} className={`${(loading || !keyword) ? "cursor-not-allowed opacity-50" : ""} relative bg-yellow-300 rounded-sm font-bold flex flex-row px-2 py-1 items-center text-black`}>
                        <CiSearch className="text-xl" /> Search {loading && <span className="absolute -right-1 -top-1 animate-ping h-3 w-3 rounded-full bg-white"></span>}
                    </button>
                    <button onClick={() => { if (!loading) { dispatch(setKeyword("")); dispatch(setOpenSearchBar(false)); router.push("/movie?page=" + page); } }} className={`${loading && "cursor-not-allowed opacity-50"} text-white font-bold text-xl`}><IoClose /></button>
                </motion.div>
            }
        </AnimatePresence>
    </motion.div>
    </>)
}

export default Header;