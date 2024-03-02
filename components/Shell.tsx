"use client";

import { ReactNode, useEffect, useState } from "react";
import { Filter, Footer, Header, Modal } from ".";
import { usePathname } from "next/navigation";
import { IoIosArrowUp } from "react-icons/io";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const Shell = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const { scrollY, collapse } = useSelector((state: RootState) => state.window);
    const [ show, setShow ] = useState<boolean>(false);

    useEffect(() => {
        const arr: string[] = pathname.split("/");
        if(arr[1] == "movie" && arr[2] == "p") setShow(true);
    }, [])

    useEffect(() => {
        if(collapse && window.innerWidth < 768){ document.body.classList.add("overflow-y-hidden"); }
        else { document.body.classList.remove("overflow-y-hidden"); }
    }, [collapse])

    if(!show) return children;

    return (<><div className="flex gap-3 p-2">
        <Filter />
        <div className={`duration-300 w-full ${collapse ? "overflow-x-hidden sm:overflow-x-clip invisible md:visible ml-[calc(100vw-0.5rem)] md:ml-[250px]" : "visible"}`}>
            <Header />
            {children}
            <Footer />
        </div>
    </div>
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' }) } className={`${scrollY > 0 ? "opacity-100 visible" : "opacity-0 invisible"} fixed bottom-4 right-4 text-4xl rounded-full bg-yellow-400 text-white p-2 shadow-md hover:bg-yellow-300 duration-300`}><IoIosArrowUp  /></button>
    <Modal /></>);
}

export default Shell;
