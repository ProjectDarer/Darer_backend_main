import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, User, ChevronDown, Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { userProfile, notifications } from '@/data/dummy';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function TopNavbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowMobileSearch(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-twitch-surface/95 backdrop-blur-md border-b border-border z-50">
      <div className="h-full flex items-center justify-between px-4">
        {/* Mobile Search Overlay */}
        {showMobileSearch && (
          <div className="absolute inset-0 bg-background z-[60] flex items-center px-4 animate-in slide-in-from-top duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setShowMobileSearch(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative group">
              <Input
                autoFocus
                type="text"
                placeholder="Search creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-black/20 border-border focus:border-[var(--cs-cyan)] pr-10"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 text-[var(--cs-cyan)]"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Left Section - Logo */}
        <div className={cn("flex items-center gap-4", showMobileSearch && "invisible md:visible")}>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img className='h-8 w-8 relative z-10' src="/logo.png" alt="DARER" />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">DARER</span>
          </Link>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--cs-cyan)] via-[var(--cs-green)] to-[var(--cs-yellow)] rounded-lg blur opacity-20 group-focus-within:opacity-75 transition duration-500"></div>
            <Input
              type="text"
              placeholder="Search creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              className="relative bg-background border-border focus:border-transparent pr-10"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[var(--cs-green)]"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className={cn("flex items-center gap-2", showMobileSearch && "invisible md:visible")}>
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden btn-cyber-action text-[var(--cs-cyan)]"
            onClick={() => setShowMobileSearch(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Balance Indicator - NEW for Darer */}
          <Link to="/wallet" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 border border-border hover:border-[var(--cs-green)] hover:bg-[var(--cs-green)]/5 transition-all group mr-2">
            <Zap className="h-4 w-4 text-[var(--cs-green)] group-hover:drop-shadow-[0_0_8px_var(--cs-green)]" />
            <span className="text-xs font-black italic tracking-tighter">1,200 <span className="text-muted-foreground font-medium text-[10px] uppercase ml-1">Bits</span></span>
          </Link>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative btn-cyber-action"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--cs-yellow)] text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_var(--cs-yellow)]">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-twitch-surface border border-[var(--cs-green)]/30 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-fade-in overflow-hidden">
                <div className="p-3 border-b border-border flex items-center justify-between bg-[var(--cs-green)]/5">
                  <h3 className="font-semibold text-[var(--cs-green)]">Notifications</h3>
                  <Link to="/notifications" className="text-sm text-muted-foreground hover:text-white">
                    View All
                  </Link>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 5).map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "p-3 hover:bg-white/5 transition-colors cursor-pointer border-b border-border last:border-0",
                        !notif.read && "bg-[var(--cs-green)]/10 border-l-2 border-l-[var(--cs-green)]"
                      )}
                    >
                      <div className="flex gap-3">
                        {notif.avatar && (
                          <img src={notif.avatar} alt="" className="w-8 h-8 rounded-full flex-shrink-0 ring-1 ring-[var(--cs-green)]/50" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{notif.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{notif.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              className="gap-2 px-2 btn-cyber-action border-none hover:bg-white/5"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.displayName}
                  className="w-7 h-7 rounded-full ring-2 ring-[var(--cs-magenta)]"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[var(--cs-green)] border-2 border-background rounded-full"></span>
              </div>
              <ChevronDown className="h-4 w-4 hidden sm:block" />
            </Button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-twitch-surface border border-[var(--cs-cyan)]/30 rounded-lg shadow-xl animate-fade-in overflow-hidden z-50">
                {/* ... existing user menu content ... */}
                <div className="p-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <img src={userProfile.avatar} alt="" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold">{userProfile.displayName}</p>
                      <p className="text-xs text-[var(--cs-green)]">Online</p>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <Link to="/channel/mystream" className="block px-4 py-2 text-sm hover:bg-[var(--cs-cyan)]/10 hover:text-[var(--cs-cyan)] transition-colors">Channel</Link>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-[var(--cs-cyan)]/10 hover:text-[var(--cs-cyan)] transition-colors">Creator Dashboard</Link>
                  <Link to="/wallet" className="block px-4 py-2 text-sm hover:bg-[var(--cs-cyan)]/10 hover:text-[var(--cs-cyan)] transition-colors">Wallet</Link>
                  <Link to="/analytics" className="block px-4 py-2 text-sm hover:bg-[var(--cs-cyan)]/10 hover:text-[var(--cs-cyan)] transition-colors">Analytics</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-[var(--cs-cyan)]/10 hover:text-[var(--cs-cyan)] transition-colors">Settings</Link>
                </div>
                <div className="border-t border-border py-1">
                  <Link to="/login" className="block px-4 py-2 text-sm text-[var(--cs-magenta)] hover:bg-[var(--cs-magenta)]/10 transition-colors">Log Out</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}