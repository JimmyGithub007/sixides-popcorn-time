"use client";

import { useEffect, useState } from "react";
import { RiMovie2Line, RiArrowGoBackLine } from "react-icons/ri";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "@/utils";
import { setMovie } from "@/store/slice/movieSlice";
import { motion } from "framer-motion"
import { setLoading } from "@/store/slice/pageSlice";
import { useRouter } from "next/navigation";
import { RootShell } from "@/components";
import Image from "next/image";
import withHOC from "@/hoc/withHOC";

const MovieCard = ({ num, mid }: { num: number, mid: number }) => {
    const dispatch = useDispatch();
    const [watchListMovie, setWatchListMovie] = useState<any>();

    useEffect(() => {
        const getMovieAPI = async () => {
            const resp = await getMovie(mid);
            console.log(resp)
            setWatchListMovie(resp);
        }
        getMovieAPI();
    }, [])

    return <motion.div
        initial={{
            opacity: 0,
            y: 50,
        }}
        whileInView={{
            opacity: 1,
            y: 0,
            rotate: -0.4,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
                delay: (num + 1) / 30
            }
        }}
        viewport={{ once: true }}
        className={`relative w-[120px] md:w-[140px] lg:w-[160px] xl:w-[180px]`}
    >
        <Image onClick={() => dispatch(setMovie({
            id: mid,
            title: watchListMovie?.title || "",
            original_title: watchListMovie?.original_title || "",
            poster_path: watchListMovie?.poster_path || "",
            release_date: watchListMovie?.release_date || "",
            vote_average: watchListMovie?.vote_average || 0,
            overview: watchListMovie?.overview || "",
            genre_ids: watchListMovie?.genres.map((e: any) => e.id) || []
        }))} alt={watchListMovie?.title || ""} width={220} height={330} className="cursor-pointer rounded-lg shadow-lg duration-300 hover:scale-105" src={`${process.env.NEXT_PUBLIC_POSTER_API}w220_and_h330_face/${watchListMovie?.poster_path}`} />
    </motion.div>
}

const WatchList = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { movies_ids } = useSelector((state: RootState) => state.user);

    return (<RootShell>
        <div className="flex flex-col gap-4 sm:flex-row">
            <div className="sm:fixed bg-slate-50 flex justify-center gap-3 p-4 sm:flex-col sm:w-[250px] sm:h-screen">
                <RiMovie2Line className="bg-yellow-400 p-1 rounded-full shadow-lg text-3xl sm:text-6xl" />
                <h1 className="font-bold text-lg sm:text-3xl">My Watchlist</h1>
                <button onClick={() => {
                    dispatch(setLoading(true));
                    router.push("/movie?page=1");
                }} type="button" className="bg-black flex font-bold gap-2 items-center shadow-lg text-yellow-400 text-md px-3 py-1 rounded-sm">
                    <RiArrowGoBackLine /> BACK TO MOVIES
                </button>
            </div>
            <div className="ml-0 sm:ml-[250px] flex items-start sm:items-center justify-center w-full min-h-[calc(100vh-80px)] sm:min-h-screen p-4">
                {movies_ids ?
                    <div className="flex flex-wrap gap-2">
                        {
                            movies_ids?.map((value, key) => (
                                <MovieCard num={key} key={key} mid={value} />
                            ))
                        }
                    </div>
                    : <h1 className="font-bold text-yellow-400 text-2xl">Not movie been found in watchlist!</h1>
                }
            </div>
        </div>
    </RootShell>)
}

export default withHOC(WatchList);