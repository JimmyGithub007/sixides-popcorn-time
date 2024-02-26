
import { Header, Filter, Listing, Footer } from "@/components";

const MoviePage = ({ params }: { params: { page: number } }) => {
    return (<div>
        <Header />
        <div className="flex py-4 px-8 gap-3">
            <Filter />
            <div className="flex flex-col gap-2 items-center w-full">
                <Listing page={params.page} />
            </div>        
        </div>
        <Footer />
    </div>)
}

export default MoviePage;