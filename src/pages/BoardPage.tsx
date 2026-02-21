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
    <div className="flex min-h-screen flex-col bg-background">
      {/* Join Modal */}
      {!currentUser && (
        <JoinModal open={showJoin} onJoined={() => setShowJoin(false)} />
      )}

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-foreground">{title || 'Untitled Retro'}</span>
          </div>
          <ParticipantBar />
        </div>
      </header>

      {/* Board */}
      <main className="mx-auto w-full max-w-7xl flex-1 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map(col => (
            <RetroColumn key={col} type={col} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BoardPage;
