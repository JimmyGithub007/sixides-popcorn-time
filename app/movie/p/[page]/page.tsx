"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Listing } from "@/components";
import { setMovies } from "@/store/slice/moviesSlice";
import { getMovies } from "@/utils";
import { useSearchParams } from "next/navigation";
import { setFilter, setSearch } from "@/store/slice/filterSlice";
import withHOC from "@/hoc/withHOC";

const MoviePage = ({ params }: { params: { page: number } }) => {
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword')

    const dispatch = useDispatch();
    const filterProps = useSelector((state: RootState) => state.filter);

    useEffect(() => {
        if(filterProps.isFilter || filterProps.isSearch) {
            dispatch(setMovies({ loading: true, movies: [], total_pages: 0, page: 1 }));
            const SearchMovieAPI =async () => {
                const resp = await getMovies({ ...filterProps, keyword: keyword, page: params.page });
                dispatch(setMovies({ loading: false, movies: resp.results, total_pages: resp.total_pages, page: params.page }));
                dispatch(setSearch(false));
                dispatch(setFilter(false));
            }
            SearchMovieAPI();
        }
    }, [filterProps.isFilter, filterProps.isSearch])

    useEffect(() => {
        dispatch(setSearch(true));
    }, [keyword])

    return (<Listing />)
}

export default withHOC(MoviePage);