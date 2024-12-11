// ForgotPassword.js
import React, { useState } from "react";
import TextInput from "../components/input";
import Button from "../components/button";
import { CloseCircle } from "iconsax-react";
import CustomAlert from "../components/alert";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
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

      if (!response.ok || data.status === "error") {
        setAlert({
          open: true,
          message:
            data.message ||
            "Terjadi kesalahan saat mengirim permintaan reset kata sandi.",
          severity: "error",
        });
        return;
      }

      setAlert({
        open: true,
        message: "Permintaan reset kata sandi berhasil dikirim.",
        severity: "success",
      });

      onClose();
    } catch (error) {
      setAlert({
        open: true,
        message: "Terjadi kesalahan saat memproses permintaan.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          onChange={(e) => setEmail(e.target.value)}
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

      {alert.open && (
        <CustomAlert
          message={alert.message}
          severity={alert.severity}
          openInitially={alert.open}
          onClose={() => setAlert({ ...alert, open: false })}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
