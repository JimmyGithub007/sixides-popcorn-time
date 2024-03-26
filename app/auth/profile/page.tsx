"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoEarthOutline } from "react-icons/io5";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FaHistory, FaLanguage, FaRegUser } from "react-icons/fa";
import { PiPopcorn } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"
import { db } from "@/app/firebase/config";
import { RootState } from "@/store";
import { setLoading } from "@/store/slice/pageSlice";
import { setAlert } from "@/store/slice/alertSlice";
import { RootShell } from "@/components";
import withHOC from "@/hoc/withHOC";

type Inputs = {
    email: string;
    username: string;
    language: string;
    country: string;
}

const Profile = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            email: "",
            username: "",
            language: "en",
            country: "sg"
        }
    });

    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const updateProfile: SubmitHandler<Inputs> = async (data) => {
        const userProfileQuery = await getDocs(query(collection(db, "user_profiles"), where("uid", "==", user.uid)));
        userProfileQuery.forEach(async (doc) => {
            try {
                await updateDoc(doc.ref, {
                    username: data.username,
                    language: data.language,
                    country: data.country
                })
                dispatch(setAlert({
                    type: "success",
                    message: "Your profile is updated successfully"
                }));
            } catch (error) {
                console.log(error)
            }
        })
    }

    useEffect(() => {
        if (user.uid != "") {
            reset({
                email: user.email,
                username: user.username,
                language: user.language,
                country: user.country
            })
        }
    }, [user])

    return (<RootShell>
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5
            }}
            className="flex flex-col gap-4 items-center justify-center h-screen bg-slate-50 w-screen">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-white shadow-lg rounded-lg px-12 py-8">
                <div className="flex gap-4 items-center">
                    <PiPopcorn className="bg-black rounded-full p-2 -rotate-12 shadow-lg text-yellow-400 text-8xl" />
                    <h1 className="font-bold text-4xl">MY<br />PROFILE</h1>
                </div>
                <form onSubmit={handleSubmit(updateProfile)} className="flex flex-col gap-5">
                    <div className="flex items-center relative">
                        <MdOutlineEmail className="absolute left-2 p-1 shadow-lg text-yellow-400 text-3xl z-10" />
                        <input disabled className="bg-black px-3 pl-10 pr-2 py-2 rounded-sm text-yellow-400 cursor-not-allowed opacity-80 w-full" {...register("email", { required: true })} />
                    </div>
                    <div className="flex items-center relative">
                        <FaRegUser className="absolute left-2 p-1 shadow-lg text-yellow-400 text-3xl z-10" />
                        <input defaultValue={user.username} className="bg-black px-3 pl-10 pr-2 py-2 rounded-sm text-yellow-400 w-full" placeholder="USERNAME" {...register("username", { required: true })} />
                        {errors.username && <span className="absolute font-bold text-red-600 text-sm top-[2.3rem]">Username is required</span>}
                    </div>
                    <div className="flex items-center relative">
                        <FaLanguage className="absolute left-2 p-1 shadow-lg text-yellow-400 text-3xl z-10" />
                        <select className="bg-black px-3 pl-10 pr-2 py-2 rounded-sm text-yellow-400 w-full" {...register("language", { required: true })} >
                            <option value="">Select Language</option>
                            <option value="en">English</option>
                            <option value="cn">Chinese</option>
                            <option value="myy">Malay</option>
                        </select>
                        {errors.language && <span className="absolute font-bold text-red-600 text-sm top-[2.2rem]">Language is required</span>}
                    </div>
                    <div className="flex items-center relative">
                        <IoEarthOutline className="absolute left-2 p-1 shadow-lg text-yellow-400 text-3xl z-10" />
                        <select className="bg-black px-3 pl-10 pr-2 py-2 rounded-sm text-yellow-400 w-full" {...register("country", { required: true })} >
                            <option value="">Select Country</option>
                            <option value="sg">Singapore</option>
                            <option value="my">Malaysia</option>
                        </select>
                        {errors.country && <span className="absolute font-bold text-red-600 text-sm top-[2.2rem]">Country is required</span>}
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-yellow-400 font-bold shadow-lg text-lg px-3 py-1 rounded-sm">SAVE</button>
                        <button onClick={() => {
                            dispatch(setLoading(true));
                            router.push("/movie?page=1");
                        }} type="button" className="bg-black flex font-bold gap-2 items-center shadow-lg text-yellow-400 text-lg px-3 py-1 rounded-sm">
                            <RiArrowGoBackLine />BACK TO MOVIES
                        </button>
                    </div>
                </form>
            </div>
            <h1 className="flex font-bold gap-2 items-center"><FaHistory /> My Search History</h1>
            <div className="flex flex-wrap gap-2">
                {user.keywords &&
                    user.keywords.map((value, key) => (
                        <button key={key} onClick={() => {
                            dispatch(setLoading(true));
                            router.push("/movie?page=1&keyword=" + value);
                        }} className="bg-slate-100 rounded-2xl px-4 py-1 shadow-sm">{value}</button>
                    ))
                }
            </div>
            <p className="text-gray-600 text-[0.6rem] md:text-xs">SIXiDES Popcorn Time 2024 All Rights Reserved &copy;</p>
        </motion.div>
    </RootShell>)
}

export default withHOC(Profile);