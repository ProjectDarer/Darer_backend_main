import { ReactNode } from 'react';
import { TopNavbar } from './TopNavbar';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <Sidebar />
      {/* Updated Layout Padding:
          - Mobile: pl-0 (no sidebar), pb-20 (space for bottom bar)
          - Desktop (md+): pl-14 (collapsed sidebar), pb-0
          - Large Desktop (lg+): pl-60 (expanded sidebar)
      */}
      <main className="pl-0 md:pl-14 lg:pl-60 pt-14 pb-20 md:pb-0 min-h-screen transition-all duration-300">
        {children}
      </main>
    </div>
  );
}