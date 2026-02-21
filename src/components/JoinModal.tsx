import { useState } from 'react';
import { useRetro } from '@/context/RetroContext';

interface JoinModalProps {
  open: boolean;
  onJoined: () => void;
}

const JoinModal = ({ open, onJoined }: JoinModalProps) => {
  const [name, setName] = useState('');
  const { joinRetro } = useRetro();

  if (!open) return null;

  const handleJoin = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    joinRetro(trimmed);
    onJoined();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-sm animate-scale-in rounded-2xl border border-border bg-card/95 p-8 shadow-lg backdrop-blur-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
          What's your name?
        </h2>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleJoin()}
          placeholder="Enter your name…"
          autoFocus
          className="mb-4 w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
        />
        <button
          onClick={handleJoin}
          disabled={!name.trim()}
          className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground press-scale hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Join →
        </button>
      </div>
    </div>
  );
};

export default JoinModal;
