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

const Listing = async (params: Props) => {
    const resp = await getMovies(params.page);
    const movies: Movie[] = resp.results;
    return (<div className="flex flex-col items-center w-full">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
                movies.map((value) => 
                    <div key={value.id} className="w-[220px]">
                        <img className="cursor-pointer rounded-sm shadow-lg hover:scale-105 duration-300" src={`${process.env.NEXT_PUBLIC_POSTER_API}w220_and_h330_face/${value.poster_path}`} />
                        <div className="flex flex-col gap-[1px] pt-2">
                            <Rating starNum={Math.round(value.vote_average/2)} />
                            <b>{value.original_title}</b>
                            <span className="text-gray-500 font-medium text-sm">Release Date: {value.release_date}</span>
                        </div>
                    </div>
                )
            }
        </div>
        <Pagination current_page={params.page} total_pages={resp.total_pages} />
    </div>)
}

export default Listing;