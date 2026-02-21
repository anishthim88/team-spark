import { type RetroCard as RetroCardType, COLUMN_CONFIG } from '@/lib/retro';
import { useRetro } from '@/context/RetroContext';

interface RetroCardProps {
  card: RetroCardType;
}

const RetroCard = ({ card }: RetroCardProps) => {
  const { currentUser, deleteCard } = useRetro();
  const isAuthor = currentUser === card.author;

  return (
    <div className="group rounded-xl border border-border bg-card p-4 hover-lift">
      <p className="text-sm leading-relaxed text-foreground">{card.content}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{card.author}</span>
        <div className="flex items-center gap-2">
          {card.owner && (
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${COLUMN_CONFIG.action.badgeClass}`}>
              {card.owner}
            </span>
          )}
          {isAuthor && (
            <button
              onClick={() => deleteCard(card.id)}
              className="rounded px-2 py-0.5 text-xs font-medium text-destructive opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 press-scale"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetroCard;
