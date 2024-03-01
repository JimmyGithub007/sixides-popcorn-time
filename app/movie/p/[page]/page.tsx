import { Listing } from "@/components";

const MoviePage = ({ params }: { params: { page: number } }) => {
    return (<Listing page={params.page} />)
}

export default MoviePage;