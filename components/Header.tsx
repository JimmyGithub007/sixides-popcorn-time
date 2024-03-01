"use client";

import { BsArrowLeftCircleFill } from "react-icons/bs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PiPopcornDuotone } from "react-icons/pi";

type Props = {
    collapse?: boolean,
    setCollapse: Dispatch<SetStateAction<boolean>>
}

const Header = (props: Props) => {
    const [ scrollY, setScrollY ] = useState(0);

    const handleScrollChange = () => {
        setScrollY(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScrollChange);
        return function cleanup() {
          window.removeEventListener("scroll", handleScrollChange);
        };
    }, []);

    return (<header className={`${scrollY > 0 ? "bg-white pl-3 sm:pl-6" : "bg-black shadow-lg pl-6 sm:pl-12 text-yellow-300"} animate-opacity h-16 flex flex-row items-center rounded-md font-bold gap-2 sticky top-0 z-20 duration-300`}>
        <BsArrowLeftCircleFill className={`${scrollY > 0 ? "text-black" : "text-white"} cursor-pointer duration-300 text-3xl ${!props.collapse && "rotate-180"}`} onClick={() => props.setCollapse(!props.collapse) } />
        <PiPopcornDuotone className={`${scrollY > 0 ? "-rotate-12" : "rotate-12"} transform text-4xl duration-[400ms]`} />
        <span className="text-sm md:text-lg">SIXiDES POPCORN TIME</span>
    </header>)
}

export default Header;