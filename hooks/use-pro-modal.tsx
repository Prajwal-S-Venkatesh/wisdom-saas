import { create } from "zustand";

interface useProModalStore {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProModal = create<useProModalStore>((set) => ({
  visible: false,
  onOpen: () => set({ visible: true }),
  onClose: () => set({ visible: false }),
}));
