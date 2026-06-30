import { create } from 'zustand';
import { CircleMember } from '../types/circle.types';

interface CircleState {
  members: CircleMember[];
  isLoading: boolean;
  addMember: (member: CircleMember) => void;
  addMemberByEmail: (name: string, email: string) => void;
  updateMember: (id: string, updates: Partial<CircleMember>) => void;
  removeMember: (id: string) => void;
}

export const useCircleStore = create<CircleState>((set) => ({
  members: [],
  isLoading: false,
  addMember: (member) => set((state) => ({ members: [...state.members, member] })),
  addMemberByEmail: (name, email) => set((state) => ({
    members: [
      ...state.members,
      {
        id: `${Date.now()}`,
        name,
        email,
        role: 'trusted_person',
        status: 'pending',
        permissions: {
          viewIntakes: true,
          receiveAlerts: true,
          viewAppointments: true,
          viewDocuments: false,
          confirmActions: false,
          sendQuickMessages: true,
          viewGeneralStatus: true,
          modifyTreatments: false,
        },
      },
    ],
  })),
  updateMember: (id, updates) => set((state) => ({
    members: state.members.map((member) =>
      member.id === id ? { ...member, ...updates } : member
    ),
  })),
  removeMember: (id) => set((state) => ({
    members: state.members.filter((member) => member.id !== id),
  })),
}));
