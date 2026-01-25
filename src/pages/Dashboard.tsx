import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { userProfile, notifications } from '@/data/dummy';
import {
  Play,
  Settings,
  Users,
  Clock,
  TrendingUp,
  Wifi,
  Eye,
  EyeOff,
  Upload,
  X,
  Plus,
  Activity,
  Radio,
  Camera,
  Mic,
  MicOff,
  CameraOff,
  Monitor,
  Video
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Dashboard() {
  const navigate = useNavigate();
  const [streamTitle, setStreamTitle] = useState('My Amazing Stream 🎮');
  const [selectedCategory, setSelectedCategory] = useState('Just Chatting');
  const [tags, setTags] = useState(['English', 'Chill', 'Interactive']);
  const [newTag, setNewTag] = useState('');
  const [showStreamKey, setShowStreamKey] = useState(false);
  const [isLive, setIsLive] = useState(false);

  // New States for Camera/Audio Review
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [showTagInput, setShowTagInput] = useState(false);

  const streamStats = {
    viewers: 1234,
    bitrate: 6000,
    fps: 60,
    uptime: '2h 15m',
    peakViewers: 2156,
  };

  const recentActivity = notifications.slice(0, 5);

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    if (tags.length >= 10) {
      toast.error('Maximum 10 tags allowed');
      return;
    }
    if (tags.includes(newTag.trim())) {
      toast.error('Tag already exists');
      return;
    }
    setTags([...tags, newTag.trim()]);
    setNewTag('');
    setShowTagInput(false);
    toast.success(`Tag "${newTag}" added`);
  };

  return (
    <MainLayout>
      <div className="block md:flex h-auto md:h-[calc(100vh-3.5rem)]">

        {/* Main Dashboard Content */}
        <div className="flex-1 md:overflow-y-auto p-4 md:p-6 w-full custom-scrollbar">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gradient">Creator Dashboard</h1>
              <p className="text-muted-foreground text-sm">Manage your stream and view analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border transition-all duration-500",
                isLive
                  ? "bg-[var(--cs-magenta)]/20 text-[var(--cs-magenta)] border-[var(--cs-magenta)] shadow-[0_0_15px_var(--cs-glow-soft)]"
                  : "bg-muted text-muted-foreground border-border"
              )}>
                <Radio className={cn("h-4 w-4", isLive && "animate-pulse-live")} />
                {isLive ? 'LIVE' : 'OFFLINE'}
              </div>
              <button
                className={cn(
                  "px-6 py-2 rounded-md font-bold transition-all duration-300 text-sm flex-1 md:flex-none relative overflow-hidden group",
                  isLive
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                    : "btn-cyber-brand"
                )}
                onClick={() => {
                  const newState = !isLive;
                  if (newState) {
                    toast.success('Redirecting to Live Studio...');
                    setTimeout(() => {
                      navigate('/studio');
                    }, 1000);
                  } else {
                    setIsLive(false);
                    toast.info('Stream ended.');
                  }
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLive ? 'End Stream' : 'Go Live'}
                  {!isLive && <Video className="h-4 w-4" />}
                </span>
                {!isLive && <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left/Middle Columns */}
            <div className="lg:col-span-2 space-y-6">

              {/* Camera & Audio Review - NEW SECTION */}
              <WidgetCard title="Stream Review & Quality Check">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative aspect-video bg-black rounded-lg border border-border overflow-hidden group">
                    {isCameraEnabled ? (
                      <div className="w-full h-full flex items-center justify-center relative">
                        {/* Simulated Camera Feed */}
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=450&fit=crop"
                          alt="Camera Preview"
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="p-3 bg-black/60 rounded-full backdrop-blur-md border border-[var(--cs-cyan)] animate-pulse">
                            <Camera className="h-8 w-8 text-[var(--cs-cyan)]" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-[10px] font-mono text-[var(--cs-green)]">
                          PREVIEW • 1080p • 60fps
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-twitch-surface">
                        <CameraOff className="h-12 w-12 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Camera Disabled</span>
                      </div>
                    )}

                    {/* Control Overlays */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className={cn(
                          "rounded-full backdrop-blur-md border transition-all",
                          isCameraEnabled ? "bg-[var(--cs-cyan)]/20 border-[var(--cs-cyan)] text-[var(--cs-cyan)]" : "bg-red-500/20 border-red-500 text-red-500"
                        )}
                        onClick={() => setIsCameraEnabled(!isCameraEnabled)}
                      >
                        {isCameraEnabled ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className={cn(
                          "rounded-full backdrop-blur-md border transition-all",
                          isMicEnabled ? "bg-[var(--cs-green)]/20 border-[var(--cs-green)] text-[var(--cs-green)]" : "bg-red-500/20 border-red-500 text-red-500"
                        )}
                        onClick={() => setIsMicEnabled(!isMicEnabled)}
                      >
                        {isMicEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Mic className="h-4 w-4" /> Audio Input Levels
                        </span>
                        <span className={cn("font-mono", isMicEnabled ? "text-[var(--cs-green)]" : "text-muted-foreground")}>
                          {isMicEnabled ? '-12dB' : 'Muted'}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-twitch-surface rounded-full overflow-hidden border border-border">
                        <div
                          className={cn(
                            "h-full transition-all duration-100",
                            isMicEnabled ? "bg-gradient-to-r from-[var(--cs-green)] to-[var(--cs-yellow)]" : "bg-muted"
                          )}
                          style={{ width: isMicEnabled ? '65%' : '0%' }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="text-xs h-9 border-border group hover:border-[var(--cs-cyan)]">
                        <Monitor className="h-3.5 w-3.5 mr-2 group-hover:text-[var(--cs-cyan)]" />
                        Source: OBS
                      </Button>
                      <Button variant="outline" className="text-xs h-9 border-border group hover:border-[var(--cs-green)]">
                        <Settings className="h-3.5 w-3.5 mr-2 group-hover:text-[var(--cs-green)]" />
                        Settings
                      </Button>
                    </div>
                    <p className="text-[10px] text-muted-foreground bg-black/20 p-2 rounded border border-border/50">
                      * These switches only affect your local preview review. Use OBS to toggle your actual stream sources.
                    </p>
                  </div>
                </div>
              </WidgetCard>

              {/* Bounties Board - NEW FOR DARER */}
              <WidgetCard title="Incoming Dare Requests">
                <div className="space-y-4">
                  {[
                    { id: 'd1', user: 'DareLover9', task: 'Get 5 kills with a crossbow', reward: '2,500 Bits', time: '10m ago' },
                    { id: 'd2', user: 'QuestKing', task: 'Don\'t use a vehicle for 10 minutes', reward: '1,200 Bits', time: '15m ago' },
                  ].map((dare) => (
                    <div key={dare.id} className="p-4 bg-black/40 border border-border rounded-xl flex items-center justify-between group hover:border-[var(--cs-yellow)] transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--cs-yellow)]/20 flex items-center justify-center font-bold text-[var(--cs-yellow)]">D</div>
                        <div>
                          <p className="text-sm font-bold">"{dare.task}"</p>
                          <p className="text-xs text-muted-foreground">From <span className="text-[var(--cs-cyan)]">{dare.user}</span> • {dare.time}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-right">
                        <span className="text-sm font-black text-[var(--cs-green)]">{dare.reward}</span>
                        <div className="flex gap-2">
                          <Button size="icon-sm" className="h-7 w-7 bg-[var(--cs-green)] text-black hover:bg-[var(--cs-green)]/80" onClick={() => toast.success('Dare Accepted!')}>
                            <Play className="h-3 w-3" />
                          </Button>
                          <Button size="icon-sm" variant="ghost" className="h-7 w-7 hover:bg-red-500/20 hover:text-red-500" onClick={() => toast.info('Dare Ignored')}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="bg-muted/50 p-4 rounded-lg border border-dashed border-border text-center">
                    <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">3 more requests in queue</p>
                  </div>
                </div>
              </WidgetCard>

              {/* Stream Information */}
              <WidgetCard title="Stream Information">
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="text-sm font-medium mb-2 block text-[var(--cs-cyan)] font-bold tracking-wide">Stream Title</label>
                    <Input
                      value={streamTitle}
                      onChange={(e) => setStreamTitle(e.target.value)}
                      placeholder="Enter your stream title"
                      maxLength={140}
                      className="focus-visible:ring-[var(--cs-cyan)] border-border bg-black/20"
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">{streamTitle.length}/140</p>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium mb-2 block text-[var(--cs-green)] font-bold tracking-wide">Category</label>
                    <Input
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      placeholder="Select a category"
                      className="focus-visible:ring-[var(--cs-green)] border-border bg-black/20"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-sm font-medium mb-2 block text-[var(--cs-magenta)] font-bold tracking-wide">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-[var(--cs-magenta)]/10 border border-[var(--cs-magenta)]/30 text-[var(--cs-magenta)] text-sm rounded-full flex items-center gap-1 group transition-all hover:bg-[var(--cs-magenta)]/20"
                        >
                          {tag}
                          <button
                            onClick={() => {
                              setTags(tags.filter(t => t !== tag));
                              toast.info(`Tag "${tag}" removed`);
                            }}
                            className="hover:bg-[var(--cs-magenta)] hover:text-white rounded-full p-0.5 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}

                      {showTagInput ? (
                        <div className="flex items-center gap-1 animate-in slide-in-from-left-2 duration-300">
                          <Input
                            autoFocus
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                            placeholder="New tag..."
                            className="h-8 w-24 text-xs bg-black/40 border-[var(--cs-yellow)] focus-visible:ring-0"
                          />
                          <Button size="icon-sm" className="h-8 w-8 bg-[var(--cs-yellow)] text-black hover:bg-[var(--cs-yellow)]/80" onClick={handleAddTag}>
                            <CheckIcon className="h-4 w-4" />
                          </Button>
                          <Button size="icon-sm" variant="ghost" className="h-8 w-8" onClick={() => setShowTagInput(false)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <button
                          className="px-3 py-1 bg-twitch-surface border border-dashed border-border text-sm rounded-full flex items-center gap-1.5 hover:border-[var(--cs-yellow)] hover:text-[var(--cs-yellow)] transition-all hover:scale-105 active:scale-95"
                          onClick={() => setShowTagInput(true)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Add Tag
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Add up to 10 tags to help viewers find your stream</p>
                  </div>

                  <div className="pt-2">
                    <button className="btn-cyber-brand w-full sm:w-auto px-8" onClick={() => toast.success('Changes saved!')}>Save Changes</button>
                  </div>
                </div>
              </WidgetCard>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Live Info (Conditional UI for Go Live) */}
              {isLive && (
                <div className="bg-gradient-to-br from-[var(--cs-magenta)]/20 to-black p-4 rounded-xl border border-[var(--cs-magenta)]/30 animate-in zoom-in-95 duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--cs-magenta)] rounded-full animate-pulse-live" />
                      <span className="text-sm font-black uppercase text-[var(--cs-magenta)] tracking-tighter">Live Broadcast</span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">00:15:42</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-black/40 rounded border border-white/5">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Health</p>
                      <p className="text-sm font-bold text-[var(--cs-green)]">EXCELLENT</p>
                    </div>
                    <div className="p-2 bg-black/40 rounded border border-white/5">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Bitrate</p>
                      <p className="text-sm font-bold text-[var(--cs-cyan)]">5.8 Mbps</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Live Stats */}
              <WidgetCard title="Stream Stats">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-twitch-hover/50 border border-border rounded-lg p-3 hover:border-[var(--cs-cyan)] transition-colors">
                      <div className="flex items-center gap-2 text-[var(--cs-cyan)] mb-1">
                        <Users className="h-4 w-4" />
                        <span className="text-[10px] md:text-xs font-bold uppercase">Viewers</span>
                      </div>
                      <p className="text-xl md:text-2xl font-bold">{isLive ? streamStats.viewers.toLocaleString() : '—'}</p>
                    </div>
                    <div className="bg-twitch-hover/50 border border-border rounded-lg p-3 hover:border-[var(--cs-magenta)] transition-colors">
                      <div className="flex items-center gap-2 text-[var(--cs-magenta)] mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-[10px] md:text-xs font-bold uppercase">Peak</span>
                      </div>
                      <p className="text-xl md:text-2xl font-bold">{isLive ? streamStats.peakViewers.toLocaleString() : '—'}</p>
                    </div>
                    <div className="bg-twitch-hover/50 border border-border rounded-lg p-3 hover:border-[var(--cs-green)] transition-colors">
                      <div className="flex items-center gap-2 text-[var(--cs-green)] mb-1">
                        <Wifi className="h-4 w-4" />
                        <span className="text-[10px] md:text-xs font-bold uppercase">Bitrate</span>
                      </div>
                      <p className="text-xl md:text-2xl font-bold">{isLive ? `${streamStats.bitrate}` : '—'}</p>
                    </div>
                    <div className="bg-twitch-hover/50 border border-border rounded-lg p-3 hover:border-[var(--cs-yellow)] transition-colors">
                      <div className="flex items-center gap-2 text-[var(--cs-yellow)] mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-[10px] md:text-xs font-bold uppercase">Uptime</span>
                      </div>
                      <p className="text-xl md:text-2xl font-bold">{isLive ? streamStats.uptime : '—'}</p>
                    </div>
                  </div>
                </div>
              </WidgetCard>

              {/* Activity Feed */}
              <WidgetCard title="Recent Activity">
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-[var(--cs-green)]">
                      {activity.avatar ? (
                        <img src={activity.avatar} alt="" className="w-8 h-8 rounded-full ring-1 ring-border flex-shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[var(--cs-magenta)]/20 flex items-center justify-center flex-shrink-0">
                          <Activity className="h-4 w-4 text-[var(--cs-magenta)]" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{activity.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </WidgetCard>

              {/* Quick Actions */}
              <WidgetCard title="Quick Actions">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start border border-border hover:border-[var(--cs-cyan)] hover:text-[var(--cs-cyan)] hover:bg-[var(--cs-cyan)]/10"
                    onClick={() => toast.success("Opening stream preview...")}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start border border-border hover:border-[var(--cs-magenta)] hover:text-[var(--cs-magenta)] hover:bg-[var(--cs-magenta)]/10"
                    onClick={() => toast.info("Searching for raid targets...")}
                  >
                    <Radio className="h-4 w-4 mr-2" />
                    Raid
                  </Button>
                </div>
              </WidgetCard>
            </div>
          </div>
        </div>

        {/* Chat Preview (Hidden on Mobile) */}
        <ChatPanel className="hidden xl:flex w-80 border-l border-border bg-black/20" />
      </div>
    </MainLayout>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}