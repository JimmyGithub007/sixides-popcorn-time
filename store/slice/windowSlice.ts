import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface windowStatesProps {
    collapse: boolean,
    scrollY: number,
}

const initialState: windowStatesProps = {
    collapse: true,
    scrollY: 0,
};

export const windowSlice = createSlice({
    name: "window",
    initialState,
    reducers: {
        setCollapse: (state, action: PayloadAction<boolean>) => {
            state.collapse = action.payload;
        }, 
        setScrollY: (state, action: PayloadAction<number>) => {
            state.scrollY = action.payload;
        },
    },
});

export const { setCollapse, setScrollY } = windowSlice.actions;
export default windowSlice.reducer;