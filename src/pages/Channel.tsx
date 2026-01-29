import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { Button } from '@/components/ui/button';
import { channels } from '@/data/dummy';
import { Heart, Bell, Share2, MoreHorizontal, Check, Users, Clock, Star, Gift, Zap, Sword, Radio, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import { toast } from 'sonner';
import { DareModal } from '@/components/modals/DareModal';
import { TipModal } from '@/components/modals/TipModal';

export default function Channel() {
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [isDareModalOpen, setIsDareModalOpen] = useState(false);
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);

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
        <div className={cn("flex-1 flex flex-col overflow-y-auto custom-scrollbar text-white pb-20 lg:pb-0", showChat ? "lg:mr-80" : "")}>
          {/* Video Player Area */}
          <div className="relative aspect-video bg-black flex-shrink-0 group w-full mx-auto lg:max-h-[70vh]">
            <img
              src={channel.thumbnail}
              alt={channel.streamTitle}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />

            {/* Live Badge - Magenta */}
            {channel.isLive && (
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2 py-1 bg-[var(--cs-magenta)] text-white text-[10px] md:text-sm font-bold uppercase rounded flex items-center gap-1.5 shadow-[0_0_15px_var(--cs-glow-soft)]">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse-live" />
                  Live
                </span>
                <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-[10px] md:text-sm font-medium rounded text-[var(--cs-cyan)] border border-[var(--cs-cyan)]/30">
                  {formatNumber(channel.viewers)} joined
                </span>
              </div>
            )}

            {/* Mobile Chat Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 lg:hidden bg-black/40 backdrop-blur-md border border-white/10 text-white"
              onClick={() => setShowChat(!showChat)}
            >
              <Radio className={cn("h-5 w-5", showChat && "text-[var(--cs-magenta)]")} />
            </Button>

            {/* Video Controls Overlay Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
          </div>

          {/* Stream Info Bar */}
          <div className="p-4 border-b border-border bg-twitch-surface relative">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--cs-magenta)] via-[var(--cs-cyan)] to-[var(--cs-yellow)] opacity-50" />

            <div className="flex flex-col md:flex-row items-start gap-4 relative z-10">
              <div className="flex items-start gap-4 w-full">
                {/* Streamer Avatar with Cyan Ring */}
                <div className="relative flex-shrink-0">
                  <div className="p-0.5 rounded-full bg-gradient-to-br from-[var(--cs-cyan)] to-[var(--cs-green)]">
                    <img
                      src={channel.avatar}
                      alt={channel.displayName}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 md:border-4 border-background"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 text-white">
                    <h1 className="text-lg md:text-xl font-bold truncate text-foreground">{channel.displayName}</h1>
                    {channel.isPartner && (
                      <span className="w-4 h-4 md:w-5 md:h-5 bg-[var(--cs-magenta)] rounded-full flex items-center justify-center shadow-[0_0_10px_var(--cs-glow-soft)] flex-shrink-0">
                        <Check className="h-2.5 w-2.5 md:h-3 w-3 text-white" />
                      </span>
                    )}
                  </div>
                  <h2 className="text-xs md:text-sm text-muted-foreground truncate mb-2">{channel.streamTitle}</h2>
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                    <span className="text-[var(--cs-green)] font-medium">{channel.category}</span>
                    <div className="hidden sm:flex gap-1.5">
                      {channel.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-background border border-border text-[10px] md:text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                <button
                  className={cn(
                    "flex-1 md:flex-none px-4 py-2 rounded-md font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap",
                    isFollowing
                      ? "bg-secondary text-secondary-foreground"
                      : "btn-cyber-brand shadow-[0_0_15px_var(--cs-glow-cyan)]"
                  )}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Heart className={cn("h-3.5 w-3.5 md:h-4 w-4", isFollowing && "fill-current text-[var(--cs-magenta)]")} />
                  {isFollowing ? 'Following' : 'Follow'}
                </button>

                <Button
                  className={cn(
                    "flex-1 md:flex-none font-bold border-none text-xs md:text-sm whitespace-nowrap",
                    isSubscribed ? "bg-[var(--cs-green)] text-black" : "bg-[var(--cs-yellow)] text-black"
                  )}
                  onClick={() => setIsSubscribed(!isSubscribed)}
                >
                  <Star className={cn("h-3.5 w-3.5 md:h-4 w-4 mr-1 md:mr-2", isSubscribed && "fill-current")} />
                  {isSubscribed ? 'Subed' : 'Subscribe'}
                </Button>

                <button
                  className="p-2 bg-[var(--cs-yellow)]/10 text-[var(--cs-yellow)] rounded-md border border-[var(--cs-yellow)]/20 shadow-[inset_0_0_10px_rgba(255,165,0,0.1)] group transition-all hover:bg-[var(--cs-yellow)]/20"
                  onClick={() => setIsDareModalOpen(true)}
                  title="Issue a Dare"
                >
                  <Sword className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </button>

                <button
                  className="p-2 bg-[var(--cs-magenta)]/10 text-[var(--cs-magenta)] rounded-md border border-[var(--cs-magenta)]/20 shadow-[inset_0_0_10px_rgba(255,0,255,0.1)] group transition-all hover:bg-[var(--cs-magenta)]/20"
                  onClick={() => setIsTipModalOpen(true)}
                  title="Tip Bits"
                >
                  <Gift className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </button>

                <button
                  className="p-2 bg-white/5 text-muted-foreground rounded-md border border-white/10 hover:border-white/20 hover:text-white transition-all group"
                  onClick={() => toast.success("Link Copied!", { description: "You can now share this stream anywhere." })}
                  title="Share Stream"
                >
                  <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </button>

                <button
                  className="p-2 bg-white/5 text-muted-foreground rounded-md border border-white/10 hover:border-white/20 hover:text-white transition-all group"
                  onClick={() => toast.info("More Settings", { description: "Advanced stream playback and moderation tools." })}
                  title="More Options"
                >
                  <MoreHorizontal className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* About & Stats Section */}
          <div className="p-4">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column: About & Socials */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-twitch-surface rounded-lg p-4 md:p-6 border border-border">
                  <h3 className="font-bold mb-3 text-base md:text-lg text-[var(--cs-cyan)] uppercase tracking-tighter italic">Broadcast Dossier</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">{channel.description}</p>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-background/50 rounded-lg border border-border">
                    <div>
                      <p className="text-xl md:text-2xl font-black text-foreground tracking-tighter">{formatNumber(channel.followers)}</p>
                      <p className="text-[10px] text-[var(--cs-magenta)] uppercase tracking-widest font-bold">Followers</p>
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-black text-foreground tracking-tighter">{formatNumber(channel.viewers)}</p>
                      <p className="text-[10px] text-[var(--cs-green)] uppercase tracking-widest font-bold">People Joined</p>
                    </div>
                  </div>
                </div>

                <div className="bg-twitch-surface rounded-lg p-4 border border-border">
                  <h3 className="font-bold mb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">External Transmissions</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Twitter', 'YouTube', 'Discord'].map((social) => (
                      <Button
                        key={social}
                        variant="outline"
                        size="sm"
                        className="text-[10px] h-8 border-border bg-black/20 hover:border-[var(--cs-cyan)]"
                        onClick={() => toast.info(`Connecting to ${social}...`, { description: `Opening ${channel.displayName}'s ${social} page.` })}
                      >
                        {social}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Stats & Dares */}
              <div className="space-y-4">
                {/* Active Dares Card */}
                <div className="bg-twitch-surface rounded-lg p-4 border border-[var(--cs-yellow)]/30 shadow-[0_0_20px_rgba(255,255,0,0.05)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--cs-yellow)]/5 blur-2xl group-hover:bg-[var(--cs-yellow)]/10 transition-colors" />
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-[var(--cs-yellow)] uppercase italic tracking-tighter">
                    <Sword className="h-4 w-4" />
                    Open Bounties
                  </h3>
                  <div className="space-y-3">
                    {[
                      { dare: 'Win a Warzone game with only common loot', reward: '5,000 Bits', status: 'Accepted' },
                      { dare: 'Do 50 pushups if you lose this match', reward: '1,000 Bits', status: 'Pending' }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-black/40 rounded border border-white/5 relative group/item">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--cs-yellow)] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        <p className="text-sm font-bold mb-2 leading-tight">"{item.dare}"</p>
                        <div className="flex justify-between items-center text-[10px] uppercase font-black">
                          <span className="text-[var(--cs-green)] tracking-tighter">{item.reward}</span>
                          <span className={cn(item.status === 'Accepted' ? 'text-[var(--cs-cyan)]' : 'text-muted-foreground')}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full text-[10px] h-8 font-black uppercase tracking-[0.2em] text-[var(--cs-yellow)] hover:bg-[var(--cs-yellow)]/10 border border-dashed border-[var(--cs-yellow)]/30 mt-2"
                      onClick={() => setIsDareModalOpen(true)}
                    >
                      Issue New Dare
                    </Button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-twitch-surface rounded-lg p-4 border border-border">
                  <h3 className="font-bold mb-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Pulse Monitor</h3>
                  <div className="space-y-4">
                    {[
                      { user: 'BountyHunter', action: 'set a dare', time: '2m ago' },
                      { user: 'QuestMaster', action: 'tipped bits', time: '5m ago' }
                    ].map((activity, idx) => (
                      <div key={idx} className="flex gap-3 text-xs border-l border-border pl-3 relative">
                        <div className="absolute top-0.5 -left-[3px] w-1.5 h-1.5 rounded-full bg-border" />
                        <div className="flex-1">
                          <p className="text-foreground leading-tight"><span className="font-bold text-[var(--cs-cyan)]">{activity.user}</span> {activity.action}</p>
                          <p className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-tighter">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Panel - Fixed Right on Desktop, Slide-over on Mobile */}
        <div className={cn(
          "fixed inset-y-0 right-0 w-full md:w-80 h-full bg-background/95 backdrop-blur-xl border-l border-border transition-transform duration-300 z-[60] lg:z-40 lg:translate-x-0 lg:bg-twitch-surface/20 lg:backdrop-blur-none lg:pt-14",
          showChat ? "translate-x-0" : "translate-x-full lg:translate-x-0 lg:hidden"
        )}>
          <div className="flex flex-col h-full relative">
            {/* Mobile Close Button for Chat */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 left-2 lg:hidden text-white"
              onClick={() => setShowChat(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            <ChatPanel className="h-full border-none" />
          </div>
        </div>

        <DareModal
          isOpen={isDareModalOpen}
          onOpenChange={setIsDareModalOpen}
          streamerName={channel.displayName}
        />
        <TipModal
          isOpen={isTipModalOpen}
          onOpenChange={setIsTipModalOpen}
          streamerName={channel.displayName}
        />
      </div>
    </MainLayout>
  );
}