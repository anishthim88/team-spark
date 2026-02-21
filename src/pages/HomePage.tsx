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
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md animate-fade-in">
        <div className="rounded-2xl border border-border bg-card p-10 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              Retro Board
            </h1>
            <p className="mt-3 text-sm font-medium tracking-wide text-muted-foreground">
              Mad · Sad · Glad · Action Items
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={retroTitle}
              onChange={e => setRetroTitle(e.target.value)}
              placeholder="Give your retro a name…"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
            <button
              onClick={handleStart}
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground press-scale hover:opacity-90 transition-opacity"
            >
              Start a Retro →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
