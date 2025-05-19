export function HoaldingLoader() {
  return (
    <div className="min-h-96 w-full overflow-x-auto">
      {/* Header Skeleton */}
      <div className={`min-w-[1024px] w-full flex flex-col divide-y border-gray-300`}>
        <div className="flex items-center px-4 py-3 font-semibold text-sm bg-gray-100 animate-pulse">
          <div className="flex items-center gap-3 flex-[2] min-w-[200px]">
            <div className="h-4 w-4 bg-gray-300 rounded" />
            <div className="h-4 w-16 bg-gray-300 rounded" />
          </div>
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-300 rounded float-right" />
          </div>
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-300 rounded float-right" />
          </div>
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-300 rounded float-right" />
          </div>
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-300 rounded float-right" />
          </div>
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-300 rounded float-right" />
          </div>
        </div>

        {/* Row Skeletons - 5 rows for better loading appearance */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center px-4 py-4 border-b border-gray-300 animate-pulse">
            {/* Asset Info */}
            <div className="flex items-center gap-3 flex-[2] min-w-[200px]">
              <div className="h-4 w-4 bg-gray-300 rounded" />
              <div className="h-6 w-6 bg-gray-300 rounded-full" />
              <div className="flex flex-col gap-1">
                <div className="h-4 w-24 bg-gray-300 rounded" />
                <div className="h-3 w-16 bg-gray-300 rounded" />
              </div>
            </div>

            {/* Holding / Price */}
            <div className="flex-1 text-right">
              <div className="flex flex-col items-end gap-1">
                <div className="h-4 w-20 bg-gray-300 rounded" />
                <div className="h-3 w-16 bg-gray-300 rounded" />
              </div>
            </div>

            {/* Total Value */}
            <div className="flex-1 text-right">
              <div className="h-4 w-20 bg-gray-300 rounded inline-block" />
            </div>

            {/* STCG */}
            <div className="flex-1 text-right">
              <div className="flex flex-col items-end gap-1">
                <div className="h-4 w-14 bg-gray-300 rounded" />
                <div className="h-3 w-20 bg-gray-300 rounded" />
              </div>
            </div>

            {/* LTCG */}
            <div className="flex-1 text-right">
              <div className="flex flex-col items-end gap-1">
                <div className="h-4 w-14 bg-gray-300 rounded" />
                <div className="h-3 w-20 bg-gray-300 rounded" />
              </div>
            </div>

            {/* Sell Amount */}
            <div className="flex-1 text-right">
              <div className="h-6 w-24 bg-gray-300 rounded inline-block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}