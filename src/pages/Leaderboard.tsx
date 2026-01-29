import { MainLayout } from '@/components/layout/MainLayout';
import { channels } from '@/data/dummy';
import { Trophy, Sword, Zap, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Leaderboard() {
    // Sort for streamers (Daredevils)
    const topStreamers = [...channels].sort((a, b) => b.viewers - a.viewers);

    // Fake top darers (Viewers who tip most)
    const topDarers = [
        { id: '1', name: 'GamerX_99', amount: '25,400', dares: 12, avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100' },
        { id: '2', name: 'QuestSeeker', amount: '18,200', dares: 8, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
        { id: '3', name: 'LegendaryLord', amount: '12,900', dares: 7, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
        { id: '4', name: 'NightFury', amount: '9,500', dares: 6, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
        { id: '5', name: 'ShadowBoxer', amount: '8,200', dares: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
    ];

    return (
        <MainLayout>
            <div className="p-6 max-w-5xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black italic tracking-tighter text-gradient uppercase mb-2">The Hall of Dares</h1>
                    <p className="text-muted-foreground uppercase tracking-[0.3em] text-[10px] font-bold">LEGENDS OF THE DARER ARENA</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Top Daredevils (Streamers) */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-[var(--cs-magenta)]/30 pb-4">
                            <Sword className="h-6 w-6 text-[var(--cs-magenta)]" />
                            <h2 className="text-xl font-black italic uppercase">Top Daredevils</h2>
                        </div>

                        <div className="space-y-3">
                            {topStreamers.slice(0, 5).map((streamer, idx) => (
                                <div key={streamer.id} className="group relative bg-twitch-surface p-4 rounded-lg border border-border hover:border-[var(--cs-magenta)]/50 transition-all flex items-center gap-4 overflow-hidden">
                                    {/* Rank Glow */}
                                    <div className={cn(
                                        "absolute -left-4 -top-4 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity",
                                        idx === 0 ? "bg-[var(--cs-yellow)] opacity-10" : "bg-[var(--cs-magenta)]"
                                    )} />

                                    <div className="relative z-10 font-black italic text-2xl w-8 text-muted-foreground group-hover:text-foreground transition-colors italic">
                                        #{idx + 1}
                                    </div>

                                    <div className="relative flex-shrink-0">
                                        <img src={streamer.avatar} className="w-12 h-12 rounded-full border-2 border-border group-hover:border-[var(--cs-magenta)]" alt="" />
                                        {idx === 0 && <Trophy className="absolute -top-2 -right-2 h-5 w-5 text-[var(--cs-yellow)] drop-shadow-[0_0_8px_var(--cs-yellow)]" />}
                                    </div>

                                    <div className="flex-1">
                                        <p className="font-bold group-hover:text-[var(--cs-cyan)] transition-colors">{streamer.displayName}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-black uppercase tracking-wider">{streamer.category}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-black text-[var(--cs-green)] uppercase tracking-tighter">84% Completion</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold">{streamer.viewers.toLocaleString()} Points</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Darers (Viewers) */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-[var(--cs-cyan)]/30 pb-4">
                            <Zap className="h-6 w-6 text-[var(--cs-cyan)]" />
                            <h2 className="text-xl font-black italic uppercase">Legendary Darers</h2>
                        </div>

                        <div className="space-y-3">
                            {topDarers.map((darer, idx) => (
                                <div key={darer.id} className="group relative bg-twitch-surface p-4 rounded-lg border border-border hover:border-[var(--cs-cyan)]/50 transition-all flex items-center gap-4 overflow-hidden">
                                    <div className="absolute -left-4 -top-4 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity bg-[var(--cs-cyan)]" />

                                    <div className="relative z-10 font-black italic text-2xl w-8 text-muted-foreground group-hover:text-foreground transition-colors italic">
                                        #{idx + 1}
                                    </div>

                                    <img src={darer.avatar} className="w-12 h-12 rounded-full border-2 border-border group-hover:border-[var(--cs-cyan)]" alt="" />

                                    <div className="flex-1">
                                        <p className="font-bold group-hover:text-[var(--cs-green)] transition-colors">{darer.name}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-black uppercase tracking-wider">{darer.dares} Dares Set</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-black text-[var(--cs-yellow)] uppercase tracking-tighter">Bounty King</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{darer.amount} Bits</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Global Stats Footer */}
                <div className="mt-12 p-8 bg-gradient-to-r from-background via-twitch-surface to-background rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-8 mb-4">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-black italic text-gradient tracking-tighter">14,204</span>
                            <span className="text-[10px] text-muted-foreground uppercase font-black uppercase tracking-[0.2em]">Total Dares Completed</span>
                        </div>
                        <div className="w-px h-10 bg-border" />
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-black italic text-gradient tracking-tighter">$1.2M+</span>
                            <span className="text-[10px] text-muted-foreground uppercase font-black uppercase tracking-[0.2em]">Bounties Distributed</span>
                        </div>
                    </div>
                    <p className="max-w-md text-xs text-muted-foreground leading-relaxed">
                        The leaderboard resets every month. Top performers receive exclusive <span className="text-[var(--cs-cyan)]">Cyber-Badges</span> and platform-wide recognition.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}
