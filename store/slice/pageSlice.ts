import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface pageStatesProps {
    loading: boolean,
}

const initialState: pageStatesProps = {
    loading: true,
};

export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = pageSlice.actions;
export default pageSlice.reducer;