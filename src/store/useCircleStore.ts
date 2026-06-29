import { create } from 'zustand';
import { CircleMember } from '../types/circle.types';

interface CircleState {
  members: CircleMember[];
  isLoading: boolean;
  addMember: (member: CircleMember) => void;
  updateMember: (id: string, updates: Partial<CircleMember>) => void;
}

export const useCircleStore = create<CircleState>((set) => ({
  members: [],
  isLoading: false,
  addMember: (member) => set((state) => ({ members: [...state.members, member] })),
  updateMember: (id, updates) => set((state) => ({
    members: state.members.map((member) =>
      member.id === id ? { ...member, ...updates } : member
    ),
  })),
}));
