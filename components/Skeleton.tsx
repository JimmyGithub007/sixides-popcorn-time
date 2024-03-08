const Skeleton = () => {
    return (<div role="status" className="animate-pulse flex flex-col gap-2">
        <div className="h-8 bg-gray-200 rounded-xl w-24 my-4 shadow-md"></div>
        <div className="flex flex-wrap gap-3">   
            <div className={`h-6 bg-gray-200 rounded-md w-12 shadow-md`}></div>     
            <div className={`h-6 bg-gray-200 rounded-md w-14 shadow-md`}></div>
            <div className={`h-6 bg-gray-200 rounded-md w-16 shadow-md`}></div>               
        </div>
        <div className="h-8 bg-gray-200 rounded-xl w-24 my-4 shadow-md"></div>
        <div className="flex flex-wrap gap-3">
            <div className={`h-6 bg-gray-200 rounded-md w-40 shadow-md`}></div>
        </div>
        <div className="h-8 bg-gray-200 rounded-xl w-24 my-4 shadow-md"></div>
        <div className="flex flex-wrap gap-3">
            <div className={`h-6 bg-gray-200 rounded-md w-40 shadow-md`}></div>
        </div>
    </div>)
}

export default Skeleton;