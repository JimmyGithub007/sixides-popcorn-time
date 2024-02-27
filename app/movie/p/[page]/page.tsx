'use client';

import { Header, Filter, Listing, Footer, Modal } from "@/components";

const MoviePage = ({ params }: { params: { page: number } }) => {
    return (<Listing page={params.page} />)
}

export default MoviePage;