export const getToken = () => {
  const token = localStorage.getItem("token");
  console.log("Token yang didapat dari localStorage:", token);  // Debug log
  return token;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};
