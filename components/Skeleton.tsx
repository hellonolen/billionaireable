import React from 'react';

interface SkeletonProps {
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
    return (
        <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg ${className}`}></div>
    );
};

export const LessonSkeleton: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
            <Skeleton className="h-4 w-24 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-12" />

            <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-[32px] mb-12 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse" />
            </div>

            <div className="space-y-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    );
};

export const DashboardSkeleton: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
            <div className="flex justify-between items-center">
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800">
                        <Skeleton className="h-10 w-10 rounded-xl mb-6" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <Skeleton className="h-6 w-32" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white dark:bg-gray-900 aspect-[4/5] rounded-[32px] border border-gray-100 dark:border-gray-800 p-6 flex flex-col justify-end">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
