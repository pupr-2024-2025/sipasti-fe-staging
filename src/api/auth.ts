import api from "@/lib/apiClient";

export const login = async (username: string, password: string) => {
  const res = await api.post("/login", { username, password });
  return res.data;
};

export const ssoLogin = async (ssoToken: string) => {
  const res = await api.post("/sso-login", { token: ssoToken });
  return res.data;
};

export const checkRole = async (token: string) => {
  const res = await api.get("/check-role", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchUserRole = async (token: string) => {
  try {
    const res = await api.get("/check-role", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.status !== "success") {
      throw new Error("Gagal memeriksa role pengguna.");
    }

    return res.data.data;
  } catch (error) {
    throw new Error("Gagal mem-fetch role.");
  }
};
