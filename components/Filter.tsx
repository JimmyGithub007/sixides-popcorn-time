'use client'

import { motion } from "framer-motion"
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaGreaterThanEqual, FaSort  } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store";
import { getGenres } from "@/utils";
import { changeGenreId, changeSort, changeStars } from "@/store/slice/filterSlice";
import { genresStatesProps, setGenres } from "@/store/slice/genresSlice";
import Rating from "./Rating";
import Skeleton from "./Skeleton";
import { setCollapse } from "@/store/slice/windowSlice";

const sortCategories: {
    id: string;
    name: string,
}[] = [
    { "name": "Most popularity", "id": "popularity.desc"},
    { "name": "Movie title A - Z", "id": "original_title.asc"},
    { "name": "Movie title Z - A", "id": "original_title.desc"},
    { "name": "Release date from new to old", "id": "primary_release_date.desc"},
    { "name": "Release date from old to new", "id": "primary_release_date.asc"},
    { "name": "Rating from top to low", "id": "vote_average.desc"},
    { "name": "Rating from low to top", "id": "vote_average.asc"},
]

const Filter = () => {
    const dispatch = useDispatch();
    const { genreIds, starNum, sortId } = useSelector((state: RootState) => state.filter);
    const { collapse } = useSelector((state: RootState) => state.window);
    const { genres } = useSelector((state: RootState) => state.genres);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        const delay = 1000; // 1000ms delay
        const timeoutId = setTimeout(async () => {
            const resp = await getGenres();
            dispatch(setGenres(resp.genres));
            setLoading(false);
        }, delay);

        return () => clearTimeout(timeoutId); // Cleanup function to clear the timeout
    }, [dispatch]);

    return (<div className={`fixed h-full duration-300 w-screen p-2 md:w-[250px] ${collapse ? "left-0 overflow-y-auto" : "-left-full md:-left-[250px]"}`}>
        {   loading ? <Skeleton /> :
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="flex flex-col gap-2 p-2">
                    <div className="flex gap-1 items-center text-red-500"><BiSolidCategoryAlt /><span className="font-bold">Genres</span></div>
                    <div className="flex flex-wrap gap-2">
                        {   
                            genres?.map((value: genresStatesProps) => 
                                <button onClick={() => dispatch(changeGenreId(value.id))} className={`${genreIds.includes(value.id) ? "bg-yellow-300 text-black" : "bg-black text-white"} px-2 py-1 text-xs rounded-sm shadow-md font-bold duration-200`} key={value.id}>{value.name}</button>
                            )
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <div className="flex gap-1 items-center text-red-500"><FcRating /><span className="font-bold">Rating</span></div>
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div className="flex gap-2 cursor-pointer w-fit" key={num} onClick={() => dispatch(changeStars(num))}>
                                <div className={`${starNum == num ? "bg-yellow-400 border-4 border-black" : "bg-black" } w-4 h-4 rounded-sm shadow-md duration-200`} />
                                <FaGreaterThanEqual /><Rating starNum={num} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <div className="flex gap-1 items-center text-red-500"><FaSort /><span className="font-bold">Sort by</span></div>
                    <div className="flex flex-col gap-2">
                        {sortCategories?.map((value, key) => (
                            <div className="flex gap-2 cursor-pointer w-fit" key={key} onClick={() => dispatch(changeSort(value.id))}>
                                <div className={`${sortId == value.id ? "bg-yellow-400 border-4 border-black" : "bg-black" } w-4 h-4 rounded-sm shadow-md duration-200`} />
                                <span className="text-sm font-bold">{value.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2 visible md:invisible">
                    <button onClick={() => dispatch(setCollapse(false)) } className="flex gap-2 items-center justify-center bg-black text-white py-2 font-bold rounded-3xl shadow-lg">
                        <BsArrowLeftCircleFill /> Close
                    </button>
                </div>
            </motion.div>
        }
    </div>)
}

export default Filter;