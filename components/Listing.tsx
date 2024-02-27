'use client';

import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "@/store";
import { getMovies } from "@/utils";
import Pagination from "./Pagination";
import Rating from "./Rating";

interface Movie {
    id: number,
    original_title: string,
    poster_path: string,
    release_date: string,
    vote_average: number
}

type Props = {
    page: number
}

const Listing = (params: Props) => {
    const { genreIds, starNum, sortId } = useSelector((state: RootState) => state.places);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ movies, setMovies ] = useState<Movie[]>();
    const [ totalPages, setTotalPages ] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        const getMoviesAPI = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            const resp = await getMovies(params.page, genreIds, starNum, sortId);
            setMovies(resp.results);
            setTotalPages(resp.total_pages);
            setLoading(false);
        } 
        getMoviesAPI();
    }, [params.page, genreIds, starNum, sortId])

    return (<div className="flex flex-col items-center w-full py-8 min-h-[calc(100vh-272px)] justify-center">
        {   !loading && movies ?
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {
                    movies?.map((value: Movie, key:number) => 
                        <div key={value.id} className={`w-[220px] animate-opacity`}>
                            <img className="cursor-pointer rounded-lg shadow-lg hover:scale-105 duration-300" src={`${process.env.NEXT_PUBLIC_POSTER_API}w220_and_h330_face/${value.poster_path}`} />
                            <div className="flex flex-col gap-[1px] pt-2">
                                <Rating starNum={Math.round(value.vote_average/2)} />
                                <b>{value.original_title}</b>
                                <span className="text-gray-500 font-medium text-sm">Release Date: {value.release_date}</span>
                            </div>
                        </div>
                    )
                }
            </div> :
            <div className="flex gap-4 items-center">
                <div className="relative inline-flex">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full absolute top-0 left-0 animate-ping"></div>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full absolute top-0 left-0 animate-pulse"></div>
                </div>
                <h1 className="text-yellow-400 text-3xl"><b>LOADING</b></h1>
            </div>
        }
        {  !loading && movies && <Pagination current_page={params.page} total_pages={totalPages} /> }
    </div>)
}

export default Listing;