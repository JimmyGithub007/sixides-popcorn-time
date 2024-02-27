import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface filterStatesProps {
    genreIds: number[],
    starNum: number,
    sortId: string,
}

const initialState: filterStatesProps = {
    genreIds: [],
    starNum: 1,
    sortId: 'popularity.desc',
};

export const placesSlice = createSlice({
    name: "places",
    initialState,
    reducers: {
        changeGenreId: (state, action: PayloadAction<number>) => {
            if(!state.genreIds.includes(action.payload)){ state.genreIds = [...state.genreIds, action.payload] ;}
            else { state.genreIds = state.genreIds.filter(e => e != action.payload); }
        },
        changeStars: (state, action: PayloadAction<number>) => {
            state.starNum = action.payload;
        },
        changeSort: (state, action: PayloadAction<string>) => {
            state.sortId = action.payload;
        },
    },
});

export const { changeGenreId, changeStars, changeSort } = placesSlice.actions;
export default placesSlice.reducer;