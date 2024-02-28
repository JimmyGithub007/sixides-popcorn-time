import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slice/filterSlice";
import movieReducer from "./slice/movieSlice";

const store = configureStore({
    reducer: {
        filter: filterReducer,
        movie: movieReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;