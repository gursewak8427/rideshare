export function RideCardSkeleton({ driverProfile }) {
    return (
        <div className="w-full mx-auto space-y-3">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-100 rounded-xl p-4 flex justify-between items-center animate-pulse">
                    <div className="space-y-2 flex-grow">
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>

                    {
                        driverProfile && <div className="flex flex-col items-center gap-1">
                            <div className="flex -space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white relative z-20"></div>
                                <div className="-translate-x-2 w-10 h-10 translate-y-4 rounded-full bg-gray-200 border-2 border-white relative z-10"></div>
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-16 ml-1 mt-5"></div>
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

