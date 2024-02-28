"use client";

import { ReactNode, useEffect, useState } from "react";
import { Filter, Footer, Header, Modal } from ".";

const Shell = ({ children }: { children: ReactNode }) => {
    const [ collapse, setCollapse ] = useState<boolean>(true);

    useEffect(() => {
        const handleWindowResize = () => {
          if(window.innerWidth < 768) setCollapse(false);
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (<><div className="flex p-2 gap-3 overflow-hidden">
        <Filter collapse={collapse} setCollapse={setCollapse} />
        <div className={`duration-300 w-full ${collapse ? "ml-[calc(100vw-0.5rem)] md:ml-[250px]" : ""}`}>
            <Header collapse={collapse} setCollapse={setCollapse} />
            {children}
            <Footer />
        </div>
    </div>
    <Modal /></>);
}

export default Shell;
