'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store";
import { getMovies } from "@/utils";
import { movieStatesProps, setMovie } from "@/store/slice/movieSlice";
import { Loading, Pagination, Rating } from ".";
import Image from "next/image";
import PageNotFound from "@/app/not-found";

type Props = {
    page: number
}

const Listing = (params: Props) => {
    const dispatch = useDispatch();

    const filterProps = useSelector((state: RootState) => state.filter);
    const { genres } = useSelector((state: RootState) => state.genres);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ movies, setMovies ] = useState<movieStatesProps[]>();
    const [ totalPages, setTotalPages ] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        const getMoviesAPI = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            const resp = await getMovies({ ...filterProps, page: params.page });
            if(resp?.success == false) {
                setMovies([]);
                setLoading(false);
            }
            setMovies(resp.results);
            setTotalPages(resp.total_pages);
            setLoading(false);
        } 
        getMoviesAPI();
    }, [filterProps, params.page])

    return (<div className="flex flex-col items-center w-full py-8 min-h-[calc(100vh-192px)] sm:min-h-[calc(100vh-272px)] justify-center">
        {   !loading ?
                movies ?
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {   
                        movies?.map((value: movieStatesProps, key:number) => 
                            <div key={value.id} className={`w-[150px] md:w-[220px] animate-opacity`}>
                                <Image alt={value.title} width={220} height={330} onClick={() => dispatch(setMovie({...value})) } className="cursor-pointer rounded-lg shadow-lg duration-300 hover:scale-105" src={`${process.env.NEXT_PUBLIC_POSTER_API}w220_and_h330_face/${value.poster_path}`} />
                                <div className="flex flex-col gap-1 pt-2">
                                    <div className="font-bold text-black text-sm sm:text-md flex flex-wrap gap-1 pb-2">{
                                        value.genre_ids.map((value2) => 
                                            <div key={value2} className="bg-black px-2 rounded-sm shadow-md text-white text-[0.6rem]">{genres.find(e => e.id == value2)?.name}</div>
                                        )
                                    }</div>
                                    <div className="flex gap-2 justify-between items-start">
                                        <div className="flex flex-col">
                                            <Rating starNum={Math.round(value.vote_average/2)} />
                                            <b className="text-sm sm:text-md">{value.title}</b>
                                            <span className="font-medium text-gray-500 text-xs">{value.release_date}</span>
                                        </div>
                                        <span className="font-bold text-lg sm:text-3xl">{value.vote_average.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div> : <PageNotFound page="listing" />
            : <Loading />
        }
        {  !loading && movies && <Pagination current_page={params.page} total_pages={totalPages} /> }
    </div>)
}

export default Listing;