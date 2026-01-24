import { MainLayout } from '@/components/layout/MainLayout';
import { StreamCard } from '@/components/cards/StreamCard';
import { channels } from '@/data/dummy';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const liveChannels = channels.filter(c => c.isLive);

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        {/* Hero Section - Featured Stream */}
        <section className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[var(--cs-magenta)]/20 to-background border border-[var(--cs-magenta)]/20">
          <div className="grid lg:grid-cols-2 gap-6 p-6">
            <div className="aspect-video rounded-lg overflow-hidden bg-twitch-surface relative group">
              <img
                src={liveChannels[0]?.thumbnail}
                alt={liveChannels[0]?.streamTitle}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[var(--cs-magenta)] text-white text-xs font-bold uppercase rounded flex items-center gap-1 shadow-[0_0_10px_var(--cs-glow-soft)]">
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
                  <span key={tag} className="px-2 py-1 bg-twitch-surface border border-border text-xs rounded hover:border-[var(--cs-yellow)] hover:text-[var(--cs-yellow)] transition-colors cursor-pointer">
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
      </div>
    </MainLayout>
  );
}