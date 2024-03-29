import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userStatesProps {
    uid: string,
    username: string,
    email: string,
    language?: string,
    country?: string,
    movies_ids?: number[],
    keywords?: string[]
}

export const initialState: userStatesProps = {
    uid: "",
    username: "",
    email: "",
    language: "",
    country: "",
    movies_ids: [],
    keywords: []
};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userStatesProps>) => {
            state.uid = action.payload.uid;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.language = action.payload.language;
            state.country = action.payload.country;
        },
        setWatchList: (state, action: PayloadAction<number[]>) => {
            state.movies_ids = action.payload
        },
        setKeywords: (state, action: PayloadAction<string[]>) => {
            state.keywords = action.payload
        },
    },
});

export const { setUser, setWatchList, setKeywords } = userSlice.actions;
export default userSlice.reducer;