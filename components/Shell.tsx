"use client";

import { ReactNode, useEffect, useState } from "react";
import { Filter, Footer, Header, Modal } from ".";
import { usePathname } from "next/navigation";

const Shell = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const [ collapse, setCollapse ] = useState<boolean>(true);
    const [ show, setShow ] = useState<boolean>(false);

    useEffect(() => {
        const handleWindowResize = () => {
          if(window.innerWidth < 768) setCollapse(false);
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if(collapse && window.innerWidth < 768){ document.body.classList.add("overflow-y-hidden"); }
        else { document.body.classList.remove("overflow-y-hidden"); }
    }, [collapse])

    useEffect(() => {
        if(window.innerWidth < 768) {
            setCollapse(false);
        }
    }, [])

    useEffect(() => {
        const arr: string[] = pathname.split("/");
        if(arr[1] == "movie" && arr[2] == "p") setShow(true);
    }, [])

    if(!show) return children;

    return (<><div className="flex gap-3 p-2">
        <Filter collapse={collapse} setCollapse={setCollapse} />
        <div className={`duration-300 w-full ${collapse ? "overflow-x-hidden sm:overflow-x-clip invisible md:visible ml-[calc(100vw-0.5rem)] md:ml-[250px]" : "visible"}`}>
            <Header collapse={collapse} setCollapse={setCollapse} />
                {children}
            <Footer />
        </div>
    </div>
    <Modal /></>);
}

export default Shell;
