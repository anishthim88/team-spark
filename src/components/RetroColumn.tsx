import { useState } from 'react';
import { type ColumnType, COLUMN_CONFIG } from '@/lib/retro';
import { useRetro } from '@/context/RetroContext';
import RetroCard from '@/components/RetroCard';

interface RetroColumnProps {
  type: ColumnType;
}

const RetroColumn = ({ type }: RetroColumnProps) => {
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
    <div className="flex flex-col rounded-xl border border-border bg-card">
      {/* Header */}
      <div className={`flex items-center justify-between border-l-4 ${config.borderClass} rounded-t-xl px-4 py-3 ${config.bgClass}`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{config.emoji}</span>
          <h3 className={`text-sm font-semibold ${config.colorClass}`}>{config.label}</h3>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${config.badgeClass}`}>
          {columnCards.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-3 overflow-y-auto p-3" style={{ maxHeight: 'calc(100vh - 220px)' }}>
        {columnCards.length === 0 && !isAdding && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <span className="text-3xl">{config.emoji}</span>
            <p className="mt-2 text-xs text-muted-foreground">Nothing here yet — add the first card!</p>
          </div>
        )}
        {columnCards.map(card => (
          <RetroCard key={card.id} card={card} />
        ))}
      </div>

      {/* Add card */}
      <div className="border-t border-border p-3">
        {isAdding ? (
          <div className="animate-slide-up space-y-2">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="What's on your mind?"
              autoFocus
              rows={3}
              className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
            {type === 'action' && (
              <input
                type="text"
                value={owner}
                onChange={e => setOwner(e.target.value)}
                placeholder="Owner (optional)"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground press-scale hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Add
              </button>
              <button
                onClick={() => { setIsAdding(false); setContent(''); setOwner(''); }}
                className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent transition-colors press-scale"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full rounded-lg border border-dashed border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary press-scale"
          >
            + Add card
          </button>
        )}
      </div>
    </div>
  );
};

export default RetroColumn;
