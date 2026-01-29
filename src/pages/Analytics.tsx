import { MainLayout } from '@/components/layout/MainLayout';
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { analyticsData } from '@/data/dummy';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  DollarSign,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Analytics() {
  const latestData = analyticsData[analyticsData.length - 1];
  const previousData = analyticsData[analyticsData.length - 2];

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(change).toFixed(1), isPositive: change >= 0 };
  };

  const stats = [
    {
      label: 'Total Followers',
      value: latestData.followers.toLocaleString(),
      change: calculateChange(latestData.followers, previousData.followers),
      icon: Users,
      color: 'text-[var(--cs-cyan)]',
      bg: 'bg-[var(--cs-cyan)]/10',
    },
    {
      label: 'Total Views',
      value: latestData.views.toLocaleString(),
      change: calculateChange(latestData.views, previousData.views),
      icon: Eye,
      color: 'text-[var(--cs-green)]',
      bg: 'bg-[var(--cs-green)]/10',
    },
    {
      label: 'Stream Hours',
      value: `${latestData.streamHours}h`,
      change: calculateChange(latestData.streamHours, previousData.streamHours),
      icon: Clock,
      color: 'text-[var(--cs-yellow)]',
      bg: 'bg-[var(--cs-yellow)]/10',
    },
    {
      label: 'Revenue',
      value: `$${latestData.revenue}`,
      change: calculateChange(latestData.revenue, previousData.revenue),
      icon: DollarSign,
      color: 'text-[var(--cs-magenta)]',
      bg: 'bg-[var(--cs-magenta)]/10',
    },
  ];

  const maxFollowers = Math.max(...analyticsData.map(d => d.followers));
  const maxViews = Math.max(...analyticsData.map(d => d.views));

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gradient">Analytics</h1>
            <p className="text-muted-foreground">Track your channel performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="border border-border hover:text-[var(--cs-cyan)] hover:border-[var(--cs-cyan)]"
              onClick={() => toast.info("Date Range Picker", { description: "You can select custom time periods for your analytics here." })}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 Days
            </Button>
            <button
              className="btn-cyber-brand px-6 py-2 text-sm rounded-md font-bold"
              onClick={() => toast.success("Analytics Export Started", { description: "Your CSV report is being generated and will download shortly." })}
            >
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-twitch-surface rounded-lg p-4 border border-border hover:border-[var(--cs-cyan)] transition-colors relative overflow-hidden group">
              {/* Glow Effect on Hover */}
              <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity ${stat.bg}`}></div>

              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </span>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.change.isPositive ? 'text-[var(--cs-green)]' : 'text-red-500'}`}>
                  {stat.change.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change.value}%
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Followers Chart - Cyan */}
          <WidgetCard title="Followers Growth">
            <div className="h-64">
              <div className="flex items-end justify-between h-full gap-2">
                {analyticsData.map((data, index) => (
                  <div
                    key={data.date}
                    className="flex-1 flex flex-col items-center gap-2 group"
                  >
                    <div
                      className="w-full bg-[var(--cs-cyan)]/30 rounded-t group-hover:bg-[var(--cs-cyan)] group-hover:shadow-[0_0_10px_var(--cs-cyan)] transition-all cursor-pointer"
                      style={{ height: `${(data.followers / maxFollowers) * 100}%`, minHeight: 4 }}
                      title={`${data.followers.toLocaleString()} followers`}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(data.date).getDate()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </WidgetCard>

          {/* Views Chart - Green */}
          <WidgetCard title="Views">
            <div className="h-64">
              <div className="flex items-end justify-between h-full gap-2">
                {analyticsData.map((data, index) => (
                  <div
                    key={data.date}
                    className="flex-1 flex flex-col items-center gap-2 group"
                  >
                    <div
                      className="w-full bg-[var(--cs-green)]/30 rounded-t group-hover:bg-[var(--cs-green)] group-hover:shadow-[0_0_10px_var(--cs-green)] transition-all cursor-pointer"
                      style={{ height: `${(data.views / maxViews) * 100}%`, minHeight: 4 }}
                      title={`${data.views.toLocaleString()} views`}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(data.date).getDate()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </WidgetCard>

          {/* Stream Hours - Yellow */}
          <WidgetCard title="Stream Hours">
            <div className="h-64">
              <div className="flex items-end justify-between h-full gap-2">
                {analyticsData.map((data) => (
                  <div
                    key={data.date}
                    className="flex-1 flex flex-col items-center gap-2 group"
                  >
                    <div
                      className="w-full bg-[var(--cs-yellow)]/30 rounded-t group-hover:bg-[var(--cs-yellow)] group-hover:shadow-[0_0_10px_var(--cs-yellow)] transition-all cursor-pointer"
                      style={{ height: `${(data.streamHours / 10) * 100}%`, minHeight: 4 }}
                      title={`${data.streamHours} hours`}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(data.date).getDate()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </WidgetCard>

          {/* Revenue - Magenta */}
          <WidgetCard title="Revenue">
            <div className="h-64">
              <div className="flex items-end justify-between h-full gap-2">
                {analyticsData.map((data) => (
                  <div
                    key={data.date}
                    className="flex-1 flex flex-col items-center gap-2 group"
                  >
                    <div
                      className="w-full bg-[var(--cs-magenta)]/30 rounded-t group-hover:bg-[var(--cs-magenta)] group-hover:shadow-[0_0_10px_var(--cs-magenta)] transition-all cursor-pointer"
                      style={{ height: `${(data.revenue / 600) * 100}%`, minHeight: 4 }}
                      title={`$${data.revenue}`}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(data.date).getDate()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </WidgetCard>
        </div>

        {/* Summary Table */}
        <div className="mt-8">
          <WidgetCard title="Daily Breakdown">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-[var(--cs-cyan)]">
                    <th className="text-left py-3 px-4 font-bold uppercase tracking-wider">Date</th>
                    <th className="text-right py-3 px-4 font-bold uppercase tracking-wider">Followers</th>
                    <th className="text-right py-3 px-4 font-bold uppercase tracking-wider">Views</th>
                    <th className="text-right py-3 px-4 font-bold uppercase tracking-wider">Hours</th>
                    <th className="text-right py-3 px-4 font-bold uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {[...analyticsData].reverse().map((data) => (
                    <tr key={data.date} className="border-b border-border/50 hover:bg-white/5 transition-colors group">
                      <td className="py-3 px-4 font-medium">{new Date(data.date).toLocaleDateString()}</td>
                      <td className="text-right py-3 px-4 group-hover:text-[var(--cs-cyan)] transition-colors">{data.followers.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 group-hover:text-[var(--cs-green)] transition-colors">{data.views.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 group-hover:text-[var(--cs-yellow)] transition-colors">{data.streamHours}h</td>
                      <td className="text-right py-3 px-4 group-hover:text-[var(--cs-magenta)] transition-colors font-mono">${data.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </WidgetCard>
        </div>
      </div>
    </MainLayout>
  );
}