'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion"
import { RootState } from "@/store";
import { movieStatesProps, setMovie } from "@/store/slice/movieSlice";
import { setLoading, setSearch } from "@/store/slice/filterSlice";
import { setCollapse } from "@/store/slice/windowSlice";
import { getMovies } from "@/utils";
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
    const [ movies, setMovies ] = useState<movieStatesProps[]>();
    const [ totalPages, setTotalPages ] = useState<number>(0);

    useEffect(() => {
        if(filterProps.isSearch) {
            dispatch(setLoading(true));
            const getMoviesAPI = async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                const resp = await getMovies({ ...filterProps, page: params.page });
                if(resp?.success == false) {
                    setMovies([]);
                    dispatch(setLoading(false));
                }
                setMovies(resp.results);
                setTotalPages(resp.total_pages);
                dispatch(setLoading(false));
                dispatch(setSearch(false));
                if(window.innerWidth < 768) dispatch(setCollapse(false));
            } 
            getMoviesAPI();
        }
    }, [filterProps.isSearch, params.page])

    useEffect(() => {
        dispatch(setSearch(true));
    }, [])

    const MovieDiv = (value: movieStatesProps, key: number) => {
        return <motion.div
            initial={{
                opacity: 0,
                y: 50,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                rotate: -1,
                transition: {
                    type: "spring",
                    bounce: 0.4,
                    duration: 0.8,
                    delay: (key + 1) / 30
                }
            }}
            viewport={{ once: true }}
            key={key} className={`w-[150px] md:w-[160px] lg:w-[180px] xl:w-[200px]`}
        >
            <Image alt={value.title} width={220} height={330} onClick={() => dispatch(setMovie({ ...value }))} className="cursor-pointer rounded-lg shadow-lg duration-300 hover:scale-105" src={`${process.env.NEXT_PUBLIC_POSTER_API}w220_and_h330_face/${value.poster_path}`} />
            <div className="flex flex-col gap-1 pt-2">
                <div className="font-bold text-black text-sm sm:text-md flex flex-wrap gap-1 pb-2">{
                    value.genre_ids.map((value2) =>
                        <div key={value2} className="bg-black px-2 rounded-sm shadow-md text-white text-[0.6rem]">{genres.find(e => e.id == value2)?.name}</div>
                    )
                }</div>
                <div className="flex gap-2 justify-between items-start">
                    <div className="flex flex-col">
                        <Rating starNum={Math.round(value.vote_average / 2)} />
                        <b className="text-sm sm:text-md">{value.title}</b>
                        <span className="font-medium text-gray-500 text-xs md:text-sm">{value.release_date}</span>
                    </div>
                    <span className="font-bold text-lg md:text-2xl lg:text-3xl">{value.vote_average.toFixed(1)}</span>
                </div>
            </div>
        </motion.div>
    }

    const gridDiv = (l1: number, l2: number, className: string, movies: movieStatesProps[]) => {
        return Array.from({ length: l1 }, () => []).map((arr: number[], key: number) => (
            arr = Array.from({ length: l2 }, (_, index) => (index*l1)+key)
        )).map((arr: number[], key: number) => (
            <div key={key} className={`flex-col gap-2 ${className}`}>
                {   
                    movies.filter((_, index) => arr.includes(index))?.map((value: movieStatesProps, key:number) => 
                        MovieDiv(value, key)
                    )
                }
            </div>                                
        ))
    }

    return (<div className="flex flex-col items-center w-full py-8 min-h-[calc(100vh-174px)] sm:min-h-[calc(100vh-256px)] justify-center">
        {   !filterProps.loading ?
                movies ?
                <div className="grid gap-2 md:gap-3 lg:gap-4 xl:gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                    {   gridDiv(2, 15, "flex md:hidden", movies)    }
                    {   gridDiv(3, 10, "hidden md:flex xl:hidden", movies)    }
                    {   gridDiv(5, 6, "hidden xl:flex", movies)    }
                </div> : <PageNotFound page="listing" />
            : <Loading />
        }
        {  !filterProps.loading && movies && <Pagination current_page={params.page} total_pages={totalPages} /> }
    </div>)
}

export default Listing;