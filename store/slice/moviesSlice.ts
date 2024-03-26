import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { movieStatesProps } from "./movieSlice";

interface moviesStatesProps {
    loading: boolean,
    movies: movieStatesProps[],
    total_pages: number,
    page: number,
}

const initialState: moviesStatesProps = {
    loading: true,
    movies: [],
    total_pages: 0,
    page: 1,
};
export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<moviesStatesProps>) => {
            state.loading = action.payload.loading;
            state.movies = action.payload.movies;
            state.total_pages = action.payload.total_pages;
            state.page = action.payload.page;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setMovies, setLoading } = moviesSlice.actions;
export default moviesSlice.reducer;