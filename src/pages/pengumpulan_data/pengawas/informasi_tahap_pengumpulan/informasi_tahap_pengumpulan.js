import { create } from "zustand";
import axios from "axios";

const informasi_tahap_pengumpulanStore = create((set) => ({
  initialValues: {
    status_progres: [],
    vendor: [],
  },
  fetchStatusProgres: async () => {
    try {
      const response = await axios.get(
        "http://api-ecatalogue-staging.online/api/pengumpulan-data/table-list-pengumpulan"
      );
      const { data } = response;
      if (data.status === "success") {
        set({
          initialValues: {
            status_progres: data.data,
          },
        });
      } else {
        console.error("Gagal mendapatkan data:", data.message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data:", error.message);
    }
  },

  fetchVendor: async (id_paket) => {
    try {
      const response = await axios.get(
        `http://api-ecatalogue-staging.online/api/pengumpulan-data/list-vendor-by-paket/${id_paket}`
      );
      const { data } = response;
      if (data.status === "success" && Array.isArray(data.data)) {
        set((state) => ({
          initialValues: {
            ...state.initialValues,
            vendor: data.data,
          },
        }));
      } else {
        console.error("Gagal mendapatkan data:", data.message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data:", error.message);
    }
  },
}));

export default informasi_tahap_pengumpulanStore;
