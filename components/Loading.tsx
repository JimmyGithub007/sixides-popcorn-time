const Loading = () => {
    return (<div className="flex gap-4 items-center">
        <div className="relative inline-flex">
            <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full absolute top-0 left-0 animate-ping"></div>
            <div className="w-8 h-8 bg-yellow-400 rounded-full absolute top-0 left-0 animate-pulse"></div>
        </div>
        <h1 className="text-yellow-400 text-3xl"><b>LOADING</b></h1>
    </div>)
}

export default Loading;