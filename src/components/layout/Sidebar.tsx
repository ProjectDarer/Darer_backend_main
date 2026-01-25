import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Heart, Bell, Settings, LayoutDashboard,
  ChevronLeft, ChevronRight, Radio, Wallet as WalletIcon, Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { followedChannels } from '@/data/dummy';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: Home, label: 'Home', path: '/', color: 'text-[var(--cs-cyan)]', activeBg: 'bg-[var(--cs-cyan)]/20' },
  { icon: Heart, label: 'Following', path: '/following', color: 'text-[var(--cs-yellow)]', activeBg: 'bg-[var(--cs-yellow)]/20' },
  { icon: WalletIcon, label: 'Wallet', path: '/wallet', color: 'text-[var(--cs-green)]', activeBg: 'bg-[var(--cs-green)]/20' },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard', color: 'text-[var(--cs-yellow)]', activeBg: 'bg-[var(--cs-yellow)]/20' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: 'text-[var(--cs-magenta)]', activeBg: 'bg-[var(--cs-magenta)]/20' },
];

const bottomItems = [
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* --- DESKTOP SIDEBAR (Hidden on Mobile) --- */}
      <aside
        className={cn(
          "fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-sidebar border-r border-border hidden md:flex flex-col transition-all duration-300 z-40",
          collapsed ? "w-14" : "w-60"
        )}
      >
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute -right-3 top-4 z-50 rounded-full bg-twitch-surface border border-border hover:border-[var(--cs-green)] hover:text-[var(--cs-green)]"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group",
                    isActive
                      ? cn(item.activeBg, item.color)
                      : "text-foreground hover:bg-twitch-hover"
                  )}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0 transition-colors", isActive ? "text-current" : "group-hover:" + item.color)} />
                  {!collapsed && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Followed Channels */}
          {!collapsed && (
            <div className="mt-6 px-2">
              <h3 className="px-3 text-xs font-semibold text-[var(--cs-yellow)] uppercase tracking-wider mb-2">
                Followed Channels
              </h3>
              <div className="space-y-1">
                {followedChannels.map((channel) => (
                  <Link
                    key={channel.id}
                    to={`/channel/${channel.username}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-twitch-hover transition-colors group"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={channel.avatar}
                        alt={channel.displayName}
                        className="w-8 h-8 rounded-full ring-2 ring-transparent group-hover:ring-[var(--cs-green)] transition-all"
                      />
                      {channel.isLive && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--cs-magenta)] rounded-full border-2 border-sidebar animate-pulse" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-[var(--cs-green)] transition-colors">
                        {channel.displayName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {channel.category}
                      </p>
                    </div>
                    {channel.isLive && (
                      <div className="flex items-center gap-1 text-xs text-[var(--cs-magenta)]">
                        <Radio className="h-3 w-3" />
                        <span>{(channel.viewers / 1000).toFixed(1)}K</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {collapsed && (
            <div className="mt-6 px-2 space-y-1">
              {followedChannels.slice(0, 5).map((channel) => (
                <Link
                  key={channel.id}
                  to={`/channel/${channel.username}`}
                  className="flex justify-center py-2 rounded-md hover:bg-twitch-hover transition-colors group"
                >
                  <div className="relative">
                    <img src={channel.avatar} alt={channel.displayName} className="w-8 h-8 rounded-full" />
                    {channel.isLive && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--cs-magenta)] rounded-full border-2 border-sidebar" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Bottom Navigation (Desktop) */}
        <div className="border-t border-border p-2 space-y-1">
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200",
                  isActive
                    ? "bg-twitch-purple/20 text-twitch-purple"
                    : "text-foreground hover:bg-twitch-hover hover:text-[var(--cs-yellow)]"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* --- MOBILE BOTTOM BAR (Visible only on Mobile) --- */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-twitch-surface/95 backdrop-blur-lg border-t border-border z-50 md:hidden flex items-center justify-around px-2 pb-safe">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center w-full h-full gap-1"
            >
              <div className={cn(
                "relative p-1.5 rounded-xl transition-all duration-300",
                isActive && "bg-white/10 shadow-[0_0_15px_var(--cs-glow-cyan)]"
              )}>
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isActive ? item.color : "text-muted-foreground"
                  )}
                />
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-colors",
                isActive ? item.color : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}