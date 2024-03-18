"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";

const Alert = dynamic(() => import('./Alert'))
const Modal = dynamic(() => import('./Modal'))

const RootShell = ({ children }: { children: ReactNode }) => {
    return (<>
        {children}
        <Alert />
        <Modal />
    </>);
}

export default RootShell;
