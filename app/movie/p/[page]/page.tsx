"use client";

import { Listing } from "@/components";
import withHOC from "@/hoc/withHOC";

const MoviePage = ({ params }: { params: { page: number } }) => {
    return (<Listing page={params.page} />)
}

export default withHOC(MoviePage);