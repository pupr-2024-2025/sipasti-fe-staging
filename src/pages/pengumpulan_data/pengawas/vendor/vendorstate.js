import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  initialValues: {
    status_progres: [],
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
}));

export default useStore;
