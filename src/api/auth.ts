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
