export interface ForgotPasswordResponse {
  status: "success" | "error";
  message: string;
}

export const forgotPasswordRequest = async (
  email: string
): Promise<ForgotPasswordResponse> => {
  const response = await fetch(
    "https://api-ecatalogue-staging.online/api/forgot-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  const data = await response.json();

  return {
    status: data.status || (response.ok ? "success" : "error"),
    message:
      data.message ||
      "Terjadi kesalahan saat mengirim permintaan reset kata sandi.",
  };
};
