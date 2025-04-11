import React from "react";
import useForgotPassword from "./useForgotPassword";
import TextInput from "@/components/ui/textinput";
import Button from "@/components/ui/button";
import { CloseCircle } from "iconsax-react";

interface ForgotPasswordProps {
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const { email, isLoading, handleEmailChange, handleSubmit } =
    useForgotPassword(onClose);

  return (
    <div className="space-y-3 p-4">
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h5 className="text-H5 text-emphasis-on_surface-high text-left">
            Lupa Kata Sandi
          </h5>
          <button className="text-emphasis-on_surface-high" onClick={onClose}>
            <CloseCircle size="24" />
          </button>
        </div>
        <p className="text-B1 text-emphasis-on_surface-medium text-left">
          Lupa kata sandi? Silakan reset akses Anda dengan memasukkan email
          berikut.
        </p>
      </div>

      <div className="py-6">
        <TextInput
          label="Email"
          placeholder="Masukkan Email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      <div className="flex flex-row justify-end items-right space-x-4">
        <Button onClick={onClose} variant="outlined_yellow" size="Medium">
          Batal
        </Button>
        <Button
          onClick={handleSubmit}
          variant="solid_blue"
          size="Medium"
          disabled={!email || isLoading}>
          {isLoading ? "Mengirim..." : "Kirim"}
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
