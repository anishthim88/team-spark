import { useRetro } from '@/context/RetroContext';

const ParticipantBar = () => {
  const { participants } = useRetro();

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {participants.map((p, i) => (
        <div
          key={p.name}
          className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:shadow-card"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full ring-2 ring-offset-1 ring-offset-card"
            style={{ backgroundColor: p.color, boxShadow: `0 0 6px ${p.color}40` }}
          />
          {p.name}
        </div>
      ))}
    </div>
  );
};

export default ParticipantBar;
