import { RegisterFormState } from "@/types/register";
import { registerFieldLabels } from "@/constants/fieldLabels";

export const validateRegisterForm = (form: RegisterFormState) => {
    const errors: Record<string, string> = {};
  
    Object.entries(form).forEach(([key, value]) => {
      if (
        key !== "nrp" &&
        (value === "" || value === null)
      ) {
        errors[key] = `${registerFieldLabels[key] || key} tidak boleh kosong`;
      }
    });
  
    if (form.nik && !/^\d{16}$/.test(form.nik)) {
      errors.nik = "NIK harus terdiri dari 16 digit angka";
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      message: Object.keys(errors).length
        ? Object.entries(errors)
            .map(([key, msg]) => `${registerFieldLabels[key] || key}: ${msg}`)
            .join(", ")
        : "",
    };
  };
  