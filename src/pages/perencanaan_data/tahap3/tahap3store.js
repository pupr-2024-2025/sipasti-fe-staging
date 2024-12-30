import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  initialValues: {
    material: [],
    peralatan: [],
    tenaga_kerja: [],
  },
  currentTab: 0,
  alertMessage: "",
  alertSeverity: "info",
  isAlertOpen: false,
  setAlertSeverity: (severity) => set({ alertSeverity: severity }),
  setAlertMessage: (message) => set({ alertMessage: message }),
  setIsAlertOpen: (value) => set({ isAlertOpen: value }),
  setCurrentTab: (tab) => set({ currentTab: tab }),
  fetchStatusProgres: async () => {
    try {
      const identifikasiKebutuhanId = localStorage.getItem(
        "identifikasi_kebutuhan_id"
      );

      if (identifikasiKebutuhanId) {
        const response = await axios.get(
          `http://api-ecatalogue-staging.online/api/perencanaan-data/get-data-vendor/${identifikasiKebutuhanId}`
        );
        const { data } = response;
        if (data.status === "success") {
          set({
            initialValues: {
              material: data.data.material || [],
              peralatan: data.data.peralatan || [],
              tenaga_kerja: data.data.tenaga_kerja || [],
            },
          });
        } else {
          console.error("Gagal mendapatkan data:", data.message);
        }
      } else {
        console.error(
          "identifikasi_kebutuhan_id tidak ditemukan di localStorage"
        );
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data:", error.message);
    }
  },
}));

export default useStore;