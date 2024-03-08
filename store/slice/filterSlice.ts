import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface filterStatesProps {
    genreIds: number[],
    startScore: number,
    endScore: number,
    sortId: string,
    isSearch: boolean,
    loading: boolean,
}

const initialState: filterStatesProps = {
    genreIds: [],
    startScore: 0,
    endScore: 10,
    sortId: "popularity.desc",
    isSearch: false,
    loading: true,
};

if (typeof window !== 'undefined' && window.localStorage) {
    const storedGenreIds = localStorage.getItem('genreIds');
    if(storedGenreIds) initialState.genreIds = JSON.parse(storedGenreIds);

    const storedStarScore = localStorage.getItem('startScore');
    if(storedStarScore) initialState.startScore = JSON.parse(storedStarScore);

    const storedEndScore = localStorage.getItem('endScore');
    if(storedEndScore) initialState.endScore = JSON.parse(storedEndScore);

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
        },
        changeStartScore: (state, action: PayloadAction<number>) => {
            state.startScore = action.payload;
        },
        changeEndScore: (state, action: PayloadAction<number>) => {
            state.endScore = action.payload;
        },
        changeSort: (state, action: PayloadAction<string>) => {
            state.sortId = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setSearch: (state, action: PayloadAction<boolean>) => {
            state.isSearch = action.payload;
            localStorage.setItem('genreIds', JSON.stringify(state.genreIds));
            localStorage.setItem('startScore', JSON.stringify(state.startScore));
            localStorage.setItem('endScore', JSON.stringify(state.endScore));
            localStorage.setItem('sortId', JSON.stringify(state.sortId));
        },
    },
});

export const { changeGenreId, changeStartScore, changeEndScore, changeSort, setSearch, setLoading } = filterSlice.actions;
export default filterSlice.reducer;