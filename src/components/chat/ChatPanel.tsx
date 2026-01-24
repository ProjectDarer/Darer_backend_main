import { useState } from 'react';
import { toast } from 'sonner';
import { Send, Settings, Users, Gift, Smile, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatMessages, ChatMessage } from '@/data/dummy';
import { cn } from '@/lib/utils';

interface ChatPanelProps {
  className?: string;
}

export function ChatPanel({ className }: ChatPanelProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: 'mystream',
      displayName: 'MyStream',
      message: message.trim(),
      color: '#00fff7', // Default to Cyan for user
      badges: ['broadcaster'],
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'broadcaster':
        return <span className="px-1 py-[1px] bg-[var(--cs-magenta)] text-white text-[9px] font-bold uppercase rounded tracking-wider shadow-[0_0_5px_var(--cs-glow-soft)]">LIVE</span>;
      case 'moderator':
        return <span className="px-1 py-[1px] bg-[var(--cs-green)] text-black text-[9px] font-bold uppercase rounded tracking-wider shadow-[0_0_5px_var(--cs-glow-green)]">MOD</span>;
      case 'vip':
        return <span className="px-1 py-[1px] bg-[var(--cs-cyan)] text-black text-[9px] font-bold uppercase rounded tracking-wider">VIP</span>;
      case 'subscriber':
        return <span className="text-[var(--cs-yellow)] text-[10px]">★</span>;
      default:
        return null;
    }
  };

  return (
    <div className={cn("flex flex-col bg-twitch-surface border-l border-border", className)}>
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-background/50 backdrop-blur-sm">
        <h3 className="font-semibold text-sm uppercase tracking-wide text-[var(--cs-cyan)]">Stream Chat</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" className="hover:text-[var(--cs-green)]">
            <Users className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="hover:text-[var(--cs-yellow)]">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className="group hover:bg-white/5 rounded px-2 py-1 -mx-2 transition-colors">
            <div className="inline-block align-top">
              <span className="inline-flex items-center gap-1.5 align-baseline mr-1.5">
                {msg.badges.map((badge) => (
                  <span key={badge} className="align-middle">{getBadgeIcon(badge)}</span>
                ))}
                <span
                  className="font-bold text-sm cursor-pointer hover:underline shadow-sm"
                  style={{ color: msg.color }}
                >
                  {msg.displayName}
                </span>
                <span className="text-muted-foreground text-xs">:</span>
              </span>
              <span className="text-sm text-foreground/90 break-words leading-relaxed">{msg.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-border bg-background/30">
        <div className="flex gap-2">
          <div className="relative flex-1 group">
            <Input
              placeholder="Send a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="pr-20 border-border bg-black/20 focus-visible:ring-[var(--cs-cyan)] transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-muted-foreground hover:text-[var(--cs-yellow)]">
                <Smile className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-muted-foreground hover:text-[var(--cs-cyan)]" onClick={() => toast.success("Select tip amount...")}>
                <Zap className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-muted-foreground hover:text-[var(--cs-magenta)]">
                <Gift className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            className="btn-cyber-brand px-3"
            size="icon"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-[10px] text-[var(--cs-green)] font-mono">
            Balance: 1,200 bits
          </p>
          <p className="text-[10px] text-muted-foreground">
            Chat rules apply
          </p>
        </div>
      </div>
    </div>
  );
}