export type ColumnType = 'mad' | 'sad' | 'glad' | 'action';

export interface RetroCard {
  id: string;
  column: ColumnType;
  content: string;
  author: string;
  owner?: string;
  createdAt: number;
}

export interface Participant {
  name: string;
  color: string;
}

export const COLUMN_CONFIG: Record<ColumnType, { label: string; emoji: string; colorClass: string; bgClass: string; borderClass: string; badgeClass: string }> = {
  mad: {
    label: 'Mad',
    emoji: '😤',
    colorClass: 'text-col-mad',
    bgClass: 'bg-col-mad/10',
    borderClass: 'border-l-col-mad',
    badgeClass: 'bg-col-mad/15 text-col-mad',
  },
  sad: {
    label: 'Sad',
    emoji: '😢',
    colorClass: 'text-col-sad',
    bgClass: 'bg-col-sad/10',
    borderClass: 'border-l-col-sad',
    badgeClass: 'bg-col-sad/15 text-col-sad',
  },
  glad: {
    label: 'Glad',
    emoji: '😊',
    colorClass: 'text-col-glad',
    bgClass: 'bg-col-glad/10',
    borderClass: 'border-l-col-glad',
    badgeClass: 'bg-col-glad/15 text-col-glad',
  },
  action: {
    label: 'Action Items',
    emoji: '✅',
    colorClass: 'text-col-action',
    bgClass: 'bg-col-action/10',
    borderClass: 'border-l-col-action',
    badgeClass: 'bg-col-action/15 text-col-action',
  },
};

const PARTICIPANT_COLORS = [
  'hsl(239, 84%, 67%)',
  'hsl(160, 84%, 39%)',
  'hsl(350, 89%, 60%)',
  'hsl(199, 89%, 48%)',
  'hsl(30, 95%, 55%)',
  'hsl(280, 70%, 55%)',
];

export function getParticipantColor(index: number): string {
  return PARTICIPANT_COLORS[index % PARTICIPANT_COLORS.length];
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
