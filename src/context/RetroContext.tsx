import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type RetroCard, type Participant, type ColumnType, generateId, getParticipantColor } from '@/lib/retro';

interface RetroState {
  title: string;
  currentUser: string | null;
  participants: Participant[];
  cards: RetroCard[];
  setTitle: (t: string) => void;
  joinRetro: (name: string) => void;
  addCard: (column: ColumnType, content: string, owner?: string) => void;
  deleteCard: (id: string) => void;
}

const RetroContext = createContext<RetroState | null>(null);

export function useRetro() {
  const ctx = useContext(RetroContext);
  if (!ctx) throw new Error('useRetro must be used within RetroProvider');
  return ctx;
}

const SAMPLE_PARTICIPANTS: Participant[] = [
  { name: 'Alex', color: getParticipantColor(0) },
  { name: 'Jordan', color: getParticipantColor(1) },
  { name: 'Sam', color: getParticipantColor(2) },
];

const SAMPLE_CARDS: RetroCard[] = [
  { id: generateId(), column: 'mad', content: 'Deployments kept failing on Friday afternoon with no clear error messages.', author: 'Alex', createdAt: Date.now() - 5000 },
  { id: generateId(), column: 'sad', content: 'We lost momentum mid-sprint due to unclear priorities.', author: 'Jordan', createdAt: Date.now() - 4000 },
  { id: generateId(), column: 'glad', content: 'The new onboarding flow got great feedback from users!', author: 'Sam', createdAt: Date.now() - 3000 },
  { id: generateId(), column: 'glad', content: 'Team collaboration was excellent this sprint.', author: 'Alex', createdAt: Date.now() - 2000 },
  { id: generateId(), column: 'action', content: 'Set up automated deploy health checks', author: 'Jordan', owner: 'Alex', createdAt: Date.now() - 1000 },
];

export function RetroProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [participants, setParticipants] = useState<Participant[]>(SAMPLE_PARTICIPANTS);
  const [cards, setCards] = useState<RetroCard[]>(SAMPLE_CARDS);

  const joinRetro = useCallback((name: string) => {
    setCurrentUser(name);
    if (!participants.find(p => p.name === name)) {
      setParticipants(prev => [...prev, { name, color: getParticipantColor(prev.length) }]);
    }
  }, [participants]);

  const addCard = useCallback((column: ColumnType, content: string, owner?: string) => {
    if (!currentUser) return;
    const card: RetroCard = {
      id: generateId(),
      column,
      content,
      author: currentUser,
      owner: owner || undefined,
      createdAt: Date.now(),
    };
    setCards(prev => [...prev, card]);
  }, [currentUser]);

  const deleteCard = useCallback((id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  }, []);

  return (
    <RetroContext.Provider value={{ title, currentUser, participants, cards, setTitle, joinRetro, addCard, deleteCard }}>
      {children}
    </RetroContext.Provider>
  );
}
