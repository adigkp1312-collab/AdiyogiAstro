'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  {
    label: 'Home',
    href: '/home',
    icon: (active: boolean) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1V9.5z" />
      </svg>
    ),
  },
  {
    label: 'My Life',
    href: '/mylife',
    icon: (active: boolean) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" fill={active ? 'currentColor' : 'none'} opacity={active ? 0.2 : 1} />
        <circle cx="12" cy="12" r="3" fill={active ? 'currentColor' : 'none'} />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeLinecap="round" />
        <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Chat',
    href: '/chat',
    icon: (active: boolean) => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
        {active && (
          <>
            <circle cx="9" cy="10" r="1" fill="white" />
            <circle cx="12" cy="10" r="1" fill="white" />
            <circle cx="15" cy="10" r="1" fill="white" />
          </>
        )}
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
      {/* Fade gradient above nav */}
      <div className="h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <div className="bg-surface-card/95 backdrop-blur-xl shadow-nav border-t border-border/50">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/');
            return (
              <Link
                key={tab.href}
                href={tab.href}
                prefetch={true}
                className={`flex flex-col items-center gap-0.5 px-6 py-1.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text-accent'
                }`}
              >
                <div className={`relative ${isActive ? 'animate-fade-in' : ''}`}>
                  {tab.icon(isActive)}
                  {isActive && (
                    <div className="absolute -inset-2 bg-primary/10 rounded-full blur-md -z-10" />
                  )}
                </div>
                <span className={`text-[10px] ${isActive ? 'font-bold text-primary' : 'font-medium'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-primary shadow-glow-sm" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
