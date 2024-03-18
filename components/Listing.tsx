'use client';

import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineFavorite } from "react-icons/md";
import { motion } from "framer-motion"
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { RootState } from "@/store";
import { movieStatesProps, setMovie } from "@/store/slice/movieSlice";
import { db } from '@/app/firebase/config';
import { setWatchList } from '@/store/slice/userSlice';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Loading = dynamic(() => import('./Loading'));
const Rating = dynamic(() => import('./Rating'));
const Pagination = dynamic(() => import('./Pagination'));
const PageNotFound = dynamic(() => import('@/app/not-found'));

const Listing = () => {
    const dispatch = useDispatch();

    const { genres } = useSelector((state: RootState) => state.genres);
    const { openSearchBar } = useSelector((state: RootState) => state.filter);
    const { uid, movies_ids } = useSelector((state: RootState) => state.user);
    const { movies, loading } = useSelector((state: RootState) => state.movies);

    const saveMovieToWatchListAPI = async (mid: number) => {
        const userProfileQuery = await getDocs(query(collection(db, "user_profiles"), where("uid", "==", uid)));
        userProfileQuery.forEach(async (doc) => {
            try {
                let movies_ids_arr: number[] = [];
                if(movies_ids) {
                    if(!movies_ids.includes(mid)){ movies_ids_arr = [...movies_ids, mid]; }
                    else { movies_ids_arr = movies_ids.filter(e => e != mid); }
                } else {
                    movies_ids_arr.push(mid);
                }
                dispatch(setWatchList(movies_ids_arr));

                await updateDoc(doc.ref, {
                    movies_ids: movies_ids_arr
                })
            } catch (error) {
                console.log(error)
            }
        })
    }

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
            key={key} className={`relative w-[150px] md:w-[160px] lg:w-[180px] xl:w-[200px]`}
        >
            <Image alt={value.title} width={220} height={330} onClick={() => dispatch(setMovie({ ...value }))} className="cursor-pointer rounded-lg shadow-lg duration-300 hover:scale-105" src={`${process.env.NEXT_PUBLIC_POSTER_API}w220_and_h330_face/${value.poster_path}`} />
            { uid != "" && <button onClick={() => saveMovieToWatchListAPI(value.id) } className={`absolute duration-200 top-2 right-2 ${movies_ids?.includes(value.id) ? "text-3xl text-yellow-400" : "text-2xl text-white"}`}><MdOutlineFavorite /></button> }
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

    return (<div className={`${openSearchBar ? "pt-16" : "pt-8"} duration-300 flex flex-col items-center w-full pb-8 min-h-[calc(100vh-174px)] sm:min-h-[calc(100vh-256px)] justify-center`}>
        {   !loading ?
                movies.length > 0 ?
                <div className="grid gap-2 md:gap-3 lg:gap-4 xl:gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                    {   gridDiv(2, 15, "flex md:hidden", movies)    }
                    {   gridDiv(3, 10, "hidden md:flex xl:hidden", movies)    }
                    {   gridDiv(5, 6, "hidden xl:flex", movies)    }
                </div> : <PageNotFound page="listing" />
            : <Loading />
        }
        {  (!loading && movies.length > 0) && <Pagination /> }
    </div>)
}

export default Listing;