"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { changeStartScore, changeEndScore } from "@/store/slice/filterSlice";

const Range = () => {
    const dispatch = useDispatch();
    const rangeContainerRef = useRef<HTMLDivElement>(null);
    const { startScore, endScore } = useSelector((state: RootState) => state.filter);
    const [ isPressStart, setIsPressStart ] = useState<boolean>(false);
    const [ isPressEnd, setIsPressEnd ] = useState<boolean>(false);
    const [ startScorePos, setStartScorePos ] = useState<number>(0);
    const [ endScorePos, setEndScorePos ] = useState<number>(0);

    const handleMove = (clientX: number) => {
        if (isPressStart) {
            let containerWidth = rangeContainerRef.current?.offsetWidth || 0;
            containerWidth -= 16;
            const newPos = Math.min(Math.min(Math.max((clientX - 16), 0), containerWidth), endScorePos - 16);
            const start = newPos * (10 / containerWidth);
            dispatch(changeStartScore(start));
        }
        if (isPressEnd) {
            let containerWidth = rangeContainerRef.current?.offsetWidth || 0;
            containerWidth -= 16;
            const newPos = Math.max(Math.min(Math.max((clientX - 16), 0), containerWidth), startScorePos + 16);
            const end = newPos * (10 / containerWidth);
            dispatch(changeEndScore(end));
        }
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX);
    }

    const handleMobileTouchMove = (e: TouchEvent) => {
        handleMove(e.touches[0].clientX);
    }

    const handleWindowMouseUp = () => {
        setIsPressStart(false);
        setIsPressEnd(false);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseup', handleWindowMouseUp);
        window.addEventListener('touchmove', handleMobileTouchMove);
        window.addEventListener('touchend', handleWindowMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseup', handleWindowMouseUp);
            window.removeEventListener('touchmove', handleMobileTouchMove);
            window.removeEventListener('touchend', handleWindowMouseUp);
        };
    }, [isPressStart, isPressEnd]);

    useEffect(() => {
        let containerWidth = rangeContainerRef.current?.offsetWidth || 0;
        if (containerWidth > 0) {
            containerWidth -= 16;
            const newStartScorePos = startScore * (containerWidth / 10);
            const newEndScorePos = endScore * (containerWidth / 10);

            setStartScorePos(newStartScorePos);
            setEndScorePos(newEndScorePos);
        }
    }, [startScore, endScore]);

    useLayoutEffect(() => {
        let containerWidth = rangeContainerRef.current?.offsetWidth || 0;
        containerWidth -= 16;
        const newStartScorePos = startScore * (containerWidth / 10);
        const newEndScorePos = endScore * (containerWidth / 10);

        setStartScorePos(newStartScorePos);
        setEndScorePos(newEndScorePos);
    }, [startScore, endScore, rangeContainerRef.current?.offsetWidth]);

    return (<>
        <div className="w-48 text-sm">
            <span>From <b>{(startScore).toFixed(1)}</b> to <b>{(endScore).toFixed(1)}</b></span>
        </div>
        <div ref={rangeContainerRef} className="relative w-full h-2 bg-yellow-300 rounded-md duration-100 ">
            <div className="absolute h-2 bg-yellow-500" style={{ left: `${startScorePos}px`, width: `${endScorePos - startScorePos}px` }}></div>
            <button style={{ left: `${startScorePos}px` }} onMouseDown={() => setIsPressStart(true) } onTouchStart={() => setIsPressStart(true)} className="duration-100 rounded-full bg-yellow-500 shadow-md w-4 h-4 absolute -top-1" />
            <button style={{ left: `${endScorePos}px` }} onMouseDown={() => setIsPressEnd(true) } onTouchStart={() => setIsPressEnd(true)} className="duration-100 rounded-full bg-yellow-500 shadow-md w-4 h-4 absolute -top-1" />
        </div>
        <div className="w-full flex justify-between font-bold text-sm">
            <span>0.0</span>
            <span>5.0</span>
            <span>10.0</span>
        </div>
    </>);
};

export default Range;