"use client";

import { useState } from "react";

const Sorting = () => {
    const sortCategories: {
        id: number;
        name: string;
    }[] = [
        { "id": 1, "name": "Movie Title"},
        { "id": 2, "name": "Release Date"},
        { "id": 3, "name": "Popularity"},
        { "id": 4, "name": "Rating"}
    ]

    const [ sortCategory, setSortCategory ] = useState(1);
    const [ open, setOpen ] = useState(false);

    return (<div className="relative">
        <button onClick={() => setOpen(!open)} className="bg-black rounded-md w-64 h-8 shadow-lg text-white font-bold">Sort By {sortCategories.find(e => e.id == sortCategory)?.name}</button>
        <div className={`absolute z-10 bg-white rounded-lg shadow left-0 w-64 py-2 text-center duration-200 ${open ? "top-9 opacity-100 visible" : "top-4 opacity-0 invisible"}`}>
            <ul>
                {
                    sortCategories.map(value => (
                        <li key={value.id}><button onClick={() => { setSortCategory(value.id); setOpen(false); }} className="w-full hover:bg-gray-100 py-1">{value.name}</button></li>
                    ))
                }
            </ul>
        </div>
    </div>)
}

export default Sorting;