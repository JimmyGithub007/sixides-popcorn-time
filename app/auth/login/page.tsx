"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { PiPopcornDuotone } from "react-icons/pi";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { useRouter } from "next/navigation";
import { setLoading } from "@/store/slice/pageSlice";
import { motion } from "framer-motion"
import withHOC from "@/hoc/withHOC";

type Inputs = {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [type, setType] = useState<string>("sign in");

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: ""
        }
    });

    const password = watch("password");

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        dispatch(setLoading(true));
        if (type === "sign up") {
            try {
                const resp = await createUserWithEmailAndPassword(auth, data.email, data.password);
                await addDoc(collection(db, "user_profiles"), {
                    uid: resp.user.uid,
                    username: data.username,
                })
                setType("sign in");
            } catch (error) {
                console.error("Error creating user:", error);
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, data.email, data.password);
                router.push("/movie?page=1");
            } catch (error) {
                console.error("Error signing in:", error);
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5
            }}
            className={`bg-yellow-400 flex flex-col h-screen sm:items-center w-screen sm:bg-stone-50 sm:flex-row relative`}>
            <form onSubmit={handleSubmit(onSubmit)} className={`${type == "sign up" ? "rounded-bl-xl rounded-br-xl sm:rounded-bl-none sm:rounded-tr-md sm:rounded-br-md sm:left-[50%] top-0" : "rounded-tl-xl rounded-tr-xl sm:rounded-tr-none sm:rounded-tl-md sm:rounded-bl-md sm:left-[calc(50%-300px)] top-[30%] sm:top-0"} absolute bg-black duration-200 h-[70%] flex flex-col gap-5 px-8 pt-8 relative shadow-md sm:h-[450px] sm:w-[300px] w-full z-10`}>
                <div className="flex gap-2 items-center justify-center">
                    <PiPopcornDuotone className={`bg-white duration-300 rounded-full p-2 text-7xl ${type == "sign in" ? "" : "-"}rotate-12`} />
                    <div className="flex flex-col text-yellow-400 ">
                        <span className="font-bold text-4xl">SIXiDES</span>
                        <span className="text-xl">POPCORN TIME</span>
                    </div>
                </div>
                <h1 className="font-bold text-yellow-400 text-3xl">{type == "sign in" ? "Welcome back!" : "Create account"}</h1>
                <div className={`${type == "sign up" ? "opacity-100" : "opacity-0"} duration-300 flex relative`}>
                    <input className="px-2 py-1 rounded-sm w-full" placeholder="USERNAME" {...register("username",
                        {
                            required: type == "sign up" || false
                        },
                    )} />
                    {errors.username && <span className="absolute font-bold text-red-600 text-sm top-8">{errors.username.message}</span>}
                </div>
                <div className="flex relative">
                    <input className="px-2 py-1 rounded-sm w-full" placeholder="EMAIL" {...register("email",
                        {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Please enter email format",
                            },
                        },
                    )} />
                    {errors.email && <span className="absolute font-bold text-red-600 text-sm top-8">{errors.email.message}</span>}
                </div>
                <div className="flex relative">
                    <input className="px-2 py-1 rounded-sm w-full" placeholder="PASSWORD" {...register("password", { required: true })} />
                    {errors.password && <span className="absolute font-bold text-red-600 text-sm top-8">Password is required!</span>}
                </div>
                <div className={`${type == "sign up" ? "opacity-100" : "opacity-0"} duration-300 flex relative`}>
                    <input className="px-2 py-1 rounded-sm w-full" placeholder="CONFIRM PASSWORD" {...register("confirm_password",
                        {
                            validate: value => (type == "sign in") || (type == "sign up" && value === password) || "Passwords do not match",
                        },
                    )} />
                    {errors.confirm_password && <span className="absolute font-bold text-red-600 text-sm top-8">{errors.confirm_password.message}</span>}
                </div>
                <div>
                    <button type="submit" className="bg-yellow-400 font-bold px-2 py-1 rounded-sm w-full">SIGN {type == "sign in" ? "IN" : "UP"}</button>
                    {/*<button type="button" className={`${type == "sign in" ? "opacity-100 hover:opacity-80" : "opacity-0 invisible"} duration-100 font-bold text-xs text-yellow-400 underline`}>Forget password? Click me to reset it!</button>*/}
                </div>
            </form>
            <div className={`${type == "sign up" ? "sm:rounded-l-md sm:left-[calc(50%-300px)] top-[70%] sm:top-auto" : "sm:rounded-r-md sm:left-[50%] top-auto"} absolute duration-200 flex flex-col gap-2 h-[30%] items-center justify-center px-8 w-full sm:bg-yellow-400 sm:h-[450px] sm:shadow-md sm:w-[300px]`}>
                <h1 className="font-bold text-black text-center text-2xl sm:text-3xl">{type == "sign in" ? "Don't" : "Already"} hava an account?</h1>
                <span className="text-sm">{type == "sign in" ? "start your journal in one click" : "Sign in with your email and password"}</span>
                <button onClick={() => { reset(); setType(type == "sign up" ? "sign in" : "sign up"); }} className="bg-black font-bold px-2 py-1 rounded-sm shadow-lg text-white w-full">SIGN {type == "sign in" ? "UP" : "IN"}</button>
                <button onClick={() => {
                    dispatch(setLoading(true));
                    router.push("/movie?page=1");
                }} type="button" className={`${type == "sign in" ? "opacity-100 hover:opacity-80" : "opacity-0 invisible"} duration-100 font-bold text-xs text-black underline`}>Or you can directly jump to movies list!</button>
            </div>
        </motion.div>
    )
}

export default withHOC(Login);