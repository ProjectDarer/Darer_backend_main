import { MainLayout } from '@/components/layout/MainLayout';
import { StreamCard } from '@/components/cards/StreamCard';
import { channels } from '@/data/dummy';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const liveChannels = channels.filter(c => c.isLive);

  return (
    <MainLayout>
      <div className="p-6 space-y-12">
        {/* Welcome Hero */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="relative group">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
              CHALLENGE <span className="text-gradient">ACCEPTED.</span><br />
              SKILL <span className="text-[var(--cs-yellow)]">PROVEN.</span>
            </h1>
            <p className="max-w-xl text-muted-foreground text-lg mb-8 border-l-2 border-[var(--cs-cyan)] pl-4">
              Welcome to Darer. The ultimate streaming platform where viewers set the stakes and creators push their limits.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/search" className="btn-cyber-brand">Start Watching</Link>
              <Link to="/dashboard" className="px-6 py-3 rounded-lg border border-border hover:border-[var(--cs-cyan)] hover:text-[var(--cs-cyan)] transition-all font-bold">Start Streaming</Link>
            </div>
          </div>
        </section>

        {/* Hero Section - Featured Stream */}
        <section className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[var(--cs-magenta)]/10 via-background to-[var(--cs-cyan)]/10 border border-white/5 group">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
          <div className="relative p-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--cs-magenta)]" />
              Featured Broadcast
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="aspect-video rounded-lg overflow-hidden bg-twitch-surface relative group/video">
                <img
                  src={liveChannels[0]?.thumbnail}
                  alt={liveChannels[0]?.streamTitle}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2 text-white">
                  <span className="px-2 py-0.5 bg-[var(--cs-magenta)] text-xs font-bold uppercase rounded flex items-center gap-1 shadow-[0_0_10px_var(--cs-glow-soft)]">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-live" />
                    Live
                  </span>
                  <span className="px-2 py-0.5 bg-background/80 backdrop-blur-sm text-xs font-medium rounded text-[var(--cs-cyan)] border border-[var(--cs-cyan)]/30">
                    {(liveChannels[0]?.viewers / 1000).toFixed(1)}K viewers
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={liveChannels[0]?.avatar}
                      alt={liveChannels[0]?.displayName}
                      className="w-12 h-12 rounded-full border-2 border-[var(--cs-cyan)]"
                    />
                    <div className="absolute inset-0 rounded-full ring-2 ring-[var(--cs-cyan)] ring-offset-2 ring-offset-background animate-pulse-slow opacity-50"></div>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gradient">{liveChannels[0]?.displayName}</h2>
                    <p className="text-sm text-[var(--cs-green)]">{liveChannels[0]?.category}</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{liveChannels[0]?.streamTitle}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {liveChannels[0]?.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-muted border border-border text-xs rounded hover:border-[var(--cs-yellow)] hover:text-[var(--cs-yellow)] transition-colors cursor-pointer text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/channel/${liveChannels[0]?.username}`}
                  className="inline-flex items-center gap-2 text-[var(--cs-cyan)] hover:text-[var(--cs-green)] hover:underline font-medium transition-colors"
                >
                  Watch Now <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Live Channels Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold border-l-4 border-[var(--cs-magenta)] pl-3">Live Channels</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {liveChannels.slice(0, 8).map((channel, index) => (
              <div key={channel.id} style={{ animationDelay: `${index * 50}ms` }}>
                <StreamCard channel={channel} />
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Channels */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold border-l-4 border-[var(--cs-yellow)] pl-3">Recommended For You</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {liveChannels.slice(2, 6).map((channel, index) => (
              <div key={channel.id} style={{ animationDelay: `${index * 50}ms` }}>
                <StreamCard channel={channel} />
              </div>
            ))}
          </div>
        </section>

        {/* Bounties Spotlight - Strategic for Darer branding */}
        <section className="bg-twitch-surface rounded-2xl border border-white/5 p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--cs-magenta)]/5 to-[var(--cs-cyan)]/5" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">High Stakes <span className="text-[var(--cs-yellow)]">Bounties</span></h2>
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Top pending challenges across the platform</p>
              </div>
              <Link to="/leaderboard" className="btn-cyber-brand h-10 px-6 text-xs transition-transform hover:scale-105">View Hall of Fame</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { user: 'Ninja', bounty: '50,000 Bits', task: 'Win 3 Solo games in a row', color: 'text-[var(--cs-cyan)]' },
                { user: 'shroud', bounty: '25,000 Bits', task: '30 Bomb with only Pistols', color: 'text-[var(--cs-magenta)]' },
                { user: 'xQc', bounty: '15,000 Bits', task: 'React to the top 50 2024 memes without laughing', color: 'text-[var(--cs-yellow)]' }
              ].map((bounty, idx) => (
                <div key={idx} className="bg-black/40 border border-white/5 rounded-xl p-5 hover:border-white/20 transition-all hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-black uppercase text-muted-foreground tracking-tighter">Bounty Target: <span className={bounty.color}>{bounty.user}</span></span>
                    <span className="text-[var(--cs-green)] font-mono font-bold">{bounty.bounty}</span>
                  </div>
                  <p className="text-lg font-bold italic mb-4">"{bounty.task}"</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">34 Pending Bids</span>
                    <button
                      onClick={() => toast.success(`Bounty Contribution open!`, { description: `You are bidding on ${bounty.user}'s challenge.` })}
                      className="text-xs font-black uppercase tracking-tighter hover:text-[var(--cs-cyan)] transition-colors"
                    >
                      Contribute
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}