import { useState } from 'react';
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
  Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const [streamTitle, setStreamTitle] = useState('My Amazing Stream 🎮');
  const [selectedCategory, setSelectedCategory] = useState('Just Chatting');
  const [tags, setTags] = useState(['English', 'Chill', 'Interactive']);
  const [showStreamKey, setShowStreamKey] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const streamStats = {
    viewers: 1234,
    bitrate: 6000,
    fps: 60,
    uptime: '2h 15m',
    peakViewers: 2156,
  };

  const recentActivity = notifications.slice(0, 5);

  return (
    <MainLayout>
      {/* UPDATED LAYOUT:
        - Mobile: Block layout with auto height (allows scrolling behind bottom bar)
        - Desktop (md+): Flex layout with fixed height (split pane app-feel)
      */}
      <div className="block md:flex h-auto md:h-[calc(100vh-3.5rem)]">
        
        {/* Main Dashboard Content */}
        {/* Mobile: w-full, remove overflow-y-auto so the window scrolls */}
        <div className="flex-1 md:overflow-y-auto p-4 md:p-6 w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gradient">Creator Dashboard</h1>
              <p className="text-muted-foreground text-sm">Manage your stream and view analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border",
                isLive 
                  ? "bg-[var(--cs-magenta)]/20 text-[var(--cs-magenta)] border-[var(--cs-magenta)] shadow-[0_0_10px_var(--cs-glow-soft)]" 
                  : "bg-muted text-muted-foreground border-border"
              )}>
                <Radio className={cn("h-4 w-4", isLive && "animate-pulse-live")} />
                {isLive ? 'LIVE' : 'OFFLINE'}
              </div>
              <button 
                className={cn(
                  "px-4 py-2 rounded-md font-bold transition-all duration-300 text-sm flex-1 md:flex-none",
                  isLive 
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]" 
                    : "btn-cyber-brand"
                )}
                onClick={() => setIsLive(!isLive)}
              >
                {isLive ? 'End Stream' : 'Go Live'}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stream Settings Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stream Info */}
              <WidgetCard title="Stream Information">
                <div className="space-y-4">
                  {/* Thumbnail */}
                  <div>
                    <label className="text-sm font-medium mb-2 block text-[var(--cs-yellow)]">Stream Thumbnail</label>
                    <div className="aspect-video w-full max-w-xs rounded-lg bg-twitch-hover border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-[var(--cs-green)] hover:bg-[var(--cs-green)]/5 transition-colors group">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2 group-hover:text-[var(--cs-green)]" />
                      <span className="text-sm text-muted-foreground group-hover:text-[var(--cs-green)]">Click to upload</span>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="text-sm font-medium mb-2 block text-[var(--cs-cyan)]">Stream Title</label>
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
                    <label className="text-sm font-medium mb-2 block text-[var(--cs-green)]">Category</label>
                    <div className="flex gap-2">
                      <Input
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        placeholder="Select a category"
                        className="focus-visible:ring-[var(--cs-green)] border-border bg-black/20"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-sm font-medium mb-2 block text-[var(--cs-magenta)]">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-[var(--cs-magenta)]/10 border border-[var(--cs-magenta)]/30 text-[var(--cs-magenta)] text-sm rounded-full flex items-center gap-1"
                        >
                          {tag}
                          <button 
                            onClick={() => setTags(tags.filter(t => t !== tag))}
                            className="hover:bg-[var(--cs-magenta)] hover:text-white rounded-full p-0.5 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                      <button className="px-2 py-1 bg-twitch-surface border border-border text-sm rounded-full flex items-center gap-1 hover:border-[var(--cs-yellow)] hover:text-[var(--cs-yellow)] transition-colors">
                        <Plus className="h-3 w-3" />
                        Add Tag
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">Add up to 10 tags to help viewers find your stream</p>
                  </div>

                  <div className="pt-2">
                     <button className="btn-cyber-brand w-full sm:w-auto">Save Changes</button>
                  </div>
                </div>
              </WidgetCard>

              {/* Stream Key */}
              <WidgetCard title="Stream Key & URL">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Primary Stream Key</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1 min-w-0">
                        <Input
                          type={showStreamKey ? 'text' : 'password'}
                          value={userProfile.streamKey}
                          readOnly
                          className="pr-10 font-mono text-sm bg-black/40 border-[var(--cs-magenta)]/30 focus-visible:ring-[var(--cs-magenta)]"
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setShowStreamKey(!showStreamKey)}
                        className="border border-border hover:border-[var(--cs-cyan)] hover:text-[var(--cs-cyan)] flex-shrink-0"
                      >
                        {showStreamKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" className="border border-border hover:border-[var(--cs-green)] hover:text-[var(--cs-green)] flex-shrink-0">Copy</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Never share your stream key with anyone
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Stream URL</label>
                    <Input
                      value="rtmp://live.streamhub.tv/live"
                      readOnly
                      className="font-mono text-sm bg-black/40 border-border"
                    />
                  </div>

                  <Button variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-500/10 w-full sm:w-auto">Reset Stream Key</Button>
                </div>
              </WidgetCard>
            </div>

            {/* Stats Column */}
            <div className="space-y-6">
              {/* Live Stats */}
              <WidgetCard title="Stream Stats">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {/* Viewers - Cyan */}
                    <div className="bg-twitch-hover/50 border border-border rounded-lg p-3 hover:border-[var(--cs-cyan)] transition-colors">
                      <div className="flex items-center gap-2 text-[var(--cs-cyan)] mb-1">
                        <Users className="h-4 w-4" />
                        <span className="text-[10px] md:text-xs font-bold uppercase">Viewers</span>
                      </div>
                      <p className="text-xl md:text-2xl font-bold">{isLive ? streamStats.viewers.toLocaleString() : '—'}</p>
                    </div>
                    {/* Peak - Magenta */}
                    <div className="bg-twitch-hover/50 border border-border rounded-lg p-3 hover:border-[var(--cs-magenta)] transition-colors">
                      <div className="flex items-center gap-2 text-[var(--cs-magenta)] mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-[10px] md:text-xs font-bold uppercase">Peak</span>
                      </div>
                      <p className="text-xl md:text-2xl font-bold">{isLive ? streamStats.peakViewers.toLocaleString() : '—'}</p>
                    </div>
                    {/* Bitrate - Green */}
                    <div className="bg-twitch-hover/50 border border-border rounded-lg p-3 hover:border-[var(--cs-green)] transition-colors">
                      <div className="flex items-center gap-2 text-[var(--cs-green)] mb-1">
                        <Wifi className="h-4 w-4" />
                        <span className="text-[10px] md:text-xs font-bold uppercase">Bitrate</span>
                      </div>
                      <p className="text-xl md:text-2xl font-bold">{isLive ? `${streamStats.bitrate}` : '—'}</p>
                    </div>
                    {/* Uptime - Yellow */}
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
                  <Button variant="ghost" size="sm" className="justify-start border border-border hover:border-[var(--cs-cyan)] hover:text-[var(--cs-cyan)] hover:bg-[var(--cs-cyan)]/10">
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start border border-border hover:border-[var(--cs-yellow)] hover:text-[var(--cs-yellow)] hover:bg-[var(--cs-yellow)]/10">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
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