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
