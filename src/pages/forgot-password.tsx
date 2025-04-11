import React from "react";
import ForgotPassword from "@/components/forgotpassword/ForgotPassword";

const ForgotPasswordPage: React.FC = () => {
  const handleClose = () => {
    window.history.back();
  };

  return <ForgotPassword onClose={handleClose} />;
};

export default ForgotPasswordPage;
