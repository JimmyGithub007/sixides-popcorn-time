import { filterStatesProps } from "@/store/slice/filterSlice";
import { movieStatesProps } from "@/store/slice/movieSlice";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_MOVIE_API;

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

const getMovieCasts = async (id: number) => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_MOVIE_API}movie/${id}/credits`, options)
        const result = await resp.json();
        return result.cast;
    } catch (error) {
        console.error('Error fetching movie casts:', error);
        throw error;
    }
}

const getMoviesPerPage = async (props: movieAPIProps) => {
    const { page, genreIds, starNum, sortId } = props;
    try {
        const resp = await fetch(`${API_URL}discover/movie?page=${page}&language=en-US&with_genres=${genreIds.join("|")}&vote_average.gte=${starNum*2}.0&sort_by=${sortId}`, options)
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
} 

const getMovies = async (props: movieAPIProps) => {
    const totalPerPage = 20;
    const newTotalPerPage = 30;//make sure to get the movies with 30 per page not like orig 20 per page
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
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_MOVIE_API}genre/movie/list`, options)
        return await resp.json();
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
}

const getMovieImages = async (id: number) => {
    try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_MOVIE_API}movie/${id}/images`, options)
        return await resp.json();
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}

export {
    getMovies,
    getMovieCasts,
    getGenres,
    getMovieImages,
}