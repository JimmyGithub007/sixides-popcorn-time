"use client";

import { ReactNode } from "react";
import { Alert, Modal } from ".";

const RootShell = ({ children }: { children: ReactNode }) => {
    return (<>
        {children}
        <Alert />
        <Modal />
    </>);
}

export default RootShell;
