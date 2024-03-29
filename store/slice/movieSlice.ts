import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface movieStatesProps {
    id: number,
    title: string,
    original_title: string,
    poster_path: string,
    release_date: string,
    vote_average: number,
    overview: string,
    genre_ids: number[]
}

export const initialState: movieStatesProps = {
    id: 0,
    title: "",
    original_title: "",
    poster_path: "",
    release_date: "",
    vote_average: 0,
    overview: "",
    genre_ids: []
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setMovie: (state, action: PayloadAction<movieStatesProps>) => {
            state.id = action.payload.id;
            state.title = action.payload.title;
            state.original_title = action.payload.original_title;
            state.poster_path = action.payload.poster_path;
            state.release_date = action.payload.release_date;
            state.vote_average = action.payload.vote_average;
            state.overview = action.payload.overview;
            state.genre_ids = action.payload.genre_ids;
        },
    },
});

export const { setMovie } = movieSlice.actions;
export default movieSlice.reducer;