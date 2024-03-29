"use client";

import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowUp } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { RootState } from "@/store";
import { RootShell } from ".";
import dynamic from "next/dynamic";

const Filter = dynamic(() => import('./Filter'));
const Header = dynamic(() => import('./Header'));
const Footer = dynamic(() => import('./Footer'));

const Shell = ({ children }: { children: ReactNode }) => {
    const searchParams = useSearchParams();
    const keyword = searchParams.get("keyword");
    const { collapse, scrollY } = useSelector((state: RootState) => state.window);

    return (<RootShell>
        <div className="flex">
            {!keyword && <Filter />}
            <div className={`duration-300 w-full ${(collapse && !keyword) ? "overflow-x-hidden sm:overflow-x-clip invisible md:visible ml-[100vw] md:ml-[250px]" : "visible"}`}>
                <Header />
                {children}
                <Footer />
            </div>
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`${scrollY > 0 ? "opacity-100 visible" : "opacity-0 invisible"} fixed bottom-4 right-4 text-4xl rounded-full bg-yellow-400 text-white p-2 shadow-md hover:bg-yellow-300 duration-300`}><IoIosArrowUp /></button>
    </RootShell>);
}

export default Shell;
