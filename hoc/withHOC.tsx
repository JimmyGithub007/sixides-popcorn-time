"use client";

import { setCollapse, setScrollY } from "@/store/slice/windowSlice";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

type Props = any;

const withHOC = (Component: React.ComponentType<Props>) => {
    const WithHOC = (props: Props) => {
        const dispatch = useDispatch();

        const handleScrollChange = () => {
            dispatch(setScrollY(window.scrollY));
        };
    
        useEffect(() => {
            window.addEventListener("scroll", handleScrollChange);
            return function cleanup() {
                window.removeEventListener("scroll", handleScrollChange);
            };
        }, []);

        useEffect(() => {
            const handleWindowResize = () => {
              if(window.innerWidth < 768) dispatch(setCollapse(false));
            }
            window.addEventListener('resize', handleWindowResize);
            return () => {
              window.removeEventListener('resize', handleWindowResize);
            };
        }, []);

        useEffect(() => {
            if(window.innerWidth < 768) {
                dispatch(setCollapse(false));
            }
        }, [])

        // Return the component with props
        return <Component {...props} />;
    };

    // Return the functional component
    return WithHOC;
};

export default withHOC;