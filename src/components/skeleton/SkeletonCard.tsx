import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn("animate-pulse border border-border/50 rounded-lg p-2", className)}>
      <div className="aspect-video bg-twitch-surface rounded-lg mb-2" />
      <div className="flex gap-2">
        <div className="w-10 h-10 rounded-full bg-twitch-surface flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-twitch-surface rounded w-3/4" />
          <div className="h-3 bg-twitch-surface rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCategoryCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn("animate-pulse border border-border/50 rounded-lg p-2", className)}>
      <div className="aspect-[3/4] bg-twitch-surface rounded-lg mb-2" />
      <div className="space-y-2">
        <div className="h-4 bg-twitch-surface rounded w-3/4" />
        <div className="h-3 bg-twitch-surface rounded w-1/2" />
      </div>
    </div>
  );
}