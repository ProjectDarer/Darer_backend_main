import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StreamCard } from '@/components/cards/StreamCard';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { channels, categories } from '@/data/dummy';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'list';
type BrowseTab = 'categories' | 'live';

export default function Browse() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTab, setActiveTab] = useState<BrowseTab>('categories');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredChannels = channels.filter(channel =>
    channel.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    channel.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2 text-gradient tracking-tight">Browse</h1>
          <p className="text-muted-foreground">Discover live streams, categories, and creators</p>
        </div>

        {/* Tabs & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-black/20 rounded-lg border border-border/50">
            <button
              className={cn(
                "px-4 py-2 rounded-md font-bold text-sm transition-all duration-300",
                activeTab === 'categories'
                  ? "bg-[var(--cs-cyan)] text-black shadow-[0_0_10px_var(--cs-glow-cyan)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
              onClick={() => setActiveTab('categories')}
            >
              Categories
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-md font-bold text-sm transition-all duration-300",
                activeTab === 'live'
                  ? "bg-[var(--cs-magenta)] text-white shadow-[0_0_10px_var(--cs-glow-soft)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
              onClick={() => setActiveTab('live')}
            >
              Live Channels
            </button>
          </div>

          {/* Search & View Controls */}
          <div className="flex gap-2 flex-1 sm:justify-end">
            <div className="relative flex-1 sm:max-w-xs group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[var(--cs-cyan)] transition-colors" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/20 border-border focus-visible:ring-[var(--cs-cyan)]"
              />
            </div>
            <Button variant="outline" size="icon" className="border-border hover:border-[var(--cs-green)] hover:text-[var(--cs-green)] hover:bg-[var(--cs-green)]/10">
              <Filter className="h-4 w-4" />
            </Button>
            <div className="flex border border-border rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none hover:text-[var(--cs-cyan)]",
                  viewMode === 'grid' && "bg-[var(--cs-cyan)]/20 text-[var(--cs-cyan)]"
                )}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none hover:text-[var(--cs-cyan)]",
                  viewMode === 'list' && "bg-[var(--cs-cyan)]/20 text-[var(--cs-cyan)]"
                )}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Gaming', 'IRL', 'Music', 'Esports', 'Creative', 'Just Chatting'].map((tag) => (
            <button
              key={tag}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-300",
                tag === 'All'
                  ? "bg-[var(--cs-yellow)] text-black border-[var(--cs-yellow)] shadow-[0_0_10px_rgba(255,255,0,0.3)]"
                  : "bg-transparent border-border text-muted-foreground hover:border-[var(--cs-cyan)] hover:text-[var(--cs-cyan)] hover:shadow-[0_0_10px_var(--cs-glow-cyan)]"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'categories' ? (
          <div className={cn(
            "grid gap-4",
            viewMode === 'grid'
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
              : "grid-cols-1"
          )}>
            {filteredCategories.map((category, index) => (
              <div key={category.id} style={{ animationDelay: `${index * 30}ms` }}>
                <CategoryCard category={category} variant={viewMode === 'list' ? 'compact' : 'default'} />
              </div>
            ))}
          </div>
        ) : (
          <div className={cn(
            "grid gap-4",
            viewMode === 'grid'
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          )}>
            {filteredChannels.map((channel, index) => (
              <div key={channel.id} style={{ animationDelay: `${index * 30}ms` }}>
                <StreamCard channel={channel} variant={viewMode === 'list' ? 'compact' : 'default'} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {((activeTab === 'categories' && filteredCategories.length === 0) ||
          (activeTab === 'live' && filteredChannels.length === 0)) && (
            <div className="text-center py-20 border-2 border-dashed border-border/50 rounded-xl">
              <div className="w-20 h-20 bg-[var(--cs-magenta)]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--cs-magenta)]/30">
                <Search className="h-10 w-10 text-[var(--cs-magenta)]" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-foreground">No results found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">We couldn't find any content matching your filters. Try searching for something else or clear your filters.</p>
            </div>
          )}
      </div>
    </MainLayout>
  );
}