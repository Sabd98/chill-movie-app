import { create } from 'zustand';

const useModalStore = create((set) => ({
  isOpen: false,
  content: null,
  type: 'movie', 
  openModal: (content, type = 'movie') => set({ isOpen: true, content, type }),
  closeModal: () => set({ isOpen: false, content: null }),
}));

export default useModalStore;
