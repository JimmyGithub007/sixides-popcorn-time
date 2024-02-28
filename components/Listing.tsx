'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store";
import { getMovies } from "@/utils";
import { movieStatesProps, setMovie } from "@/store/slice/movieSlice";
import { Loading, Pagination, Rating } from ".";

type Props = {
    page: number
}

const Listing = (params: Props) => {
    const dispatch = useDispatch();

    const { genreIds, starNum, sortId } = useSelector((state: RootState) => state.filter);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ movies, setMovies ] = useState<movieStatesProps[]>();
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
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {
                    movies?.map((value: movieStatesProps, key:number) => 
                        <div key={value.id} className={`w-[220px] animate-opacity`}>
                            <img onClick={() => dispatch(setMovie({...value})) } className="cursor-pointer rounded-lg shadow-lg hover:scale-105 duration-300" src={`${process.env.NEXT_PUBLIC_POSTER_API}w220_and_h330_face/${value.poster_path}`} />
                            <div className="flex flex-col gap-[1px] pt-2">
                                <Rating starNum={Math.round(value.vote_average/2)} />
                                <b>{value.original_title}</b>
                                <span className="text-gray-500 font-medium text-sm">Release Date: {value.release_date}</span>
                            </div>
                        </div>
                    )
                }
            </div> :
            <Loading />
        }
        {  !loading && movies && <Pagination current_page={params.page} total_pages={totalPages} /> }
    </div>)
}

export default Listing;