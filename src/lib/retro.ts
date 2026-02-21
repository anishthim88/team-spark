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

export const COLUMN_CONFIG: Record<ColumnType, {
  label: string;
  emoji: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  badgeClass: string;
  gradientClass: string;
  dotColor: string;
}> = {
  mad: {
    label: 'Mad',
    emoji: '😤',
    colorClass: 'text-col-mad',
    bgClass: 'bg-col-mad/10',
    borderClass: 'border-l-col-mad',
    badgeClass: 'bg-col-mad/12 text-col-mad',
    gradientClass: 'gradient-col-mad',
    dotColor: 'hsl(350, 89%, 60%)',
  },
  sad: {
    label: 'Sad',
    emoji: '😢',
    colorClass: 'text-col-sad',
    bgClass: 'bg-col-sad/10',
    borderClass: 'border-l-col-sad',
    badgeClass: 'bg-col-sad/12 text-col-sad',
    gradientClass: 'gradient-col-sad',
    dotColor: 'hsl(199, 89%, 48%)',
  },
  glad: {
    label: 'Glad',
    emoji: '😊',
    colorClass: 'text-col-glad',
    bgClass: 'bg-col-glad/10',
    borderClass: 'border-l-col-glad',
    badgeClass: 'bg-col-glad/12 text-col-glad',
    gradientClass: 'gradient-col-glad',
    dotColor: 'hsl(152, 76%, 44%)',
  },
  action: {
    label: 'Action Items',
    emoji: '✅',
    colorClass: 'text-col-action',
    bgClass: 'bg-col-action/10',
    borderClass: 'border-l-col-action',
    badgeClass: 'bg-col-action/12 text-col-action',
    gradientClass: 'gradient-col-action',
    dotColor: 'hsl(263, 70%, 50%)',
  },
};

const PARTICIPANT_COLORS = [
  'hsl(245, 72%, 59%)',
  'hsl(152, 76%, 44%)',
  'hsl(350, 89%, 60%)',
  'hsl(199, 89%, 48%)',
  'hsl(30, 90%, 55%)',
  'hsl(263, 70%, 50%)',
];

export function getParticipantColor(index: number): string {
  return PARTICIPANT_COLORS[index % PARTICIPANT_COLORS.length];
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
