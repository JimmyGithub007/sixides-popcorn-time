import { Listing } from "@/components";
import Shell from "@/components/Shell";

const MoviePage = ({ params }: { params: { page: number } }) => {
    return (<Shell><Listing page={params.page} /></Shell>)
}

export default MoviePage;