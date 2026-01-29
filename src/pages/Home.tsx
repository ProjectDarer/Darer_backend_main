import { MainLayout } from '@/components/layout/MainLayout';
import { StreamCard } from '@/components/cards/StreamCard';
import { channels } from '@/data/dummy';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

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

        {/* Hero Section - Intro Video */}
        <section className="relative rounded-2xl overflow-hidden bg-black border border-white/10 group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] z-10 pointer-events-none" />

          <div className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden">
            <video
              src="/original-b90ed611e3408cf48d85ca6a7540234b.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-20 flex flex-col justify-end p-8 md:p-12">
              <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-[var(--cs-magenta)] text-white text-xs font-black uppercase rounded shadow-[0_0_15px_var(--cs-magenta)] tracking-widest">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-[var(--cs-cyan)] text-xs font-bold rounded border border-[var(--cs-cyan)]/30">
                    Intro Experience
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-4 text-white leading-tight">
                  THE FUTURE OF <span className="text-gradient">COMPETITIVE</span> STREAMING
                </h2>
                <p className="text-gray-300 text-lg mb-8 line-clamp-2 md:line-clamp-none max-w-xl font-medium">
                  Experience the next evolution of live entertainment. Darer is where the community sets the challenges and legends are born.
                </p>
                <div className="flex gap-4">
                  <Link to="/signup">
                    <button className="btn-cyber-brand h-12 px-8 text-sm group transition-all hover:scale-105">
                      Join the Evolution
                    </button>
                  </Link>
                  <button
                    onClick={() => toast.info("Darer Platform Guide", { description: "You are being redirected to our interactive onboarding tour." })}
                    className="h-12 px-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all font-bold text-sm"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Scanning Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none z-30 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
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