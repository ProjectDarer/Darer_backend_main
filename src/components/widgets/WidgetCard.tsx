import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface WidgetCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export function WidgetCard({ title, children, className, headerAction }: WidgetCardProps) {
  return (
    <div className={cn(
      "bg-twitch-surface rounded-lg border border-border overflow-hidden transition-all duration-300 hover:border-[var(--cs-green)] hover:shadow-[0_0_15px_rgba(57,255,20,0.1)]", 
      className
    )}>
      <div className="flex items-center justify-between p-4 border-b border-border bg-white/5">
        <h3 className="font-semibold text-[var(--cs-cyan)] tracking-wide uppercase text-sm">{title}</h3>
        {headerAction}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}