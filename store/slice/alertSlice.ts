import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface alertStatesProps {
    show?: boolean;
    message: string;
    type: string;
}

const initialState: alertStatesProps = {
    show: false,
    message: "",
    type: "success"
};

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setShow: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload;
        },
        setAlert: (state, action: PayloadAction<alertStatesProps>) => {
            state.show = true;
            state.message = action.payload.message; 
            state.type = action.payload.type; 
        },
    },
});

export const { setAlert, setShow } = alertSlice.actions;
export default alertSlice.reducer;
