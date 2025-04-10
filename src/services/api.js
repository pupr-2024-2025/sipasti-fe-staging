    import axios from 'axios';

    const API_URL = 'https://api-ecatalogue-staging.online/api';

    export const submitData = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/pengumpulan-data/verifikasi-pengawas`, data);
        return response.data;
    } catch (error) {
        console.error("Error submitting data", error);
        throw error;
    }
    };

    export const submitDataVerifikasiValidasi = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/pemeriksaan-rekonsiliasi/store-verifikasi-validasi`, data);
            return response.data;
        } catch (error) {
            console.error("Error submitting data", error);
            throw error;
        }
        };

    export const fetchDataEntriData = async (id) => {
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
    };