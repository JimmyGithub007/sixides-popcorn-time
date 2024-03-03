const Skeleton = () => {
    return (<div role="status" className="animate-pulse flex flex-col gap-2">
        <div className="h-8 bg-gray-200 rounded-xl w-24 my-4 shadow-md"></div>
        <div className="flex flex-wrap gap-3">
        {
                [12, 14, 16, 16, 24, 12, 24, 16].map((value, key) => (
                    <div key={key} className={`h-6 bg-gray-200 rounded-md w-${value} shadow-md`}></div>
                ))
            }
        </div>
        <div className="h-8 bg-gray-200 rounded-xl w-24 my-4 shadow-md"></div>
        <div className="flex flex-wrap gap-3">
            {
                [40, 60, 32, 60, 48, 12].map((value, key) => (
                    <div key={key} className={`h-6 bg-gray-200 rounded-md w-${value} shadow-md`}></div>
                ))
            }
        </div>
    <div className="h-8 bg-gray-200 rounded-xl w-24 my-4 shadow-md"></div>
        <div className="flex flex-wrap gap-3">
            {
                [60, 32, 40, 48, 60, 60].map((value, key) => (
                    <div key={key} className={`h-6 bg-gray-200 rounded-md w-${value} shadow-md`}></div>
                ))
            }
        </div>
    </div>)
}

export default Skeleton;