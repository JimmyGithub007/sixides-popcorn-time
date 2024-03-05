import { filterStatesProps } from "@/store/slice/filterSlice";
import { movieStatesProps } from "@/store/slice/movieSlice";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_MOVIE_API;
const totalPerPage = 20;
const newTotalPerPage = 30;//make sure to get the movies with 30 per page not like orig 20 per page

interface movieAPIProps extends filterStatesProps {
    page: number
}

const options = {
    method: "GET",
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    },
}

const fetchJSON = async (url: string) => {
    try {
        const resp = await fetch(url, options);
        return await resp.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
    }
}

const getMovieCasts = async (id: number) => {
    return (await fetchJSON(`${API_URL}movie/${id}/credits`)).cast;
}

const getMoviesPerPage = async ({ page, genreIds, starNum, sortId }: movieAPIProps) => {
    const url = `${API_URL}discover/movie?page=${page}&language=en-US&with_genres=${genreIds.join("|")}&vote_average.gte=${starNum*2}.0&sort_by=${sortId}`;
    return await fetchJSON(url);
}

const getMovies = async (props: movieAPIProps) => {
    const { page } = props;
    const resp = await getMoviesPerPage({...props, page: 1});
    let newPage: number = page*(resp.total_pages/(resp.total_pages*totalPerPage/newTotalPerPage));//cal return the new page number if want 30 per page
    let secondPage: number = newPage;
    let movies: movieStatesProps[];
    if(!!(newPage % 1)) { 
        newPage = Math.trunc(newPage);
        secondPage = Math.trunc(newPage+1);
        const resp1 = await getMoviesPerPage({...props, page: newPage});
        const resp2 = await getMoviesPerPage({...props, page: secondPage});

        const nextPageMovies = resp2.results.slice(0, 10);
        movies = resp1.results.concat(nextPageMovies);
    }
    else { 
        secondPage-=1; 
        const resp1 = await getMoviesPerPage({...props, page: secondPage});
        const resp2 = await getMoviesPerPage({...props, page: newPage});

        const previousPageMovies = resp1.results.slice(10);
        movies = previousPageMovies.concat(resp2.results);
    }

    return {
        "success": true,
        "results": movies,
        "total_pages": Math.ceil(resp.total_pages*totalPerPage/newTotalPerPage),
    }
}

const getGenres = async () => {
    return await fetchJSON(`${API_URL}genre/movie/list`);
}

const getMovieImages = async (id: number) => {
    return await fetchJSON(`${API_URL}movie/${id}/images`);
}

export {
    getMovies,
    getMovieCasts,
    getGenres,
    getMovieImages,
}