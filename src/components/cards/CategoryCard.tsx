import { Link } from 'react-router-dom';
import { Category } from '@/data/dummy';

interface CategoryCardProps {
  category: Category;
  variant?: 'default' | 'compact';
}

export function CategoryCard({ category, variant = 'default' }: CategoryCardProps) {
  const formatViewers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (variant === 'compact') {
    return (
      <Link
        to={`/browse/${category.id}`}
        className="group flex items-center gap-4 p-2 rounded-lg hover:bg-twitch-hover transition-colors border border-transparent hover:border-[var(--cs-cyan)]/30"
      >
        {/* Category Image - Smaller in compact mode */}
        <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden bg-twitch-surface">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base truncate group-hover:text-[var(--cs-cyan)] transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground group-hover:text-[var(--cs-green)] transition-colors flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--cs-magenta)]"></span>
            {formatViewers(category.viewers)} joined
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {category.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 bg-twitch-surface border border-border text-[10px] text-muted-foreground rounded group-hover:border-[var(--cs-green)]/50 group-hover:text-[var(--cs-green)] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/browse/${category.id}`}
      className="group block animate-fade-up"
    >
      {/* Category Image */}
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-twitch-surface">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay - Gradient from Magenta to Cyan */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--cs-magenta)]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Border on Hover - Cyan Glow */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--cs-cyan)] group-hover:shadow-[0_0_15px_var(--cs-glow-cyan)] rounded-lg transition-all duration-300" />

        {/* Tag Badge on Image (New) */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-[var(--cs-yellow)] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
            NEW
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-2">
        <h3 className="font-semibold text-sm truncate group-hover:text-[var(--cs-cyan)] transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-muted-foreground group-hover:text-[var(--cs-green)] transition-colors">
          {formatViewers(category.viewers)} joined
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
          {category.tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 bg-twitch-surface border border-transparent text-[10px] text-muted-foreground rounded group-hover:border-[var(--cs-green)]/50 group-hover:text-[var(--cs-green)] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}