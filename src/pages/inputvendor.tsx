import React, { useState } from "react";
import InputVendorForm from "@/components/vendor/inputvendorform";
import { useRouter } from "next/router";
// import MapSection from "@/components/vendor/mapsection";
import FileInput from "@/components/fileinput";
import Button from "@/components/button";
import CustomAlert from "@/components/alert";
import axios from "axios";
import { useVendorFileUpload } from "@/hooks/useVendorFileUpload";

const InputVendor = ({}) => {
  const router = useRouter();

  // Form states
  const [nama_vendor, setnama_vendor] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [kategori_vendor_id, setkategori_vendor_id] = useState("");
  const [sumber_daya, setsumber_daya] = useState("");
  const [alamat, setalamat] = useState("");
  const [no_telepon, setno_telepon] = useState("");
  const [no_hp, setno_hp] = useState("");
  const [nama_pic, setnama_pic] = useState("");
  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [kotaOptions, setKotaOptions] = useState([]);
  const [provinsi_id, setProvinsiId] = useState("");
  const [kota_id, setKotaId] = useState("");

  const {
    logo_url,
    setLogoUrl,
    dok_pendukung_url,
    setDokPendukungUrl,
    logoUploadState,
    dokPendukungUploadState,
    handleLogoFileSelect,
    handleDokPendukungFileSelect,
    handleLogoCancel,
    handleDokPendukungCancel,
  } = useVendorFileUpload();

  // Alert state
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleCheckboxChange = (type) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type];

      setjenis_vendor_id(updatedTypes.join(","));
      console.log("Updated jenis_vendor_id:", updatedTypes.join(","));

      return updatedTypes;
    });
  };

  const getOptions = () => {
    // Get options for dropdowns
  };

  const handleProvinsiChange = (e) => setProvinsiId(e.target.value);
  const handleKotaChange = (e) => setKotaId(e.target.value);

  const onBack = () => router.back();
  const onNext = () => {
    // Simpan dan lanjut logic
  };

  return (
    <div className="p-8">
      <h3 className="text-H3 text-emphasis-on_surface-high">
        Input Data Vendor
      </h3>
      <div className="flex flex-wrap gap-4 mt-3">
        <InputVendorForm
          {...{
            nama_vendor,
            setnama_vendor,
            selectedTypes,
            handleCheckboxChange,
            kategori_vendor_id,
            setkategori_vendor_id,
            getOptions,
            sumber_daya,
            setsumber_daya,
            alamat,
            setalamat,
            no_telepon,
            setno_telepon,
            no_hp,
            setno_hp,
            nama_pic,
            setnama_pic,
            provinsiOptions,
            handleProvinsiChange,
            provinsi_id,
            kotaOptions,
            handleKotaChange,
            kota_id,
            jenis_vendor_id,
            setjenis_vendor_id,
          }}
        />
        <div className="flex-grow grid grid-cols-1 gap-4 py-8 px-6 rounded-[16px] bg-custom-neutral-100">
          <FileInput
            onFileSelect={handleLogoFileSelect}
            setSelectedFile={setLogoUrl}
            buttonText="Pilih Berkas"
            multiple={false}
            accept=".jpg, .jpeg"
            Label="Unggah Logo"
            HelperText="Format .JPG, .JPEG dan maksimal 2MB"
            state={logoUploadState}
            onCancel={handleLogoCancel}
            selectedFile={logo_url}
            maxSizeMB={2}
          />
          <FileInput
            onFileSelect={handleDokPendukungFileSelect}
            setSelectedFile={setDokPendukungUrl}
            buttonText="Pilih Berkas"
            multiple={false}
            accept=".pdf"
            Label="Unggah Dokumen Pendukung"
            HelperText="Format .PDF dan maksimal 2MB"
            state={dokPendukungUploadState}
            onCancel={handleDokPendukungCancel}
            selectedFile={dok_pendukung_url}
            maxSizeMB={2}
          />
        </div>
      </div>
      <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
        <Button
          label="Kembali"
          variant="secondary"
          size="md"
          onClick={onBack}
        />
        <Button
          label="Simpan & Lanjut"
          variant="primary"
          size="md"
          onClick={onNext}
        />
      </div>
      <CustomAlert
        message={alertMessage}
        severity={alertSeverity}
        openInitially={alertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
};

export default InputVendor;
