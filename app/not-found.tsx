import { PiPopcornDuotone } from "react-icons/pi";
import Link from "next/link";

type Props = {
    page?: string
}

const PageNotFound = (props: Props) => {
  return (
    <main className={`animate-opacity flex ${props.page == "listing" ? "h-[calc(100vh-192)] h-[calc(100vh-272)]" : "h-screen"} w-screen flex-col items-center justify-center relative`}>
        <div className="flex flex-col relative items-center justify-center">
            <div className="bg-yellow-400 px-2 text-sm rounded rotate-12 absolute shadow-md z-20">
                {props.page == "listing" ? "Data" : "Page"} Not Found
            </div>
            <PiPopcornDuotone className="absolute text-8xl rotate-12 bottom-20 text-yellow-400" />
            <h1 className="font-bold text-8xl z-10 -rotate-3">404</h1>
            <Link href="/movie?page=1"><button className="rotate-3 text-yellow-500 hover:text-yellow-400 font-bold text-lg duration-200">Go back to movie list</button></Link>
        </div>
    </main>
  );
}

export default PageNotFound;
