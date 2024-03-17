import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slice/filterSlice";
import movieReducer from "./slice/movieSlice";
import moviesReducer from "./slice/moviesSlice";
import genresReducer from "./slice/genresSlice";
import windowReducer from "./slice/windowSlice";
import pageReducer from "./slice/pageSlice";
import userReducer from "./slice/userSlice";

const store = configureStore({
    reducer: {
        filter: filterReducer,
        movie: movieReducer,
        movies: moviesReducer,
        genres: genresReducer,
        window: windowReducer,
        page: pageReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;