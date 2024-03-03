import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface filterStatesProps {
    genreIds: number[],
    starNum: number,
    sortId: string,
}

const initialState: filterStatesProps = {
    genreIds: [],
    starNum: 1,
    sortId: "popularity.desc",
};

if (typeof window !== 'undefined' && window.localStorage) {
    const storedGenreIds = localStorage.getItem('genreIds');
    if(storedGenreIds) initialState.genreIds = JSON.parse(storedGenreIds);

    const storedStarNum = localStorage.getItem('starNum');
    if(storedStarNum) initialState.starNum = JSON.parse(storedStarNum);

    const storedSortId = localStorage.getItem('sortId');
    if(storedSortId) initialState.sortId = JSON.parse(storedSortId);
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeGenreId: (state, action: PayloadAction<number>) => {
            if(!state.genreIds.includes(action.payload)){ state.genreIds = [...state.genreIds, action.payload] ;}
            else { state.genreIds = state.genreIds.filter(e => e != action.payload); }
            localStorage.setItem('genreIds', JSON.stringify(state.genreIds));
        },
        changeStars: (state, action: PayloadAction<number>) => {
            state.starNum = action.payload;
            localStorage.setItem('starNum', JSON.stringify(state.starNum));
        },
        changeSort: (state, action: PayloadAction<string>) => {
            state.sortId = action.payload;
            localStorage.setItem('sortId', JSON.stringify(state.sortId));
        },
    },
});

export const { changeGenreId, changeStars, changeSort } = filterSlice.actions;
export default filterSlice.reducer;