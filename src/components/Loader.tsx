export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="relative flex-1 max-w-2xl">
              <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:hidden h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>

          <aside className="hidden lg:block w-full lg:w-64 shrink-0 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-2">
                  {Array(5)
                    .fill(0)
                    .map((_, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </aside>

          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(12)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4">
                    <div className="h-48 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-1">
                {Array(7)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
