"use client";

import { TbUserQuestion } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosClose } from "react-icons/io";
import { motion, AnimatePresence  } from "framer-motion"
import { Loading, Rating } from ".";
import { getMovieCasts, getMovieImages } from "@/utils";
import { initialState, movieStatesProps, setMovie } from "@/store/slice/movieSlice";
import { RootState } from "@/store";
import Image from "next/image";
import Poster from "./Poster";

interface Cast {
    id: number,
    name: string,
    character: string,
    profile_path: string,
    gender: number,
}

interface Image {
    file_path: string,
    height: number,
    width: number,
}

const Modal = () => {
    const dispatch = useDispatch();
    const movie: movieStatesProps = useSelector((state: RootState) => state.movie);
    const { genres } = useSelector((state: RootState) => state.genres);
    const [loading, setLoading] = useState<boolean>(true);
    const [casts, setCasts] = useState<Cast[]>();
    const [images, setImages] = useState<Image[]>();

    useEffect(() => {
        setLoading(true);
        document.body.classList.remove("overflow-y-hidden");
        if(movie.id > 0) {
            setLoading(false);
            document.body.classList.add("overflow-y-hidden");
            const getMovieCastsAPI = async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                const resp = await getMovieCasts(movie.id);
                setCasts(resp);
            }
            getMovieCastsAPI();

            const getMovieImagesAPI = async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                const resp = await getMovieImages(movie.id);
                setImages([ ...resp.backdrops, resp.posters ]);
            }
            getMovieImagesAPI();
        }
    }, [movie.id])

    return (<AnimatePresence>
        {   movie.id > 0 && 
        (<motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            className={`fixed w-screen h-screen bg-black/30 top-0 z-20 duration-200 overflow-y-auto overflow-x-hidden`}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }} 
                className={`pb-[15px] text-white absolute left-[5%] w-[calc(100vw-10%)] md:left-[calc(50%-266.5px)] md:w-[533px] z-20 top-[15px]`} id="modal">
                {   loading ? <div className={`flex items-center justify-center min-h-[calc(100vh-60px)]`}><Loading /></div> :
                    <div className="bg-black flex flex-col relative rounded-lg shadow-lg shadow-slate-950 min-h-screen">
                        <button onClick={() => { dispatch(setMovie(initialState)); setCasts([]); setImages([]) }} className="absolute right-2 top-2 bg-yellow-400 hover:bg-black hover:text-yellow-300 duration-200 w-fit text-black text-4xl sm:text-5xl rounded-full shadow-lg z-[100]"><IoIosClose /></button>
                        <Poster type="poster" width={533} height={300} className="rounded-t-md" poster_path={`${process.env.NEXT_PUBLIC_POSTER_API}w533_and_h300_bestv2/${movie.poster_path}`} />
                        <div className="flex flex-col py-2 px-4 gap-4">
                            <div className="flex justify-between  flex-col sm:flex-row gap-2 sm:gap-6">
                                <div>
                                    <div className="font-bold text-black text-sm sm:text-md flex flex-wrap gap-2">{
                                        movie.genre_ids.map((value) => 
                                            <div key={value} className="bg-white shadow-xl shadow-gray-700 px-3 rounded-sm">{genres.find(e => e.id == value)?.name}</div>
                                        )
                                    }</div>
                                    <div className="font-bold text-lg sm:text-3xl">{movie.title}</div>
                                    <div className="font-bold text-lg sm:text-xl text-slate-400">{movie.release_date}</div>
                                </div>
                                <div className="flex flex-col sm:items-end">
                                    <Rating starNum={Math.round(movie.vote_average/2)} />
                                    <div className="font-bold text-4xl sm:text-6xl">{movie.vote_average.toFixed(1)}</div>                        
                                </div>
                            </div>
                            <div className="text-sm sm:text-md">{movie.overview}</div>
                            <div className="flex gap-4 flex-col sm:flex-row">
                                <span className="text-2xl font-bold pt-2">Casts</span>
                                <div className="flex gap-3 overflow-x-auto overflow-y-hidden">
                                    {
                                        casts?.map((value: Cast, key: number) => (
                                            <motion.div 
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (key+1)/10 }}
                                                className="flex flex-col gap-1 pt-2 text-sm" 
                                                key={key}
                                            >
                                                {   value.profile_path ? 
                                                    <Poster type="media" width={138} height={175} className="rounded-md" poster_path={`${process.env.NEXT_PUBLIC_POSTER_API}w138_and_h175_face/${value.profile_path}`} /> :
                                                    <TbUserQuestion className="w-[100px] h-[126.8px]" />
                                                }
                                                <div className="text-slate-400 w-[100px]">{value.character}</div>
                                                <div className="font-bold w-[100px]">{value.name}</div>
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex gap-4 flex-col sm:flex-row">
                                <span className="text-2xl font-bold pt-2">Media</span>
                                <div className="flex gap-3 overflow-x-auto overflow-y-hidden">
                                    {
                                        images?.map((value: Image, key: number) => (
                                            <motion.div 
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (key+1)/10 }}
                                                className="w-[533px] h-[300px]"
                                                key={key} 
                                            >
                                                <Poster type="media" width={533} height={300} className="rounded-md" poster_path={`${process.env.NEXT_PUBLIC_POSTER_API}w1066_and_h600_face/${value.file_path}`} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </motion.div>
        </motion.div>)}
    </AnimatePresence>)
}

export default Modal;