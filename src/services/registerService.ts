export const fetchBalaiOptions = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/balai-kerja`);
      if (!res.ok) throw new Error("Gagal ambil data Balai");
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      console.error("Error fetch balai:", err);
      return [];
    }
  };
  
  export const registerUser = async (formData: FormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorRes = await response.json();
        throw new Error(errorRes.message || "Registrasi gagal");
      }
  
      return await response.json();
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message || "Registrasi error");
      }
      throw new Error("Registrasi error");
    }
    
  };
  