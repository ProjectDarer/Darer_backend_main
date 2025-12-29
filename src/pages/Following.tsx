import { MainLayout } from '@/components/layout/MainLayout';
import { followedChannels } from '@/data/dummy';
import { Link } from 'react-router-dom';
import { Radio, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Following() {
  const liveChannels = followedChannels.filter(c => c.isLive);
  const offlineChannels = followedChannels.filter(c => !c.isLive);

  const formatViewers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <MainLayout>
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gradient">Following</h1>
          <p className="text-muted-foreground text-sm md:text-base">Channels you follow</p>
        </div>

        {/* Live Channels */}
        {liveChannels.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Radio className="h-5 w-5 text-[var(--cs-magenta)] animate-pulse" />
              <h2 className="text-lg font-semibold text-[var(--cs-magenta)]">Live Now</h2>
              <span className="px-2 py-0.5 bg-[var(--cs-magenta)]/20 text-[var(--cs-magenta)] text-xs font-medium rounded border border-[var(--cs-magenta)]/30">
                {liveChannels.length}
              </span>
            </div>
            <div className="space-y-3">
              {liveChannels.map((channel) => (
                <Link
                  key={channel.id}
                  to={`/channel/${channel.username}`}
                  className="flex items-start md:items-center gap-3 md:gap-4 p-3 md:p-4 bg-twitch-surface rounded-lg border border-transparent hover:border-[var(--cs-magenta)]/50 hover:shadow-[0_0_15px_var(--cs-glow-soft)] transition-all group"
                >
                  {/* Thumbnail - Responsive Width */}
                  <div className="relative w-24 md:w-32 aspect-video rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={channel.thumbnail} 
                      alt={channel.streamTitle}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 px-1 bg-[var(--cs-magenta)] text-white text-[9px] md:text-[10px] font-bold uppercase rounded shadow-sm">
                      Live
                    </span>
                  </div>

                  {/* Avatar - Hidden on very small mobile if needed, or smaller */}
                  <div className="relative flex-shrink-0 hidden xs:block">
                    <img 
                      src={channel.avatar} 
                      alt={channel.displayName}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full ring-2 ring-[var(--cs-magenta)]"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-[var(--cs-magenta)] rounded-full border-2 border-twitch-surface animate-pulse" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                       <h3 className="font-semibold truncate text-sm md:text-base group-hover:text-[var(--cs-cyan)] transition-colors">
                        {channel.displayName}
                      </h3>
                      {/* Mobile Avatar Fallback if hidden above */}
                      <img src={channel.avatar} alt="" className="w-5 h-5 rounded-full xs:hidden ring-1 ring-[var(--cs-magenta)]" />
                    </div>
                   
                    <p className="text-xs md:text-sm text-muted-foreground truncate group-hover:text-foreground transition-colors">{channel.streamTitle}</p>
                    <p className="text-xs text-[var(--cs-green)] mt-0.5">{channel.category}</p>
                  </div>

                  {/* Viewers & Actions */}
                  <div className="flex flex-col items-end gap-1 md:gap-0">
                    <div className="flex items-center gap-1 text-[var(--cs-cyan)] mb-1 md:mb-0">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[var(--cs-cyan)] rounded-full animate-pulse-live" />
                        <span className="font-medium text-xs md:text-sm">{formatViewers(channel.viewers)}</span>
                    </div>
                    
                    <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => e.preventDefault()}
                        className="h-8 w-8 hover:text-[var(--cs-magenta)] -mr-2 md:mr-0"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Offline Channels */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">Offline</h2>
            <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded">
              {offlineChannels.length}
            </span>
          </div>
          
          {offlineChannels.length > 0 ? (
            <div className="space-y-2">
              {offlineChannels.map((channel) => (
                <Link
                  key={channel.id}
                  to={`/channel/${channel.username}`}
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-twitch-surface/50 rounded-lg hover:bg-twitch-hover border border-transparent hover:border-[var(--cs-cyan)]/30 transition-colors group"
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img 
                      src={channel.avatar} 
                      alt={channel.displayName}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full opacity-75 grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate text-sm md:text-base group-hover:text-[var(--cs-cyan)] transition-colors">
                      {channel.displayName}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{channel.category}</p>
                  </div>

                  {/* Status */}
                  <span className="text-xs md:text-sm text-muted-foreground hidden sm:block">Offline</span>

                  {/* Actions */}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 -mr-2 md:mr-0"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-twitch-surface rounded-lg">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No offline channels</p>
            </div>
          )}
        </section>

        {/* Empty State */}
        {followedChannels.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-[var(--cs-magenta)]/50 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No channels followed</h3>
            <p className="text-muted-foreground mb-4">Start following channels to see them here</p>
            <Link to="/browse">
               <button className="btn-cyber-brand">Browse Channels</button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}