"use client";

import { RootState } from "@/store";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { CiCircleCheck } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react";
import { setShow } from "@/store/slice/alertSlice";

const Alert = () => {
    const { show, message, type } = useSelector((state: RootState) => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (show) {
          timer = setTimeout(() => {
            dispatch(setShow(false));
          }, 2000);
        }
    return () => clearTimeout(timer);
  }, [show, dispatch]);

    return (<AnimatePresence>{
        show && <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{
                bounce: 0.2,
                duration: 0.2
            }}
            className={`${type == "success" ? "bg-teal-100 text-teal-900" : "bg-red-100 text-red-700"} fixed flex items-center gap-2 px-4 py-3 right-4 rounded-md top-12 shadow-md z-50`}>
            { type == "success" ? <CiCircleCheck className="text-3xl" /> : <BiSolidMessageSquareError className="text-3xl" /> }<h1 className="font-bold">{message}</h1>
        </motion.div>
    }</AnimatePresence>)
}

export default Alert;