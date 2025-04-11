// src/hooks/useRegisterForm.ts
import { useEffect, useState } from "react";
import { RegisterFormState, RegisterErrorMessages, OptionType } from "@/types/register";
import { validateRegisterForm as validateForm } from "@/utils/validateForm";
import { useAlert } from "@/components/global/AlertContext";

export const useRegisterForm = () => {
  const { showAlert } = useAlert();
  const [formValues, setFormValues] = useState<RegisterFormState>({
    email: "",
    nama_lengkap: "",
    nik: "",
    nrp: "",
    balai_kerja_id: "",
    satuan_kerja_id: "",
    no_handphone: "",
    surat_penugasan_url: null,
  });

  const [uploadState, setUploadState] = useState("default");
  const [progress, setProgress] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessages, setErrorMessages] = useState<RegisterErrorMessages>({});
  const [generalError, setGeneralError] = useState("");
  const [balaiOptions, setBalaiOptions] = useState<OptionType[]>([]);
  const satuanKerjaOptions: OptionType[] = [{ value: "1", label: "satker_007" }];
  

  useEffect(() => {
    const fetchBalaiOptions = async () => {
      try {
        const response = await fetch(
          "https://api-ecatalogue-staging.online/api/get-balai-kerja"
        );
        const result = await response.json();
        if (result && result.data && Array.isArray(result.data)) {
          const formattedOptions = result.data.map((item: any) => ({
            value: item.id,
            label: item.nama,
          }));
          setBalaiOptions(formattedOptions);
        }
      } catch (error) {
        console.error("Error fetching balai options:", error);
      }
    };

    fetchBalaiOptions();
  }, []);

  const handleInputChange = (field: keyof RegisterFormState, value: any)  => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (files: FileList) => {
    if (files.length === 0) {
      setGeneralError("File wajib dipilih.");
      return;
    }
    const file = files[0];
    setFormValues((prev) => ({ ...prev, surat_penugasan_url: file }));
    setUploadState("processing");
    setGeneralError("");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("done");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleCancel = () => {
    setFormValues((prev) => ({ ...prev, surat_penugasan_url: null }));
    setUploadState("default");
    setProgress(0);
  };

  const handleBalaiSelect = (option: OptionType) => {
    setFormValues((prev) => ({ ...prev, balai_kerja_id: option.value }));
  };
  
  const handleSatuanKerjaSelect = (option: OptionType) => {
    setFormValues((prev) => ({ ...prev, satuan_kerja_id: option.value }));
  };
  

  const handleRegister = async (onSuccess?: () => void): Promise<{ success: boolean, message?: string }> => {
    setErrorMessages({});
    setGeneralError("");
  
    const { errors, message } = validateForm(formValues);
  
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      setGeneralError(message);
      return { success: false, message };
    }
  
    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
  
    try {
      const response = await fetch(
        "https://api-ecatalogue-staging.online/api/store-user",
        {
          method: "POST",
          body: formData,
        }
      );
  
      const result = await response.json();
      if (!response.ok || result.status === "error") {
        throw new Error(result.message || "Terjadi kesalahan saat registrasi.");
      }
  
      showAlert(result.message || "Registrasi berhasil!", "success");
  
      if (result.status === "success" && typeof onSuccess === "function") {
        onSuccess();
      }
  
      console.log("✅ Register sukses, result:", result);
      return { success: true };
  
    } catch (error: any) {
      showAlert(error.message || "Server error, coba lagi nanti.", "error");
      return { success: false, message: error.message };
    }
  };
  

  return {
    ...formValues,
    uploadState,
    progress,
    isChecked,
    setIsChecked,
    errorMessages,
    generalError,
    balaiOptions,
    satuanKerjaOptions,
    handleInputChange,
    handleFileSelect,
    handleCancel,
    handleRegister,
    handleCheckboxChange: (checked: boolean) => setIsChecked(checked),
    handleBalaiSelect,
    handleSatuanKerjaSelect,
  };
  
  
};
