'use client'

import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaGreaterThanEqual, FaSort  } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store";
import { getGenres } from "@/utils";
import { changeGenreId, changeSort, changeStars } from "@/store/slice/filterSlice";
import { genresStatesProps, setGenres } from "@/store/slice/genresSlice";
import Rating from "./Rating";
import { Loading } from ".";
import Skeleton from "./Skeleton";

type Props = {
    collapse?: boolean,
    setCollapse: Dispatch<SetStateAction<boolean>>
}

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

const Filter = (props: Props) => {
    const { genreIds, starNum, sortId } = useSelector((state: RootState) => state.filter);
    const { genres } = useSelector((state: RootState) => state.genres);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getGenresAPI = async () => {
            const resp = await getGenres();
            dispatch(setGenres(resp.genres));
            setLoading(false);
        } 
        getGenresAPI();
    }, [])

    return (<div className={`fixed h-full duration-300 w-screen p-2 md:w-[250px] ${props.collapse ? "left-0 overflow-y-auto" : "-left-full md:-left-[250px]"}`}>
        {   loading ? <Skeleton /> :
            <div className="animate-opacity">
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
                            <div className="flex items-center gap-2" key={num}>
                                <button onClick={() => dispatch(changeStars(num))} className={`${starNum == num ? "bg-yellow-400 border-4 border-black" : "bg-black" } w-4 h-4 rounded-sm shadow-md duration-200`} />
                                <FaGreaterThanEqual /><Rating starNum={num} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <div className="flex gap-1 items-center text-red-500"><FaSort /><span className="font-bold">Sort by</span></div>
                    <div className="flex flex-col gap-2">
                        {sortCategories?.map((value, key) => (
                            <div className="flex items-center gap-2" key={key}>
                                <button onClick={() => dispatch(changeSort(value.id))} className={`${sortId == value.id ? "bg-yellow-400 border-4 border-black" : "bg-black" } w-4 h-4 rounded-sm shadow-md duration-200`}/>
                                <span className="text-sm font-bold">{value.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2 visible md:invisible">
                    <button onClick={() => props.setCollapse(false) } className="flex gap-2 items-center justify-center bg-black text-white py-2 font-bold rounded-3xl shadow-lg">
                        <BsArrowLeftCircleFill /> Close
                    </button>
                </div>
            </div>
        }
    </div>)
}

export default Filter;