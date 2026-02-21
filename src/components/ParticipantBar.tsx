import { useRetro } from '@/context/RetroContext';

const ParticipantBar = () => {
  const { participants } = useRetro();

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {participants.map(p => (
        <div
          key={p.name}
          className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground"
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          {p.name}
        </div>
      ))}
    </div>
  );
};

export default ParticipantBar;
