import { useState } from 'react';
import { useRetro } from '@/context/RetroContext';
import ParticipantBar from '@/components/ParticipantBar';
import RetroColumn from '@/components/RetroColumn';
import JoinModal from '@/components/JoinModal';
import type { ColumnType } from '@/lib/retro';

const COLUMNS: ColumnType[] = ['mad', 'sad', 'glad', 'action'];

const BoardPage = () => {
  const { title, currentUser } = useRetro();
  const [showJoin, setShowJoin] = useState(true);

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Soft gradient background */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, hsl(350 89% 60% / 0.04) 0%, hsl(245 72% 59% / 0.05) 35%, hsl(199 89% 48% / 0.04) 65%, hsl(152 76% 44% / 0.04) 100%)' }} />
      <div className="fixed inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

      {/* Join Modal */}
      {!currentUser && (
        <JoinModal open={showJoin} onJoined={() => setShowJoin(false)} />
      )}

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-card/70 shadow-navbar backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-sm">
              📋
            </div>
            <span className="text-base font-bold text-foreground tracking-tight">{title || 'Untitled Retro'}</span>
          </div>
          <ParticipantBar />
        </div>
      </header>

      {/* Board */}
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col, i) => (
            <RetroColumn key={col} type={col} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BoardPage;
