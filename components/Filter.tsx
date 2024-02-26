import { getGenres } from "@/utils";
import Rating from "./Rating";

interface Genres {
    id: number,
    name: string,
}

const Filter = async () => {
    const resp = await getGenres();
    const genres: Genres[] = resp.genres;

    return (<div className="flex flex-col gap-4 w-64">
        <div className="flex flex-col gap-2 p-2 rounded-md">
            <span className="font-bold">Genres:</span>
            <div className="flex flex-wrap gap-2">
                {
                    genres.map((value) => 
                        <button className="bg-black text-white px-2 py-1 text-xs rounded-sm shadow-md font-bold" key={value.id}>{value.name}</button>
                    )
                }
            </div>
        </div>
        <div className="flex flex-col gap-2 p-2 rounded-md">
            <span className="font-bold">Rating:</span>
            <div className="flex flex-col gap-4">
                {[1, 2, 3, 4, 5].map((num) => (
                    <div className="flex items-center gap-2" key={num}>
                        <button className="w-4 h-4 bg-black rounded-sm shadow-md" />
                        <Rating starNum={num} />
                    </div>
                ))}
            </div>
        </div>
    </div>)
}

export default Filter;