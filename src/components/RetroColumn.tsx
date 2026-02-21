import { useState } from 'react';
import { type ColumnType, COLUMN_CONFIG } from '@/lib/retro';
import { useRetro } from '@/context/RetroContext';
import RetroCard from '@/components/RetroCard';

interface RetroColumnProps {
  type: ColumnType;
  index: number;
}

const RetroColumn = ({ type, index }: RetroColumnProps) => {
  const config = COLUMN_CONFIG[type];
  const { cards, addCard } = useRetro();
  const columnCards = cards.filter(c => c.column === type);
  const [isAdding, setIsAdding] = useState(false);
  const [content, setContent] = useState('');
  const [owner, setOwner] = useState('');

  const handleSubmit = () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    addCard(type, trimmed, type === 'action' ? owner.trim() || undefined : undefined);
    setContent('');
    setOwner('');
    setIsAdding(false);
  };

  return (
    <div
      className="flex flex-col rounded-2xl border border-border/50 bg-card shadow-column overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className={`relative flex items-center justify-between px-4 py-3.5 ${config.gradientClass}`}>
        {/* Left color stripe */}
        <div
          className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
          style={{ backgroundColor: config.dotColor }}
        />
        <div className="flex items-center gap-2.5 pl-2">
          <span className="text-xl">{config.emoji}</span>
          <h3 className={`text-sm font-bold ${config.colorClass}`}>{config.label}</h3>
        </div>
        <span
          className="flex h-6 min-w-[24px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold"
          style={{ backgroundColor: `${config.dotColor}18`, color: config.dotColor }}
        >
          {columnCards.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-2.5 overflow-y-auto p-3 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 240px)' }}>
        {columnCards.length === 0 && !isAdding && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="mb-3 text-4xl opacity-40">{config.emoji}</span>
            <p className="text-xs text-muted-foreground/70">Nothing here yet</p>
            <p className="text-xs text-muted-foreground/50">Add the first card!</p>
          </div>
        )}
        {columnCards.map(card => (
          <RetroCard key={card.id} card={card} />
        ))}
      </div>

      {/* Add card */}
      <div className="border-t border-border/40 p-3">
        {isAdding ? (
          <div className="animate-scale-in space-y-2.5">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="What's on your mind?"
              autoFocus
              rows={3}
              className="w-full resize-none rounded-xl border border-input/70 bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all backdrop-blur-sm"
            />
            {type === 'action' && (
              <input
                type="text"
                value={owner}
                onChange={e => setOwner(e.target.value)}
                placeholder="Owner (optional)"
                className="w-full rounded-xl border border-input/70 bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all backdrop-blur-sm"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="flex-1 rounded-xl gradient-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground press-scale hover:opacity-90 transition-all disabled:opacity-40"
              >
                Add Card
              </button>
              <button
                onClick={() => { setIsAdding(false); setContent(''); setOwner(''); }}
                className="rounded-xl border border-border/60 px-3 py-2.5 text-xs font-medium text-muted-foreground hover:bg-accent transition-all press-scale"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="group w-full rounded-xl border border-dashed border-border/60 py-2.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:bg-primary/5 press-scale"
          >
            <span className="mr-1 inline-block transition-transform duration-300 group-hover:scale-110">+</span>
            Add card
          </button>
        )}
      </div>
    </div>
  );
};

export default RetroColumn;
