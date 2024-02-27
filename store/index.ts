import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "./slice/placeSlice";

const store = configureStore({
    reducer: {
        places: placesReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;