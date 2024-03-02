"use client";

import { RootState } from "@/store";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { PiPopcornDuotone } from "react-icons/pi";
import { setCollapse } from "@/store/slice/windowSlice";

const Header = () => {
    const dispatch = useDispatch();
    const { scrollY, collapse } = useSelector((state: RootState) => state.window);

    return (<header className={`${scrollY > 0 ? "bg-white pl-3 sm:pl-6" : "bg-black shadow-lg pl-6 sm:pl-12 text-yellow-300"} animate-opacity h-16 flex flex-row items-center rounded-md font-bold gap-2 sticky top-0 z-20 duration-300`}>
        <BsArrowLeftCircleFill className={`${scrollY > 0 ? "text-black" : "text-white"} cursor-pointer duration-300 text-3xl ${!collapse && "rotate-180"}`} onClick={() =>  dispatch(setCollapse(!collapse)) } />
        <PiPopcornDuotone className={`${scrollY > 0 ? "-rotate-12" : "rotate-12"} transform text-4xl duration-[400ms]`} />
        <span className="text-sm md:text-lg">SIXiDES POPCORN TIME</span>
    </header>)
}

export default Header;