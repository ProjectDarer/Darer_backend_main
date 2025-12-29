import { Link } from 'react-router-dom';
import { Radio, Check } from 'lucide-react';
import { Channel } from '@/data/dummy';
import { cn } from '@/lib/utils';

interface StreamCardProps {
  channel: Channel;
  variant?: 'default' | 'compact';
}

export function StreamCard({ channel, variant = 'default' }: StreamCardProps) {
  const formatViewers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (variant === 'compact') {
    return (
      <Link 
        to={`/channel/${channel.username}`}
        className="flex gap-3 p-2 rounded-lg hover:bg-twitch-hover transition-colors group border border-transparent hover:border-[var(--cs-green)]/30"
      >
        <div className="relative flex-shrink-0">
          <img 
            src={channel.thumbnail} 
            alt={channel.streamTitle}
            className="w-16 h-9 object-cover rounded ring-1 ring-border group-hover:ring-[var(--cs-cyan)] transition-all"
          />
          {channel.isLive && (
            <span className="absolute bottom-0.5 left-0.5 px-1 bg-[var(--cs-magenta)] text-white text-[9px] font-bold uppercase rounded shadow-[0_0_10px_var(--cs-magenta)]">
              Live
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate group-hover:text-[var(--cs-cyan)] transition-colors">
            {channel.displayName}
          </p>
          <p className="text-xs text-muted-foreground truncate group-hover:text-[var(--cs-green)] transition-colors">{channel.category}</p>
          <p className="text-xs text-muted-foreground">{formatViewers(channel.viewers)} viewers</p>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/channel/${channel.username}`}
      className="group block animate-fade-up"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-twitch-surface ring-1 ring-border group-hover:ring-[var(--cs-green)] group-hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] transition-all duration-300">
        <img 
          src={channel.thumbnail} 
          alt={channel.streamTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Live Badge - Updated to Magenta for heavy contrast */}
        {channel.isLive && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 bg-[var(--cs-magenta)] text-white text-xs font-bold uppercase rounded shadow-[0_0_10px_var(--cs-magenta)]">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-live" />
            Live
          </div>
        )}
        
        {/* Viewer Count - Updated to Dark background with Green text */}
        <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/80 backdrop-blur-md text-[var(--cs-green)] text-xs font-medium rounded border border-[var(--cs-green)]/30">
          {formatViewers(channel.viewers)} viewers
        </div>
        
        {/* Hover Overlay - Cyan tint */}
        <div className="absolute inset-0 bg-[var(--cs-cyan)]/0 group-hover:bg-[var(--cs-cyan)]/10 transition-colors duration-300" />
      </div>
      
      {/* Info */}
      <div className="mt-2 flex gap-2">
        <div className="relative">
          <img 
            src={channel.avatar} 
            alt={channel.displayName}
            className="w-10 h-10 rounded-full flex-shrink-0 ring-2 ring-transparent group-hover:ring-[var(--cs-yellow)] transition-all"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate group-hover:text-[var(--cs-cyan)] transition-colors">
            {channel.streamTitle}
          </h3>
          <p className="text-sm text-muted-foreground truncate flex items-center gap-1 group-hover:text-foreground transition-colors">
            {channel.displayName}
            {channel.isPartner && (
              <Check className="h-3.5 w-3.5 text-[var(--cs-magenta)]" />
            )}
          </p>
          <p className="text-sm text-[var(--cs-green)]/80 truncate">{channel.category}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {channel.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="px-1.5 py-0.5 bg-twitch-surface border border-border text-xs text-muted-foreground rounded hover:border-[var(--cs-yellow)] hover:text-[var(--cs-yellow)] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}