import { create } from "zustand";
import axios from "axios";

const entri_dataStore = create((set) => ({
  selectedValue: 0,
  userOptions: [],
  initialValues: {
    materials: [],
    peralatans: [],
    tenaga_Kerjas: [],
  },
  dataEntri: null,
  materials: null,
  peralatans: null,
  tenaga_Kerjas: null,
  setSelectedValue: (value) => set({ selectedValue: value }),
  fetchData: async (id) => {
    try {
      const response = await axios.get(
        `https://api-ecatalogue-staging.online/api/pengumpulan-data/get-entri-data/${id}`
      );
      const data = response.data.data;
      set({
        dataEntri: data,
        materials: data.material,
        peralatans: data.peralatan,
        tenaga_Kerjas: data.tenaga_kerja,
      });
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  fetchUserOptions: async () => {
    try {
      const response = await axios.get(
        "http://api-ecatalogue-staging.online/api/pengumpulan-data/list-user"
      );
      const options =
        response.data?.data.map((user) => ({
          value: user.user_id,
          label: user.nama_lengkap,
        })) || [];
      set({ userOptions: options });
      console.log("User options berhasil diambil:", options);
    } catch (error) {
      console.error(
        "Error fetching user options:",
        error.response?.data || error.message
      );
    }
  },
}));

export default entri_dataStore;
