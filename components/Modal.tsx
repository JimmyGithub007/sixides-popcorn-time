"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosClose } from "react-icons/io";
import { Loading, Rating } from ".";
import { getMovieCasts } from "@/utils";
import { initialState, movieStatesProps, setMovie } from "@/store/slice/movieSlice";
import { RootState } from "@/store";

interface Cast {
    id: number,
    name: string,
    character: string,
    profile_path: string,
    gender: number,
}

const Modal = () => {
    const dispatch = useDispatch();
    const movie: movieStatesProps = useSelector((state: RootState) => state.movie);
    const [loading, setLoading] = useState<boolean>(true);
    const [casts, setCasts] = useState<Cast[]>();

    useEffect(() => {
        setLoading(true);
        document.body.classList.remove("overflow-y-hidden");
        if(movie.id > 0) {
            document.body.classList.add("overflow-y-hidden");
            const getMovieCastsAPI = async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                const resp = await getMovieCasts(movie.id);
                console.log(resp)
                setCasts(resp);
                setLoading(false);
            }
            getMovieCastsAPI();
        }
    }, [movie.id])

    return (<div className={`${movie.id > 0 ? "opacity-100 visible" : "opacity-0 invisible"} fixed w-screen h-screen bg-black/30 top-0 z-20 duration-200 overflow-y-auto`}>
        <div className={`bg-black duration-300 text-white absolute rounded-lg shadow-lg shadow-slate-950 left-[5%] w-[calc(100vw-10%)] md:left-[25%] md:w-[calc(100vw-50%)] min-h-[calc(100vh-30px)] z-20 top-[15px]`} id="modal">
            {   loading ? <div className={`flex items-center justify-center min-h-[calc(100vh-60px)]`}><Loading /></div> :
                <div className="flex flex-col relative animate-opacity">
                    <button onClick={() => dispatch(setMovie(initialState)) } className="absolute right-2 top-2 bg-yellow-400 hover:bg-black hover:text-yellow-300 duration-200 w-fit text-black text-5xl rounded-full shadow-lg"><IoIosClose /></button>
                    <img className="rounded-t-md" src={`${process.env.NEXT_PUBLIC_POSTER_API}w533_and_h300_bestv2/${movie.poster_path}`} />
                    <div className="flex flex-col py-2 px-4 gap-4">
                        <div className="flex justify-between">
                            <div>
                                <div className="font-bold text-3xl">{movie.original_title}</div>
                                <div className="font-bold text-lg">Action | Drama</div>
                                <div className="font-bold text-2xl">{movie.release_date}</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <Rating starNum={Math.round(movie.vote_average/2)} />
                                <div className="font-bold text-6xl">{movie.vote_average.toFixed(2)}</div>                        
                            </div>
                        </div>
                        <div className="">{movie.overview}</div>
                        <div className="flex gap-4">
                            <span className="text-2xl font-bold pt-2">Casts</span>
                            <div className="flex gap-3 overflow-x-auto">
                                {
                                    casts?.map(value => (
                                        <div className="flex flex-col gap-1 pt-2 text-sm" key={value.id}>
                                            <img className="rounded-md shadow-lg shadow-slate-800" src={`${process.env.NEXT_PUBLIC_POSTER_API}w138_and_h175_face/${value.profile_path}`} />
                                            <div className="text-slate-400 w-[100px]">{value.character}</div>
                                            <div className="font-bold w-[100px]">{value.name}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>)
}

export default Modal;