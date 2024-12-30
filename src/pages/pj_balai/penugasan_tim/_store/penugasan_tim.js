import axios from "axios";
import { create } from "zustand";

const penugasanTimStore = create((set, get) => ({
    // Raw Data
    pengawas: [],
    // Selected Data
    selectedPengawas: [],
    selectedId: [],
    // Error
    alertSeverity: "error",
    alertMessage: "",
    isAlertOpen: false,
    setAlert: (severity = "error", message = "", open = true) => {
        set({
            alertSeverity: severity,
            alertMessage: message,
            isAlertOpen: open,
        });
    },
    setAlertClose: () => {
        set({
            isAlertOpen: false,
        });
    },
    // Actions
    fetchTableData: async (kind = "") => {
        try {
            const response = await axios.get(
                `https://api-ecatalogue-staging.online/api/pengumpulan-data/list-${kind}`
            );
            const { data } = response;
            if (data.status === "success") {
                set({
                    pengawas: data.data,
                    // ensure state is reset
                    selectedPengawas: [],
                    selectedId: [],
                });
            } else {
                console.error("Gagal mendapatkan data:", data.message);
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data:", error.message);
        }
    },
    submitData: async (kind = "") => {
        try {
            const selectedPengawas = get().selectedPengawas;
            const selectedPengawasArrayString = selectedPengawas.join(",");
            const selectedId = get().selectedId;
            const selectedIdArrayString = selectedId.join(",");

            const data = {
                "id_user": selectedPengawasArrayString,
                "pengumpulan_data_id": selectedIdArrayString,
                "petugas_lapangan_id": selectedIdArrayString,
                "pengolah_data_id": selectedIdArrayString,
            }

            const response = await axios.post(
                `https://api-ecatalogue-staging.online/api/pengumpulan-data/assign-${kind}`,
                data
            );
            if ((response?.data?.status ?? 'error') !== "success") {
                get().setAlert("error", "Gagal mengirim data", true);
                return;
            }
            get().setAlert("success", "Berhasil mengirim data", true);
            return response.data;
        } catch (error) {
            console.error("Error submitting data", error);
            get().setAlert("error", "Gagal mengirim data", true);
        }
    },
    addSelectedPengawas: (pengawas = 0) => {
        set((state) => ({
            selectedPengawas: [...state.selectedPengawas, pengawas],
        }));
    },
    removeSelectedPengawas: (pengawas = 0) => {
        set((state) => ({
            selectedPengawas: state.selectedPengawas.filter((item) => item !== pengawas),
        }));
    },
    addSelectedId: (id = 0) => {
        set((state) => ({
            selectedId: [...state.selectedId, id],
        }));
    },
    removeSelectedId: (id = 0) => {
        set((state) => ({
            selectedId: state.selectedId.filter((item) => item !== id),
        }));
    }
}));

export default penugasanTimStore;
