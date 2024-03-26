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
import Shell from "@/components/Shell";

const MoviePage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const page = searchParams.get('page');
  const pageNumber = page ? parseInt(page) : 1;

  const dispatch = useDispatch();
  const filterProps = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    dispatch(setMovies({ loading: true, movies: [], total_pages: 0, page: pageNumber }));
    const SearchMovieAPI = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const resp = await getMovies({ ...filterProps, keyword: keyword, page: pageNumber });
      dispatch(setMovies({ loading: false, movies: resp.results, total_pages: resp.total_pages, page: pageNumber }));
      dispatch(setFilter(false));
    }
    SearchMovieAPI();
  }, [filterProps.isFilter, pageNumber, keyword])

  return (<Shell>
    <Listing />
  </Shell>)
}

export default withHOC(MoviePage);