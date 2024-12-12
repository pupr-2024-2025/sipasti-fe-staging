import { create } from "zustand";

const useStore = create((set) => ({
  checkedValue: [],
  setCheckedValue: (value) => set({ checkedValue: value }),
}));

export default useStore;
