import { create } from 'zustand';
import { MedicalDocument } from '../types/document.types';

interface DocumentState {
  documents: MedicalDocument[];
  isLoading: boolean;
  addDocument: (document: Omit<MedicalDocument, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDocument: (id: string, updates: Partial<MedicalDocument>) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  isLoading: false,
  addDocument: (document) => {
    const now = new Date().toISOString();
    set((state) => ({
      documents: [
        ...state.documents,
        { ...document, id: Date.now().toString(), createdAt: now, updatedAt: now },
      ],
    }));
  },
  updateDocument: (id, updates) => {
    set((state) => ({
      documents: state.documents.map((item) =>
        item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
      ),
    }));
  },
}));
