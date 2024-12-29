import { create } from "zustand";

const entri_dataStore = create((set) => ({
  selectedValue: 0,
  initialValues: {
    radioState: {},
    data_vendor_id: "",
    identifikasi_kebutuhan_id: "",
  },
  dataEntri: null,
  data_vendor_id: "",
  identifikasi_kebutuhan_id: "",

  // Track checkbox state for each item by its ID
  checkboxState: {},

  setSelectedValue: (value) => set({ selectedValue: value }),

  // Fetch data as before...
  fetchData: async (id) => {
    // fetching logic as before...
  },

  // Function to update checkbox state
  updateCheckboxState: (id_pemeriksaan, isChecked) => {
    set((state) => ({
      checkboxState: {
        ...state.checkboxState,
        [id_pemeriksaan]: isChecked,
      },
    }));
  },
}));

export default entri_dataStore;
