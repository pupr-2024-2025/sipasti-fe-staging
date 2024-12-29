// store/index.js
import { create } from "zustand";
import axios from "axios";
// import { fetchDataEntriData } from "../../../../services/api";

export const pemeriksaan_dataStore = create((set) => ({
  selectedValue: 0,
  userOptions: [],
  pengawasUserOptions: [],
  dataEntri: null,
  initialValues: {
    user_id_petugas_lapangan: "",
    user_id_pengawas: "",
  },
  material: null,
  peralatan: null,
  tenaga_kerja: null,
  setSelectedValue: (value) => set({ selectedValue: value }),
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

  fetchDataEntriData: async (id) => {
    try {
      const response = await axios.get(
        `https://api-ecatalogue-staging.online/api/pengumpulan-data/get-entri-data/${id}`
      );
      const data = response.data.data;

      set((state) => ({
        dataEntri: data,
        material: data.material || [],
        peralatan: data.peralatan || [],
        tenaga_kerja: data.tenaga_kerja || [],
        initialValues: {
          ...state.initialValues,
          data_vendor_id: data.data_vendor_id || "",
          identifikasi_kebutuhan_id: data.identifikasi_kebutuhan_id || "",
        },
        data_vendor_id: data.data_vendor_id || "",
        identifikasi_kebutuhan_id: data.identifikasi_kebutuhan_id || "",
      }));

      console.log("identifikasi_kebutuhan_id:", data.identifikasi_kebutuhan_id);
      console.log("data_vendor_id:", data.data_vendor_id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  userRole: "tim teknis",
  data: [
    {
      nomor: "II",
      kelengkapan_dokumen: "KRITERIA PEMERIKSAAN HASIL DATA",
      id_pemeriksaan: "null",
      // status_pemeriksaan: null,
      verified_by: null,
    },
    {
      nomor: "1",
      kelengkapan_dokumen:
        "Pemeriksaan satuan yang salah atau belum terisi.",
      id_pemeriksaan: "C1",
      status_pemeriksaan: null,
      verified_by: "tim teknis",
    },
    {
      nomor: "2",
      kelengkapan_dokumen:
        "Penulisan nama kabupaten/kota.",
      id_pemeriksaan: "C2",
      status_pemeriksaan: null,
      verified_by: "tim teknis",
    },
    {
      nomor: "3",
      kelengkapan_dokumen: "Nama responden/vendor yang tidak jelas.",
      id_pemeriksaan: "C3",
      status_pemeriksaan: null,
      verified_by: "tim teknis",
    },
    {
      nomor: "4",
      kelengkapan_dokumen:
        "Konsistensi dalam pengisian kuesioner.",
      id_pemeriksaan: "C4",
      status_pemeriksaan: null,
      verified_by: "tim teknis",
    },
    {
      nomor: "III",
      kelengkapan_dokumen: "PEMERIKSAAN ANOMALI HARGA",
      id_pemeriksaan: "null2",
      // status_pemeriksaan: null,
      verified_by: null,
    },
    {
      nomor: "1",
      kelengkapan_dokumen:
        "Ketidakwajaran harga satuan pokok.",
      id_pemeriksaan: "D1",
      status_pemeriksaan: null,
      verified_by: "tim teknis",
    },
    {
      nomor: "2",
      kelengkapan_dokumen:
        "Keterbandingan antar harga satuan pokok di wilayah yang berdekatan.",
      id_pemeriksaan: "D2",
      status_pemeriksaan: null,
      verified_by: "tim teknis",
    },
  ],
  setUserRole: (role) => set(() => ({ userRole: role })),
  updateStatus: (id_pemeriksaan, status) =>
    set((state) => ({
      data: state.data.map((item) =>
        item.id_pemeriksaan === id_pemeriksaan
          ? { ...item, status_pemeriksaan: status }
          : item
      ),
    })),
  setData: (newData) => set({ data: newData }),
}));
