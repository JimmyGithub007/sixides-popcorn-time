import { filterStatesProps } from "@/store/slice/filterSlice";
import { movieStatesProps } from "@/store/slice/movieSlice";
import moment from "moment";

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

const searhMovie = async ({ page, keyword }: movieAPIProps) => {//get movies listing by search keyword
    const url = `${API_URL}search/movie?query=${keyword}&page=${page}`;
    return await fetchJSON(url);
}

const getMoviesPerPage = async ({ page, genreIds, startScore, endScore, sortId }: movieAPIProps) => {//get movies listing by filter
    const max_date = moment().add(1, 'days').format("YYYY-MM-DD");
    const min_date = moment().subtract(2, 'months').format("YYYY-MM-DD");
    
    const url = `${API_URL}discover/movie?region=MY&include_adult=false&include_video=false&language=en-US&with_release_type=2|3&page=${page}&release_date.gte=${min_date}&release_date.lte=${max_date}&with_genres=${genreIds.join(",")}&vote_average.gte=${startScore}&vote_average.lte=${endScore}&sort_by=${sortId}`;
    return await fetchJSON(url);
}

const getMovie = async (id: number) => {
    return await fetchJSON(`${API_URL}movie/${id}`);
}

const getMovies = async (props: movieAPIProps) => {
    const { page, keyword } = props;
    const hasKeyword = !!keyword;
    const resp =  hasKeyword ? await searhMovie({...props, page: 1}) : await getMoviesPerPage({...props, page: 1});
    let newPage: number = page*(resp.total_pages/(resp.total_pages*totalPerPage/newTotalPerPage));//cal return the new page number if want 30 per page
    let secondPage: number = newPage;
    let movies: movieStatesProps[];
    if(!!(newPage % 1)) { 
        newPage = Math.trunc(newPage);
        secondPage = Math.trunc(newPage+1);
        const resp1 = hasKeyword ? await searhMovie({...props, page: newPage}) : await getMoviesPerPage({...props, page: newPage});
        const resp2 = hasKeyword ? await searhMovie({...props, page: secondPage}) : await getMoviesPerPage({...props, page: secondPage});

        const nextPageMovies = resp2.results.slice(0, 10);
        movies = resp1.results.concat(nextPageMovies);
    }
    else { 
        secondPage-=1; 
        const resp1 = hasKeyword ? await searhMovie({...props, page: secondPage}) : await getMoviesPerPage({...props, page: secondPage});
        const resp2 = hasKeyword ? await searhMovie({...props, page: newPage}) : await getMoviesPerPage({...props, page: newPage});

        const previousPageMovies = resp1.results.slice(10);
        movies = previousPageMovies.concat(resp2.results);
    }

    return {
        "success": true,
        "results": movies,
        "total_pages": Math.ceil(resp.total_results/newTotalPerPage),
    }
}

const getMovieCasts = async (id: number) => {
    return (await fetchJSON(`${API_URL}movie/${id}/credits`)).cast;
}

const getGenres = async () => {
    return await fetchJSON(`${API_URL}genre/movie/list`);
}

const getMovieImages = async (id: number) => {
    return await fetchJSON(`${API_URL}movie/${id}/images`);
}

export {
    getMovie,
    getMovies,
    getMovieCasts,
    getGenres,
    getMovieImages,
}