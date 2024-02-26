const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_MOVIE_API;

const options = {
    method: "GET",
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    },
}

const getMovies = async (page: number) => {
    try {
        const resp = await fetch(`${API_URL}movie/popular?page=${page}`, options)
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
    getGenres
}