import axios from "axios";
import { create } from "zustand";

const ApiUrls = {
	submitInformasiUmum: "http://api-ecatalogue-staging.online/api/perencanaan-data/store-informasi-umum"
}

const tahap1Store = create((set) => ({
	selectedTab: 0,
	setSelectedTab: (value) => set({ selectedTab: value }),
	initialValueManual: {
		kodeRup: "",
		namaBalai: {},
		namaPaket: "",
		namaPpk: "",
		jabatanPpk: "",
	},
	alertMessage: "",
	alertSeverity: "info",
	isAlertOpen: false,
	isSubmitting: false,
	balaiOptions: [],
	setAlertMessage: (message) => set({ alertMessage: message }),
	setAlertSeverity: (severity) => set({ alertSeverity: severity }),
	setIsAlertOpen: (value) => set({ isAlertOpen: value }),
	setInitialValueManual: (value) => set({
		initialValueManual: value,
	}),
	setIsSubmitting: (value) => set({ isSubmitting: value }),
	setBalaiOptions: (value) => set({ balaiOptions: value }),
	submitManual: async (values) => {
		const { kodeRup, namaBalai, namaPaket, namaPpk, jabatanPpk } = values;
		const data = {
			tipe_informasi_umum: "manual",
			kode_rup: kodeRup,
			nama_paket: namaPaket,
			nama_ppk: namaPpk,
			jabatan_ppk: jabatanPpk,
			nama_balai: namaBalai?.value ?? 0,
		}

		try {
			const response = await axios.post(ApiUrls.submitInformasiUmum, data);

			if (response.data.status === "success") {
				console.log("Submit manual data success");
				set({ alertMessage: "Data berhasil Disimpan." });
				set({ alertSeverity: "success" });
				set({ isAlertOpen: true });
				localStorage.setItem("informasi_umum_id", response.data.data.id);
				return true;
			}

			console.error("Submit manual data failed", response.data.message);
			set({ alertMessage: response.data.message });
			set({ alertSeverity: "error" });
			set({ isAlertOpen: true });
			return false;
		} catch (error) {
			console.error("Submit manual data failed", error);
			set({ alertMessage: "Gagal mengirim data ke API." });
			set({ alertSeverity: "error" });
			set({ isAlertOpen: true });
			return false;
		}
	}
}));

export default tahap1Store;
