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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/10 backdrop-blur-md" />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm mx-4 animate-scale-in">
        <div className="rounded-2xl border border-border/50 bg-card/90 p-8 shadow-modal backdrop-blur-xl">
          {/* Decorative top accent */}
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          
          <div className="mb-2 text-center text-3xl">👋</div>
          <h2 className="mb-6 text-center text-xl font-bold text-foreground">
            What's your name?
          </h2>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleJoin()}
            placeholder="Enter your name…"
            autoFocus
            className="mb-4 w-full rounded-xl border border-input/80 bg-background/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/30 transition-all backdrop-blur-sm"
          />
          <button
            onClick={handleJoin}
            disabled={!name.trim()}
            className="group w-full rounded-xl gradient-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground press-scale shadow-glow-primary hover:shadow-[0_0_40px_-5px_hsl(245_72%_59%_/_0.5)] transition-all duration-300 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
          >
            Join
            <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinModal;
