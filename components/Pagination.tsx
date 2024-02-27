'use client';
import Link from "next/link";
import { useMemo } from "react";

type Props = {
    current_page: number,
    total_pages: number
}

const Pagination = (props: Props) => {
    const pages = useMemo(() => {
        let start = Math.max(1, props.current_page - 2);
        let end = Math.min(start + 4, props.total_pages);
        let memoPages: number[] = [];
        for(let p:number = start; p <= end; p++) {
            memoPages.push(p);
        }
        return memoPages;
    }, [props.current_page, props.total_pages])

    return (<div className="flex gap-2 p-4">
        { props.current_page > 1 && <Link href={`/movie/p/${props.current_page-1}`}><button className="border-black border-2 bg-white text-black shadow-lg w-40 h-8 rounded-sm font-bold hover:bg-black hover:text-white transition-colors duration-200">PREVIOUS PAGE</button></Link> }
        {
            pages.map((value: number, key: number) =>
                <Link key={key} href={`/movie/p/${value}`}><button disabled={props.current_page == value} className={`shadow-lg w-8 h-8 rounded-sm font-bold hover:bg-white hover:text-black transition-colors duration-200 ${ props.current_page ==  value ? "bg-yellow-400 text-black hover:cursor-not-allowed" : "bg-black text-white" }`}>{value}</button></Link>
            )
        }
        { props.current_page < props.total_pages && <Link href={`/movie/p/${Number(props.current_page)+1}`}><button className="border-black border-2 bg-white text-black shadow-lg w-32 h-8 rounded-sm font-bold hover:bg-black hover:text-white transition-colors duration-200">NEXT PAGE</button></Link> }
    </div>)
}

export default Pagination;