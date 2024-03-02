import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slice/filterSlice";
import movieReducer from "./slice/movieSlice";
import genresReducer from "./slice/genresSlice";
import windowSlice from "./slice/windowSlice";

const store = configureStore({
    reducer: {
        filter: filterReducer,
        movie: movieReducer,
        genres: genresReducer,
        window: windowSlice

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;