"use client";

import { RootState } from "@/store";
import { setCollapse, setScrollY } from "@/store/slice/windowSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

type Props = any;

const withHOC = (Component: React.ComponentType<Props>) => {
    const WithHOC = (props: Props) => {
        const dispatch = useDispatch();
        const { collapse } = useSelector((state: RootState) => state.window);

        // Event listener callbacks
        const handleScrollChange = () => {
            dispatch(setScrollY(window.scrollY));
        };

        const handleWindowResize = () => {
            if (window.innerWidth < 768) {
                dispatch(setCollapse(false));
            }
        };

        // Add event listeners on component mount
        useEffect(() => {
            window.addEventListener("scroll", handleScrollChange);
            window.addEventListener('resize', handleWindowResize);

            // Cleanup on component unmount
            return () => {
                window.removeEventListener("scroll", handleScrollChange);
                window.removeEventListener('resize', handleWindowResize);
            };
        }, []);

        useEffect(() => {
            if(window.innerWidth < 768) {// if browser screen size less than 768 width hide the sidebar filter
                dispatch(setCollapse(false));
            }
        }, [])

        useEffect(() => {
            if(collapse && window.innerWidth < 768) { 
                document.body.classList.add("overflow-y-hidden"); 
            }
            else { 
                document.body.classList.remove("overflow-y-hidden"); 
            }
        }, [collapse])

        // Return the component with props
        return <Component {...props} />;
    };

    // Return the functional component
    return WithHOC;
};

export default withHOC;