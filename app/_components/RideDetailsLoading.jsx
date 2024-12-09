export default function RideDetailsLoading() {
    return (
        <div className="w-full mx-auto mt-5 animate-pulse">
            {/* Date Header */}
            <div className="flex items-center justify-between">
                <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
                <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
            </div>
            {/* Route Visualization */}
            <div className="flex items-start mb-6">
                <div className="flex-none w-16 text-right">
                    <div className="h-4 bg-gray-200 rounded w-12 ml-auto mb-2"></div>
                </div>
                <div className="mx-4 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-0.5 h-16 bg-gray-300 my-1"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-40 mt-14"></div>
                </div>
            </div>

            {/* Seats Available */}
            <div className="h-6 bg-gray-200 rounded w-40 mb-8"></div>

            {/* Rider Details Section */}
            <div className="space-y-6">
                {/* Section Title */}
                <div className="h-6 bg-gray-200 rounded w-32"></div>

                {/* Profile */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                    <div className="h-5 bg-gray-200 rounded w-40"></div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                    <div className="h-5 bg-gray-200 rounded w-32"></div>
                    <div className="ml-auto">
                        <div className="h-10 bg-gray-200 rounded-full w-20"></div>
                    </div>
                </div>

                {/* Vehicle Details */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                    <div className="space-y-2">
                        <div className="h-5 bg-gray-200 rounded w-28"></div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

