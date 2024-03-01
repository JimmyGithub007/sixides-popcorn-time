import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface genresStatesProps {
    id: number,
    name: string,
}

const initialState = {
    genres: [] as genresStatesProps[]
};

export const genresSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {
        setGenres: (state, action: PayloadAction<genresStatesProps[]>) => {
            state.genres = action.payload;
        },
    },
});

export const { setGenres } = genresSlice.actions;
export default genresSlice.reducer;