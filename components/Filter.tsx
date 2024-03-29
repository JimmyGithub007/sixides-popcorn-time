"use client";

import { motion } from "framer-motion"
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaSort  } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store";
import { getGenres } from "@/utils";
import { changeGenreId, changeSort, setFilter } from "@/store/slice/filterSlice";
import { genresStatesProps, setGenres } from "@/store/slice/genresSlice";
import { setCollapse } from "@/store/slice/windowSlice";
import dynamic from "next/dynamic";

const Range = dynamic(() => import('./Range'))
const Skeleton = dynamic(() => import('./Skeleton'))

const sortCategories: {
    id: string;
    name: string,
}[] = [
    { "name": "Most popularity", "id": "popularity.desc"},
    { "name": "Movie title A - Z", "id": "title.asc"},
    { "name": "Movie title Z - A", "id": "title.desc"},
    { "name": "Release date from new to old", "id": "primary_release_date.desc"},
    { "name": "Release date from old to new", "id": "primary_release_date.asc"},
    { "name": "Rating from top to low", "id": "vote_average.desc"},
    { "name": "Rating from low to top", "id": "vote_average.asc"},
]

const Filter = () => {
    const dispatch = useDispatch();
    const { genreIds, sortId, isSearch } = useSelector((state: RootState) => state.filter);
    const { loading } = useSelector((state: RootState) => state.movies);
    const { collapse } = useSelector((state: RootState) => state.window);
    const { genres } = useSelector((state: RootState) => state.genres);
    const [ loadingGenres, setLoadingGenres ] = useState<boolean>(true);

    useEffect(() => {
        const delay = 1000; // 1000ms delay
        const timeoutId = setTimeout(async () => {
            const resp = await getGenres();
            dispatch(setGenres(resp.genres));
            setLoadingGenres(false);
        }, delay);

        return () => clearTimeout(timeoutId); // Cleanup function to clear the timeout
    }, [dispatch]);

    return (<div className={`z-20 fixed bg-stone-50 h-full duration-300 w-screen p-2 md:w-[250px] overflow-x-hidden ${collapse ? "left-0 overflow-y-auto" : "-left-full md:-left-[250px]"}`}>
        {   loadingGenres ? <Skeleton /> :
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="flex flex-col min-h-[calc(100vh-128px)]">
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
                        <Range />
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
                </div>
                <div className="p-2">
                    <button onClick={() => { (!loading && !isSearch) && dispatch(setFilter(true)) }} className={`${loading ? "cursor-not-allowed bg-gray-300" : "bg-black hover:opacity-80"} relative w-full flex gap-2 items-center justify-center text-white py-2 font-bold rounded-sm shadow-lg duration-300`}>
                        { loading && <span className="absolute right-4 top-3 animate-ping h-4 w-4 rounded-full bg-yellow-400 pr-2"></span> }Search
                    </button>
                </div>
                <div className="p-2 visible md:invisible">
                    <button onClick={() => dispatch(setCollapse(false)) } className="w-full flex gap-2 items-center justify-center bg-black text-white py-2 font-bold rounded-sm shadow-lg">
                        <BsArrowLeftCircleFill /> Close
                    </button>
                </div>
            </motion.div>
        }
    </div>)
}

export default Filter;