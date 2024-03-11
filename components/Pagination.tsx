'use client';

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Pagination = () => {
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword')
    const { total_pages, page } = useSelector((state: RootState) => state.movies);

    const pages = useMemo(() => {
        let start = Math.max(1, page - 2);
        let end = Math.min(start + 4, total_pages);
        let memoPages: number[] = [];
        for(let p:number = start; p <= end; p++) {
            memoPages.push(p);
        }
        return memoPages;
    }, [page, total_pages])

    return (<div className="animate-opacity flex flex-col sm:flex-row gap-2 p-4">
        { page > 1 && <Link href={`/movie/p/1${keyword ? "?keyword="+keyword : ""}`}><button className="visible sm:invisible border-black border-2 bg-white text-black shadow-lg w-full sm:w-40 h-8 rounded-sm font-bold hover:bg-black hover:text-white transition-colors duration-200">FIRST PAGE</button></Link> }
        { page > 1 && <Link href={`/movie/p/${page-1}${keyword ? "?keyword="+keyword : ""}`}><button className="border-black border-2 bg-white text-black shadow-lg w-full sm:w-40 h-8 rounded-sm font-bold hover:bg-black hover:text-white transition-colors duration-200">PREVIOUS PAGE</button></Link> }
        <div className="flex gap-2"> 
            {
                pages.map((value: number, key: number) =>
                    <Link key={key} href={`/movie/p/${value}${keyword ? "?keyword="+keyword : ""}`}><button disabled={page == value} className={`shadow-lg w-8 h-8 rounded-sm font-bold hover:bg-white hover:text-black transition-colors duration-200 ${ page ==  value ? "bg-yellow-400 text-black hover:cursor-not-allowed" : "bg-black text-white" }`}>{value}</button></Link>
                )
            }
        </div>
        { page < total_pages && <Link href={`/movie/p/${Number(page)+1}${keyword ? "?keyword="+keyword : ""}`}><button className="border-black border-2 bg-white text-black shadow-lg w-full sm:w-32 h-8 rounded-sm font-bold hover:bg-black hover:text-white transition-colors duration-200">NEXT PAGE</button></Link> }
    </div>)
}

export default Pagination;