import { type RetroCard as RetroCardType, COLUMN_CONFIG } from '@/lib/retro';
import { useRetro } from '@/context/RetroContext';

interface RetroCardProps {
  card: RetroCardType;
}

const RetroCard = ({ card }: RetroCardProps) => {
  const { currentUser, deleteCard } = useRetro();
  const isAuthor = currentUser === card.author;

  return (
    <div className="group rounded-xl border border-border/50 bg-card p-4 hover-lift transition-all duration-300">
      <p className="text-[13px] leading-relaxed text-foreground/90">{card.content}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
          {card.author}
        </span>
        <div className="flex items-center gap-2">
          {card.owner && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${COLUMN_CONFIG.action.badgeClass}`}>
              {card.owner}
            </span>
          )}
          {isAuthor && (
            <button
              onClick={() => deleteCard(card.id)}
              className="rounded-md px-2 py-0.5 text-[10px] font-medium text-destructive opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-destructive/10 press-scale"
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
