import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { StreamCard } from '@/components/cards/StreamCard';
import { channels } from '@/data/dummy';
import { Search as SearchIcon, Filter, SlidersHorizontal, AlertCircle, ShoppingBag, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function SearchResults() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState(channels);

    useEffect(() => {
        if (query) {
            const filtered = channels.filter(c =>
                c.displayName.toLowerCase().includes(query.toLowerCase()) ||
                c.streamTitle.toLowerCase().includes(query.toLowerCase()) ||
                c.category.toLowerCase().includes(query.toLowerCase()) ||
                c.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
            );
            setResults(filtered);
        } else {
            setResults(channels);
        }
    }, [query]);

    return (
        <MainLayout>
            <div className="p-4 md:p-6 max-w-7xl mx-auto min-h-screen">
                {/* Search Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-border pb-8">
                    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-[var(--cs-cyan)]/10 rounded-lg">
                                <SearchIcon className="h-6 w-6 text-[var(--cs-cyan)]" />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase">
                                Results for <span className="text-[var(--cs-cyan)]">{query || 'All Channels'}</span>
                            </h1>
                        </div>
                        <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest pl-11">
                            {results.length} Channels Found
                        </p>
                    </div>

                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
                        <Button
                            variant="outline"
                            className="btn-cyber-action border-border hover:border-[var(--cs-cyan)]"
                            onClick={() => toast.info("Filter Options", { description: "Filter results by category, status, and language." })}
                        >
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                        <Button
                            variant="outline"
                            className="btn-cyber-action border-border hover:border-[var(--cs-green)]"
                            onClick={() => toast.info("Sorting Protocol", { description: "Sort by viewers, recent, or completion rate." })}
                        >
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Sort
                        </Button>
                    </div>
                </div>

                {/* Results Grid */}
                {results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                        {results.map((channel, index) => (
                            <div key={channel.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                                <StreamCard channel={channel} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center animate-in zoom-in-95 duration-500">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-[var(--cs-magenta)]/20 blur-[40px] rounded-full scale-150" />
                            <div className="relative w-24 h-24 bg-twitch-surface rounded-2xl border border-[var(--cs-magenta)]/30 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,255,0.1)]">
                                <AlertCircle className="h-12 w-12 text-[var(--cs-magenta)]" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Target Not <span className="text-[var(--cs-magenta)]">Found</span></h2>
                        <p className="text-muted-foreground max-w-md text-sm leading-relaxed mb-8 font-medium">
                            The signal is lost. We couldn't find any creators matching your current parameters. Try widening your search net or checking the coordinates.
                        </p>
                        <Button
                            className="btn-cyber-brand h-12 px-8"
                            onClick={() => navigate('/')}
                        >
                            Return to Base (Home)
                        </Button>
                    </div>
                )}

                {/* Discovery Section - ALWAYS SHOW ON MOBILE IF LOW RESULTS */}
                <div className={cn("mt-20 border-t border-border pt-12 space-y-16", results.length >= 8 && "hidden md:block")}>
                    {/* Suggested Daredevils */}
                    <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter border-l-4 border-[var(--cs-magenta)] pl-4">Suggested <span className="text-[var(--cs-magenta)]">Daredevils</span></h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-[var(--cs-magenta)]"
                                onClick={() => toast.info("Discover More Creators", { description: "Browsing all trending daredevils on DARER." })}
                            >
                                View All
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {channels.slice(0, 4).map((channel) => (
                                <StreamCard key={channel.id} channel={channel} />
                            ))}
                        </div>
                    </section>

                    {/* Top Categories */}
                    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter border-l-4 border-[var(--cs-cyan)] pl-4">Top <span className="text-[var(--cs-cyan)]">Categories</span></h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {['Just Chatting', 'Valorant', 'League of Legends', 'Warzone', 'Minecraft', 'Apex Legends'].map((cat, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        navigate(`/search?q=${encodeURIComponent(cat)}`);
                                        toast.success(`Scanning for ${cat}...`);
                                    }}
                                    className="group relative aspect-[3/4] bg-twitch-surface rounded-xl border border-border overflow-hidden hover:border-[var(--cs-cyan)] transition-all cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(0,255,247,0.15)]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity" />
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <p className="text-sm font-black italic uppercase tracking-tighter group-hover:text-[var(--cs-cyan)] transition-colors">{cat}</p>
                                        <div className="w-4 h-0.5 bg-[var(--cs-cyan)] mt-1 transition-all group-hover:w-full" />
                                    </div>
                                    <img
                                        src={`https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&fit=crop&q=80&sig=${idx}`}
                                        alt={cat}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-50 grayscale group-hover:grayscale-0"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
}
