import { create } from "zustand";

const useStore = create((set) => ({
  selectedValue: 0,
  provincesOptions: [],
  initialValues: {
    materials: [],
    peralatans: [],
    tenagaKerjas: [],
  },
  dataMaterial: [],
  filteredDataMaterial: [],
  rowsToAdd: 0,
  isModalOpen: false,
  pushMaterial: () => {},
  pushPeralatan: null,
  pushTenagaKerja: null,
  setSelectedValue: (value) => set({ selectedValue: value }),
  setProvincesOptions: (options) => set({ provincesOptions: options }),
  setInitialValues: (values) =>
    set((state) => ({
      initialValues: {
        ...state.initialValues,
        ...values,
      },
    })),
  setDataMaterial: (data) => set({ dataMaterial: data }),
  setFilteredDataMaterial: (data) => set({ filteredDataMaterial: data }),
  setRowsToAdd: (rows) => set({ rowsToAdd: rows }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setPushMaterial: (push) => set({ pushMaterial: push }),
  setPushPeralatan: (push) => set({ pushPeralatan: push }),
  setPushTenagaKerja: (push) => set({ pushTenagaKerja: push }),
}));

export default useStore;
