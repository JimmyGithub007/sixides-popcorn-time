"use client";

import { ReactNode, useEffect, useState } from "react";
import { Filter, Footer, Header } from ".";

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

    return (<div className="flex p-2 gap-3">
        <Filter collapse={collapse} setCollapse={setCollapse} />
        <div className={`duration-300 w-full ${collapse ? "ml-[250px]" : ""}`}>
            <Header collapse={collapse} setCollapse={setCollapse} />
            {children}
            <Footer />
        </div>
    </div>);
}

export default Shell;
