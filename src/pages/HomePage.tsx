import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRetro } from '@/context/RetroContext';

const HomePage = () => {
  const [retroTitle, setRetroTitle] = useState('');
  const { setTitle } = useRetro();
  const navigate = useNavigate();

  const handleStart = () => {
    setTitle(retroTitle || 'Untitled Retro');
    navigate('/board');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Soft gradient background matching board */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(350 89% 60% / 0.04) 0%, hsl(245 72% 59% / 0.06) 35%, hsl(199 89% 48% / 0.04) 65%, hsl(152 76% 44% / 0.04) 100%)' }} />
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in">
        <div className="rounded-2xl border border-border/60 bg-card/80 p-10 shadow-column backdrop-blur-xl">
          {/* Emoji decoration */}
          <div className="mb-6 flex justify-center gap-3 text-2xl animate-float">
            <span>😤</span>
            <span>😢</span>
            <span>😊</span>
            <span>✅</span>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black tracking-tight text-foreground">
              Retro Board
            </h1>
            <p className="mt-3 text-sm font-medium tracking-widest uppercase text-muted-foreground">
              Mad · Sad · Glad · Action Items
            </p>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={retroTitle}
              onChange={e => setRetroTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStart()}
              placeholder="Give your retro a name…"
              className="w-full rounded-xl border border-input/80 bg-background/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary/30 transition-all backdrop-blur-sm"
            />
            <button
              onClick={handleStart}
              className="group w-full rounded-xl gradient-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground press-scale shadow-glow-primary hover:shadow-[0_0_40px_-5px_hsl(245_72%_59%_/_0.5)] transition-all duration-300"
            >
              Start a Retro
              <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
