"use client";

import { useDispatch, useSelector } from "react-redux";
import { IoEarthOutline } from "react-icons/io5";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FaHistory, FaLanguage, FaRegUser } from "react-icons/fa";
import { PiPopcorn } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { setLoading } from "@/store/slice/pageSlice";
import Link from "next/link";
import withHOC from "@/hoc/withHOC";

const Profile = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    return (<div className="flex flex-col gap-4 items-center justify-center h-screen bg-slate-50 w-screen">
        <div className="flex items-center gap-6 p-4 bg-white shadow-lg rounded-lg px-12 py-8">
            <div className="flex gap-4 items-center">
                <PiPopcorn className="bg-black rounded-full p-2 -rotate-12 shadow-lg text-yellow-400 text-8xl" />
                <h1 className="font-bold text-4xl">MY<br />PROFILE</h1>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center relative">
                    <MdOutlineEmail className="absolute left-2 p-1 shadow-lg text-yellow-400 text-3xl z-10" />
                    <input disabled defaultValue={user.email} className="bg-black px-3 pl-10 pr-2 py-2 rounded-sm text-yellow-400 cursor-not-allowed opacity-80 w-full" />
                </div>
                <div className="flex items-center relative">
                    <FaRegUser  className="absolute left-2 p-1 shadow-lg text-yellow-400 text-3xl z-10" />
                    <input defaultValue={user.username} className="bg-black px-3 pl-10 pr-2 py-2 rounded-sm text-yellow-400 w-full" placeholder="USERNAME" />
                </div>
                <div className="flex items-center relative">
                    <FaLanguage  className="absolute left-2 p-1 shadow-lg text-yellow-400 text-3xl z-10" />
                    <select className="bg-black px-3 pl-10 pr-2 py-2 rounded-sm text-yellow-400 w-full" >
                        <option value="">Select Language</option>
                        <option value="en">ENGLISH</option>
                    </select>
                </div>
                <div className="flex items-center relative">
                    <IoEarthOutline  className="absolute left-2 p-1 shadow-lg text-yellow-400 text-3xl z-10" />
                    <select className="bg-black px-3 pl-10 pr-2 py-2 rounded-sm text-yellow-400 w-full" >
                        <option value="">Select Country</option>

                    </select>
                </div>
                <div className="flex gap-2">
                    <button className="bg-yellow-400 font-bold shadow-lg text-lg px-3 py-1 rounded-sm">SAVE</button>
                    <button className="bg-black flex font-bold gap-2 items-center shadow-lg text-yellow-400 text-lg px-3 py-1 rounded-sm">
                        <RiArrowGoBackLine /><Link href="/movie?page=1">BACK TO MOVIES</Link>
                    </button>
                </div>
            </div>
        </div>
        <h1 className="flex font-bold gap-2 items-center"><FaHistory /> My Search History</h1>
        <div className="flex flex-wrap gap-2">
            {   user.keywords &&
                user.keywords.map(value => (
                    <button onClick={() => {
                        dispatch(setLoading(true));
                        router.push("/movie?page=1&keyword="+value);
                    }} className="bg-slate-100 rounded-2xl px-4 py-1 shadow-sm">{value}</button>
                ))
            }
        </div>
        <p className="text-gray-600 text-[0.6rem] md:text-xs">SIXiDES Popcorn Time 2024 All Rights Reserved &copy;</p>
    </div>)
}

export default withHOC(Profile);