import { Skeleton } from '@/components/ui/Skeleton'

export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Skeleton */}
            <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-glass-border">
                <div className="flex items-center gap-2">
                    <Skeleton className="w-10 h-10 rounded-xl" />
                    <Skeleton className="h-8 w-32" />
                </div>
                <div className="flex gap-4 items-center">
                    <Skeleton className="h-10 w-24 rounded-full" />
                </div>
            </nav>

            {/* Dashboard Content Skeleton */}
            <div className="pt-24 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Section Skeleton */}
                    <div className="mb-12">
                        <Skeleton className="h-12 w-3/4 md:w-1/2 mb-4" />
                        <Skeleton className="h-6 w-1/2 md:w-1/3" />
                    </div>

                    {/* Stats Cards Skeleton */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="glass-card p-6 rounded-3xl">
                                <div className="flex items-center justify-between mb-4">
                                    <Skeleton className="w-12 h-12 rounded-xl" />
                                </div>
                                <Skeleton className="h-8 w-16 mb-2" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions Skeleton */}
                    <div className="glass-card p-8 rounded-3xl mb-12">
                        <Skeleton className="h-8 w-48 mb-6" />
                        <div className="grid md:grid-cols-2 gap-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="p-6 rounded-2xl border border-glass-border">
                                    <div className="flex items-center justify-between">
                                        <div className="w-full">
                                            <Skeleton className="h-6 w-32 mb-2" />
                                            <Skeleton className="h-4 w-48" />
                                        </div>
                                        <Skeleton className="w-5 h-5 rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User Info Skeleton */}
                    <div className="glass-card p-6 rounded-2xl">
                        <Skeleton className="h-6 w-40 mb-4" />
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
