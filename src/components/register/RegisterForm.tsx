import React from "react";
import TextInput from "@/components/ui/textinput";
import Button from "@/components/ui/button";
import FileInput from "@/components/fileinput";
import IconCheckbox from "@/components/checkbox";
import { CloseCircle } from "iconsax-react";
import Dropdown from "@/components/ui/dropdown";
import { useAlert } from "@/components/global/AlertContext";
import { useRegisterForm } from "@/hooks/useRegisterForm";

const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  const { showAlert } = useAlert();
  const {
    email,
    nama_lengkap,
    nik,
    nrp,
    satuan_kerja_id,
    balai_kerja_id,
    no_handphone,
    surat_penugasan_url,
    uploadState,
    progress,
    isChecked,
    errorMessages,
    generalError,
    balaiOptions,
    satuanKerjaOptions,
    handleCancel,
    handleCheckboxChange,
    handleFileSelect,
    handleRegister: originalHandleRegister,
    handleInputChange,
    handleBalaiSelect,
    handleSatuanKerjaSelect,
  } = useRegisterForm();

  const handleRegister = async () => {
    const result = await originalHandleRegister();

    if (result.success) {
      showAlert("Pendaftaran berhasil!", "success");
      onClose();
    } else {
      showAlert(result.message || "Pendaftaran gagal, coba lagi.", "error");
    }
  };

  return (
    <div className="space-y-3 max-w-[90vw] max-h-[90vh] overflow-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-H5 text-emphasis-on_surface-high text-left">
          Buat Akun
        </h5>
        <button className="text-emphasis-on_surface-high" onClick={onClose}>
          <CloseCircle size="24" />
        </button>
      </div>

      <p className="text-B1 text-emphasis-on_surface-medium text-left">
        Daftarkan diri anda segera ke katalog HSPW untuk mendapatkan akses mudah
        aman ke katalog, dan kemudahan administrasi daring.
      </p>

      <div className="flex items-center justify-left gap-x-1">
        <p className="text-Small text-neutral-500">Sudah punya akun?</p>
        <Button variant="blue_text" size="ExtraSmall" onClick={onClose}>
          Masuk
        </Button>
      </div>

      <TextInput
        label="Nama Lengkap"
        placeholder="Masukkan Nama Lengkap"
        value={nama_lengkap}
        isRequired={true}
        errorMessage={errorMessages.nama_lengkap}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange("nama_lengkap", e.target.value)
        }
      />

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 gap-x-10 w-full max-w-5xl">
          <div className="flex-1 space-y-4">
            <TextInput
              label="NIK"
              placeholder="Masukkan NIK"
              value={nik}
              variant="number"
              isRequired={true}
              errorMessage={errorMessages.nik}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("nik", e.target.value)
              }
            />
            <TextInput
              label="NRP"
              placeholder="Masukkan NRP"
              variant="number"
              value={nrp}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("nrp", e.target.value)
              }
            />
            <Dropdown
              options={balaiOptions}
              label="Balai"
              placeholder="Pilih Balai"
              onSelect={handleBalaiSelect}
              value={balaiOptions.find((opt) => opt.value === balai_kerja_id)}
              isRequired={true}
              errorMessage={errorMessages.balai_kerja_id}
            />
          </div>

          <div className="flex-1 space-y-4">
            <TextInput
              label="Email"
              placeholder="Masukkan Email"
              value={email}
              isRequired={true}
              errorMessage={errorMessages.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("email", e.target.value)
              }
            />
            <Dropdown
              options={satuanKerjaOptions}
              label="Satuan Kerja"
              placeholder="Pilih Satuan Kerja"
              errorMessage={errorMessages.satuan_kerja_id}
              value={satuanKerjaOptions.find(
                (opt) => opt.value === satuan_kerja_id
              )}
              onSelect={handleSatuanKerjaSelect}
              isRequired={true}
            />
            <TextInput
              label="Nomor Telepon"
              placeholder="Masukkan Nomor Telepon"
              value={no_handphone}
              isRequired={true}
              variant="number"
              errorMessage={errorMessages.no_handphone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("no_handphone", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      <div>
        <FileInput
          onFileSelect={handleFileSelect}
          setSelectedFile={() => {}}
          buttonText="Pilih Berkas"
          iconLeft={null}
          iconRight={null}
          multiple={false}
          accept=".pdf"
          Label="Unggah SK/Surat Penugasan"
          HelperText="Format .PDF dan maksimal 2MB"
          state={uploadState}
          onCancel={handleCancel}
          selectedFile={surat_penugasan_url}
          required={true}
          maxSizeMB={2}
        />
      </div>

      <div>
        <IconCheckbox
          label="Saya setuju dengan syarat dan ketentuan berlaku."
          onChange={handleCheckboxChange}
        />
      </div>

      {generalError && (
        <div className="text-custom-red-500 text-sm mt-2">{generalError}</div>
      )}

      <div className="flex flex-row justify-end items-right space-x-4">
        <Button onClick={onClose} variant="outlined_yellow" size="Medium">
          Batal
        </Button>
        <Button
          onClick={() => handleRegister()}
          variant="solid_blue"
          size="Medium"
          disabled={!isChecked}>
          Buat Akun
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
