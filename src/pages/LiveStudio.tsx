import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { Button } from '@/components/ui/button';
import {
    Users,
    Settings,
    Activity,
    Clock,
    Wifi,
    Eye,
    Heart,
    MessageSquare,
    AlertCircle,
    Video,
    Mic,
    MicOff,
    Camera,
    CameraOff,
    Share2,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function LiveStudio() {
    const navigate = useNavigate();
    const [uptime, setUptime] = useState('00:00:00');
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const [streamQuality, setStreamQuality] = useState('Excellent');

    // Simulate Uptime
    useEffect(() => {
        const start = Date.now();
        const interval = setInterval(() => {
            const diff = Date.now() - start;
            const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
            const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
            const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
            setUptime(`${h}:${m}:${s}`);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleEndStream = () => {
        toast.info('Ending stream...', {
            description: 'Successfully disconnected from ingest server.',
        });
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <MainLayout>
            <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
                {/* Left Side: Stream Content & Controls */}
                <div className="flex-1 flex flex-col min-w-0 bg-background">
                    {/* Top Bar - Stream Info */}
                    <div className="bg-twitch-surface border-b border-border p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-bold animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                                <Video className="h-4 w-4" />
                                LIVE
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-lg font-bold truncate">My Amazing Stream 🎮</h1>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {uptime}</span>
                                    <span className="flex items-center gap-1 text-[var(--cs-cyan)]"><Eye className="h-3 w-3" /> 1,234</span>
                                    <span className="flex items-center gap-1 text-[var(--cs-magenta)]"><Heart className="h-3 w-3" /> 85</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="destructive"
                                className="font-bold shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                                onClick={handleEndStream}
                            >
                                End Stream
                            </Button>
                        </div>
                    </div>

                    {/* Main Content Area - Grid */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        <div className="grid grid-cols-12 gap-4 h-full">

                            {/* Large Preview Pane */}
                            <div className="col-span-12 xl:col-span-8 space-y-4">
                                <div className="relative aspect-video bg-black rounded-xl border border-border overflow-hidden shadow-2xl group">
                                    {/* Fake Video Feed */}
                                    <img
                                        src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1280&h=720&fit=crop"
                                        alt="Stream Preview"
                                        className="w-full h-full object-cover opacity-80"
                                    />

                                    {/* Control Overlays (Top) */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <div className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-mono text-[var(--cs-green)] border border-[var(--cs-green)]/30">
                                            1080p60 • 5800kbps • NVENC
                                        </div>
                                    </div>

                                    {/* Active Dare Overlay - NEW FOR STUDIO */}
                                    <div className="absolute top-4 right-4 animate-in slide-in-from-right duration-500">
                                        <div className="bg-[var(--cs-yellow)]/90 backdrop-blur-sm p-3 rounded-lg border border-black/20 shadow-[0_0_20px_var(--cs-glow-cyan)] max-w-[200px]">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Sword className="h-3 w-3 text-black" />
                                                <span className="text-[10px] font-black uppercase text-black">Active Dare</span>
                                            </div>
                                            <p className="text-xs font-bold text-black leading-tight">"Win using only common loot"</p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-[10px] font-mono text-black/70 italic">5,000 Bits Bounty</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Control Overlays (Bottom) */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={cn("rounded-full h-10 w-10", isMicOn ? "text-[var(--cs-green)] hover:bg-[var(--cs-green)]/10" : "text-red-500 hover:bg-red-500/10")}
                                            onClick={() => setIsMicOn(!isMicOn)}
                                        >
                                            {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={cn("rounded-full h-10 w-10", isCameraOn ? "text-[var(--cs-cyan)] hover:bg-[var(--cs-cyan)]/10" : "text-red-500 hover:bg-red-500/10")}
                                            onClick={() => setIsCameraOn(!isCameraOn)}
                                        >
                                            {isCameraOn ? <Camera className="h-5 w-5" /> : <CameraOff className="h-5 w-5" />}
                                        </Button>
                                        <div className="w-[1px] h-6 bg-white/10 mx-1" />
                                        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 hover:text-[var(--cs-yellow)]">
                                            <Settings className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="bg-twitch-surface p-4 rounded-lg border border-border">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Stream Health</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[var(--cs-green)] shadow-[0_0_8px_var(--cs-green)]" />
                                            <span className="font-bold text-[var(--cs-green)]">{streamQuality}</span>
                                        </div>
                                    </div>
                                    <div className="bg-twitch-surface p-4 rounded-lg border border-border">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Dropped Frames</p>
                                        <p className="font-bold">0 (0.0%)</p>
                                    </div>
                                    <div className="bg-twitch-surface p-4 rounded-lg border border-border">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">New Followers</p>
                                        <p className="font-bold text-[var(--cs-magenta)]">+12</p>
                                    </div>
                                    <div className="bg-twitch-surface p-4 rounded-lg border border-border">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Top Gifter</p>
                                        <p className="font-bold text-[var(--cs-yellow)]">GamerX_99</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side Cards (Studio) */}
                            <div className="col-span-12 xl:col-span-4 space-y-4">
                                <WidgetCard title="Activity Feed" className="h-[300px] flex flex-col">
                                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                                        {[
                                            { type: 'sub', user: 'CoolViewer123', msg: 'Subscribed for 6 months!', time: '2m ago', color: 'text-[var(--cs-yellow)]' },
                                            { type: 'follow', user: 'new_gamer_01', msg: 'just followed!', time: '5m ago', color: 'text-[var(--cs-cyan)]' },
                                            { type: 'gift', user: 'GiftMaster', msg: 'gifted 5 subs!', time: '12m ago', color: 'text-[var(--cs-magenta)]' },
                                            { type: 'raid', user: 'BigStreamer', msg: 'raiding with 450 viewers!', time: '20m ago', color: 'text-[var(--cs-green)]' },
                                        ].map((item, idx) => (
                                            <div key={idx} className="p-2 rounded bg-black/20 border-l-2 border-border hover:border-current transition-colors group">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className={cn("text-xs font-black uppercase", item.color)}>{item.type}</span>
                                                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                                                </div>
                                                <p className="text-sm">
                                                    <span className="font-bold">{item.user}</span> {item.msg}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </WidgetCard>

                                <WidgetCard title="Quick Actions">
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            variant="outline"
                                            className="text-xs h-12 border-border hover:border-[var(--cs-magenta)] hover:bg-[var(--cs-magenta)]/5"
                                            onClick={() => toast.success("Poll configuration opened!")}
                                        >
                                            <Activity className="h-4 w-4 mr-2" /> Start Poll
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="text-xs h-12 border-border hover:border-[var(--cs-cyan)] hover:bg-[var(--cs-cyan)]/5"
                                            onClick={() => toast.success("Shoutout queued!")}
                                        >
                                            <Share2 className="h-4 w-4 mr-2" /> Shoutout
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="text-xs h-12 border-border hover:border-[var(--cs-green)] hover:bg-[var(--cs-green)]/5"
                                            onClick={() => toast.info("Ad break starting in 30s...")}
                                        >
                                            <AlertCircle className="h-4 w-4 mr-2" /> Ad Break
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="text-xs h-12 border-border hover:border-[var(--cs-yellow)] hover:bg-[var(--cs-yellow)]/5"
                                            onClick={() => toast.warning("Chat has been cleared.")}
                                        >
                                            <MessageSquare className="h-4 w-4 mr-2" /> Clear Chat
                                        </Button>
                                    </div>
                                </WidgetCard>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Chat Panel - Fixed on Right for Desktop */}
                <ChatPanel className="w-full lg:w-80 border-l border-border bg-black/20" />
            </div>
        </MainLayout>
    );
}
