import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { Button } from '@/components/ui/button';
import { channels } from '@/data/dummy';
import { Heart, Bell, Share2, MoreHorizontal, Check, Users, Clock, Star, Gift } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Channel() {
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showChat, setShowChat] = useState(true);

  const channel = channels.find(c => c.username === username) || channels[0];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Main Content */}
        <div className={cn("flex-1 flex flex-col overflow-hidden", showChat ? "lg:mr-80" : "")}>
          {/* Video Player Area */}
          <div className="relative aspect-video bg-black flex-shrink-0 group max-h-[70vh] w-full mx-auto">
            <img
              src={channel.thumbnail}
              alt={channel.streamTitle}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />

            {/* Live Badge - Magenta */}
            {channel.isLive && (
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2 py-1 bg-[var(--cs-magenta)] text-white text-sm font-bold uppercase rounded flex items-center gap-1.5 shadow-[0_0_15px_var(--cs-glow-soft)]">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse-live" />
                  Live
                </span>
                <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-sm font-medium rounded text-[var(--cs-cyan)] border border-[var(--cs-cyan)]/30">
                  {formatNumber(channel.viewers)} viewers
                </span>
              </div>
            )}

            {/* Video Controls Overlay Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>

          {/* Stream Info Bar */}
          <div className="p-4 border-b border-border bg-twitch-surface relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--cs-magenta)] via-[var(--cs-cyan)] to-[var(--cs-yellow)] opacity-50" />

            <div className="flex items-start gap-4 relative z-10">
              {/* Streamer Avatar with Cyan Ring */}
              <div className="relative flex-shrink-0">
                <div className="p-0.5 rounded-full bg-gradient-to-br from-[var(--cs-cyan)] to-[var(--cs-green)]">
                  <img
                    src={channel.avatar}
                    alt={channel.displayName}
                    className="w-16 h-16 rounded-full border-4 border-background"
                  />
                </div>
                {channel.isLive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[var(--cs-magenta)] text-white text-[10px] font-bold uppercase rounded shadow-sm">
                    Live
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold truncate text-foreground hover:text-[var(--cs-cyan)] transition-colors cursor-pointer">{channel.displayName}</h1>
                  {channel.isPartner && (
                    <span className="w-5 h-5 bg-[var(--cs-magenta)] rounded-full flex items-center justify-center shadow-[0_0_10px_var(--cs-glow-soft)]">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>
                <h2 className="text-sm text-muted-foreground truncate mb-2">{channel.streamTitle}</h2>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-[var(--cs-green)] hover:underline cursor-pointer font-medium">{channel.category}</span>
                  {channel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-background border border-border text-xs rounded-full hover:border-[var(--cs-cyan)] hover:text-[var(--cs-cyan)] transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className={cn(
                    "px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2 transition-all duration-300",
                    isFollowing
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      : "btn-cyber-brand shadow-[0_0_15px_var(--cs-glow-cyan)]"
                  )}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Heart className={cn("h-4 w-4", isFollowing && "fill-current text-[var(--cs-magenta)]")} />
                  {isFollowing ? 'Following' : 'Follow'}
                </button>

                <Button
                  className="bg-[var(--cs-yellow)] text-black hover:bg-[var(--cs-yellow)]/80 font-bold border-none"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>

                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="hover:text-[var(--cs-cyan)] hover:bg-[var(--cs-cyan)]/10">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-[var(--cs-green)] hover:bg-[var(--cs-green)]/10">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-[var(--cs-magenta)] hover:bg-[var(--cs-magenta)]/10">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="grid md:grid-cols-3 gap-6">
              {/* About */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-twitch-surface rounded-lg p-6 border border-border hover:border-[var(--cs-cyan)]/30 transition-colors">
                  <h3 className="font-semibold mb-3 text-lg text-[var(--cs-cyan)]">About {channel.displayName}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{channel.description}</p>

                  <div className="flex gap-8 p-4 bg-background/50 rounded-lg border border-border">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{formatNumber(channel.followers)}</p>
                      <p className="text-xs text-[var(--cs-magenta)] uppercase tracking-wider font-semibold">Followers</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{formatNumber(channel.viewers)}</p>
                      <p className="text-xs text-[var(--cs-green)] uppercase tracking-wider font-semibold">Avg. Viewers</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-twitch-surface rounded-lg p-4 border border-border">
                  <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Social Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Twitter', 'YouTube', 'Instagram', 'Discord'].map((social) => (
                      <Button
                        key={social}
                        variant="outline"
                        size="sm"
                        className="border-border hover:border-[var(--cs-yellow)] hover:text-[var(--cs-yellow)] hover:bg-[var(--cs-yellow)]/5"
                      >
                        {social}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stream Stats - Color Coded */}
              <div className="space-y-4">
                <div className="bg-twitch-surface rounded-lg p-4 border border-border">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[var(--cs-magenta)] rounded-full"></span>
                    Live Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
                      <span className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-[var(--cs-cyan)]" />
                        Viewers
                      </span>
                      <span className="font-mono font-bold text-[var(--cs-cyan)]">{formatNumber(channel.viewers)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
                      <span className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-[var(--cs-yellow)]" />
                        Uptime
                      </span>
                      <span className="font-mono font-bold text-[var(--cs-yellow)]">4h 32m</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
                      <span className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Gift className="h-4 w-4 text-[var(--cs-green)]" />
                        Subs Today
                      </span>
                      <span className="font-mono font-bold text-[var(--cs-green)]">127</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <ChatPanel className="fixed right-0 top-14 w-80 h-[calc(100vh-3.5rem)] hidden lg:flex" />
        )}
      </div>
    </MainLayout>
  );
}