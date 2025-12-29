import { MainLayout } from '@/components/layout/MainLayout';
import { notifications } from '@/data/dummy';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Users, 
  Star, 
  Radio, 
  AtSign, 
  Settings,
  Check,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

type NotificationTab = 'all' | 'mentions' | 'system';

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');
  const [notifs, setNotifs] = useState(notifications);

  const filteredNotifications = notifs.filter(notif => {
    if (activeTab === 'all') return true;
    if (activeTab === 'mentions') return notif.type === 'mention';
    if (activeTab === 'system') return notif.type === 'system';
    return true;
  });

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'follow':
        return <Users className="h-4 w-4 text-[var(--cs-magenta)]" />;
      case 'subscription':
        return <Star className="h-4 w-4 text-[var(--cs-yellow)]" />;
      case 'raid':
        return <Radio className="h-4 w-4 text-[var(--cs-cyan)]" />;
      case 'mention':
        return <AtSign className="h-4 w-4 text-[var(--cs-green)]" />;
      case 'system':
        return <Settings className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gradient">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your channel activity</p>
          </div>
          <Button 
            variant="ghost" 
            className="border border-border hover:border-[var(--cs-green)] hover:text-[var(--cs-green)] hover:bg-[var(--cs-green)]/10"
            onClick={markAllRead}
          >
            <Check className="h-4 w-4 mr-2" />
            Mark all read
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'mentions', 'system'] as NotificationTab[]).map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "capitalize border transition-all duration-300",
                activeTab === tab 
                  ? "border-[var(--cs-cyan)] bg-[var(--cs-cyan)]/10 text-[var(--cs-cyan)] shadow-[0_0_10px_rgba(0,255,247,0.2)]" 
                  : "border-transparent bg-black/20 text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === 'all' && <Bell className="h-4 w-4 mr-2" />}
              {tab === 'mentions' && <AtSign className="h-4 w-4 mr-2" />}
              {tab === 'system' && <Settings className="h-4 w-4 mr-2" />}
              {tab}
            </Button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <div 
                key={notif.id}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer group hover:bg-white/5",
                  notif.read 
                    ? "bg-twitch-surface border border-transparent" 
                    : "bg-twitch-surface border-l-4 border-l-[var(--cs-magenta)] border-y border-r border-transparent shadow-[inset_0_0_20px_rgba(255,0,255,0.05)]"
                )}
              >
                {/* Icon */}
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                    notif.read ? "bg-black/20" : "bg-[var(--cs-magenta)]/10 ring-1 ring-[var(--cs-magenta)]/30"
                )}>
                  {notif.avatar ? (
                    <img src={notif.avatar} alt="" className="w-10 h-10 rounded-full ring-1 ring-border" />
                  ) : (
                    getNotificationIcon(notif.type)
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("font-semibold", !notif.read && "text-[var(--cs-cyan)]")}>{notif.title}</span>
                    {!notif.read && (
                      <span className="w-2 h-2 bg-[var(--cs-magenta)] rounded-full animate-pulse" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1 text-[var(--cs-green)]">
                    {formatDistanceToNow(notif.timestamp, { addSuffix: true })}
                  </p>
                </div>

                {/* Actions */}
                <Button 
                  variant="ghost" 
                  size="icon-sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-twitch-surface rounded-lg border border-border border-dashed">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}