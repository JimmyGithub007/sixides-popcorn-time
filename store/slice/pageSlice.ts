import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface pageStatesProps {
    loading: boolean,
}

const initialState: pageStatesProps = {
    loading: true,
};

export const windowSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = windowSlice.actions;
export default windowSlice.reducer;