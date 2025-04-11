import { useState, ChangeEvent } from "react";
import { forgotPasswordRequest } from "@/services/forgotPasswordAPI";
import { ForgotPasswordResponse } from "@/services/forgotPasswordAPI";
import { useAlert } from "@/components/global/AlertContext";

const useForgotPassword = (onClose: () => void) => {
  const { showAlert } = useAlert();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await forgotPasswordRequest(email);
  
      if (response.status === "error") {
        showAlert(response.message, "error");
        return;
      }
  
      showAlert(response.message, "success");
      onClose();
    } catch (error) {
      showAlert("Terjadi kesalahan saat memproses permintaan.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  

  return {
    email,
    isLoading,
    handleEmailChange,
    handleSubmit,
  };
};

export default useForgotPassword;
