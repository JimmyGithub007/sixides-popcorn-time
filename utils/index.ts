const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_MOVIE_API;

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

const getMovies = async (page: number, genreIds: number[], starNum: number, sortId: string) => {
    try {
        console.log(starNum)
        const resp = await fetch(`${API_URL}discover/movie?page=${page}&with_genres=${genreIds.join("|")}&vote_average.gte=${starNum*2}.0&sort_by=${sortId}`, options)
        console.log(genreIds)
        return await resp.json();
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
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

export {
    getMovies,
    getMovieCasts,
    getGenres,
}