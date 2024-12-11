import React, { useState, useEffect } from "react";
import TextInput from "../components/input";
import Button from "../components/button";
import FileInput from "../components/FileInput";
import IconCheckbox from "../components/checkbox";
import { CloseCircle } from "iconsax-react";
import Dropdown from "../components/dropdownontopofmodal";
import CustomAlert from "../components/alert";

const Register = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [nama_lengkap, setNamaLengkap] = useState("");
  const [nik, setNIK] = useState("");
  const [nrp, setNRP] = useState("");
  const [balai_kerja_id, setBalai] = useState("");
  const [satuan_kerja_id, setSatuanKerja] = useState("");
  const [no_handphone, setNomorTelepon] = useState("");
  const [surat_penugasan_url, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState("default");
  const [progress, setProgress] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [alertOpen, setAlertOpen] = useState(false);
  const [balaiOptions, setBalaiOptions] = useState([]);

  const labels = {
    nama_lengkap: "Nama Lengkap",
    nik: "NIK",
    email: "Email",
    satuan_kerja_id: "Satuan Kerja",
    no_handphone: "Nomor Telepon",
    balai_kerja_id: "Balai",
    surat_penugasan_url: "SK/Surat Penugasan",
  };

  // const balaiOptions = [{ value: "1", label: "balai 007" }];
  useEffect(() => {
    const fetchBalaiOptions = async () => {
      try {
        const response = await fetch(
          "https://api-ecatalogue-staging.online/api/get-balai-kerja"
        );
        const result = await response.json(); // Pastikan 'result' menerima seluruh respons API
        if (result && result.data && Array.isArray(result.data)) {
          // Akses 'result.data' karena data balai kerja ada di properti 'data'
          const formattedOptions = result.data.map((item) => ({
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

  const satuanKerjaOptions = [{ value: "1", label: "satker_007" }];

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };
  const handleFileSelect = (files) => {
    if (files.length === 0) {
      setError("File wajib dipilih.");
      return;
    }

    const file = files[0];

    // if (file.size > 512 * 1024) {
    //   setError("Ukuran berkas tidak boleh lebih dari 2 MB.");
    //   return;
    // }
    const handleBalaiSelect = (selectedOption) => {
      console.log("Selected Option:", selectedOption);
      setBalai(selectedOption.value);
    };
    setSelectedFile(file);
    setUploadState("processing");
    setError("");

    // Simulate upload progress
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
    setUploadState("default");
    setSelectedFile(null);
    setProgress(0);
  };

  const handleRegister = async () => {
    setErrorMessages({});
    setGeneralError("");

    const newErrorMessages = {};
    if (!nama_lengkap)
      newErrorMessages.nama_lengkap = "Nama Lengkap tidak boleh kosong";
    if (!nik) newErrorMessages.nik = "NIK tidak boleh kosong";
    if (!email) newErrorMessages.email = "Email tidak boleh kosong";
    if (!satuan_kerja_id)
      newErrorMessages.satuan_kerja_id = "Satuan Kerja tidak boleh kosong";
    if (!no_handphone)
      newErrorMessages.no_handphone = "Nomor Telepon tidak boleh kosong";
    if (!balai_kerja_id)
      newErrorMessages.balai_kerja_id = "Balai tidak boleh kosong";
    if (!surat_penugasan_url)
      newErrorMessages.surat_penugasan_url =
        "Upload SK/Surat Penugasan tidak boleh kosong";

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      setGeneralError(
        "Anda belum mengisi kolom: " +
          Object.keys(newErrorMessages)
            .map((key) => labels[key])
            .join(", ")
      );
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("nama_lengkap", nama_lengkap);
    formData.append("nik", nik);
    formData.append("nrp", nrp);
    formData.append("balai_kerja_id", balai_kerja_id);
    formData.append("satuan_kerja_id", satuan_kerja_id);
    formData.append("no_handphone", no_handphone);
    formData.append("surat_penugasan_url", surat_penugasan_url);
    // console.log("Data yang dikirim ke API:");
    // console.log({
    //   email,
    //   nama_lengkap,
    //   nik,
    //   nrp,
    //   balai_kerja_id,
    //   satuan_kerja_id,
    //   no_handphone,
    //   surat_penugasan_url,
    // });
    for (let [key, value] of formData.entries()) {
      console.log(`Key: ${key}, Value: ${value}`);
    }
    try {
      console.log("Payload for API:", surat_penugasan_url);
      const jsonPayload = JSON.stringify(formData);
      console.log("Payload for API:", jsonPayload);
      const response = await fetch(
        "https://api-ecatalogue-staging.online/api/store-user",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      // Check the response status
      if (!response.ok || result.status === "error") {
        throw new Error(result.message || "Terjadi kesalahan saat registrasi.");
      }

      setAlertMessage(result.message || "Registrasi berhasil!");
      setAlertSeverity("success");
      setAlertOpen(true);

      if (result.status === "success") {
        onClose();
      }
    } catch (error) {
      setAlertMessage(error.message);
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleSatuanKerjaSelect = (selectedOption) => {
    setSatuanKerja(selectedOption.value);
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
        <Button variant="blue_text" size="Extra_Small" onClick={onClose}>
          Masuk
        </Button>
      </div>

      <TextInput
        label="Nama Lengkap"
        placeholder="Masukkan Nama Lengkap"
        value={nama_lengkap}
        isRequired={true}
        errorMessage="Nama Lengkap tidak boleh kosong"
        onChange={(e) => setNamaLengkap(e.target.value)}
      />

      <div className="flex justify-center items-center">
        <div className="flex gap-x-8 w-full max-w-5xl">
          <div className="flex-1 space-y-4">
            <TextInput
              label="NIK"
              placeholder="Masukkan NIK"
              value={nik}
              isRequired={true}
              errorMessage="NIK tidak boleh kosong"
              onChange={(e) => setNIK(e.target.value)}
            />
            <TextInput
              label="NRP"
              placeholder="Masukkan NRP"
              value={nrp}
              onChange={(e) => setNRP(e.target.value)}
            />
            <Dropdown
              options={balaiOptions}
              label="Balai"
              placeholder="Pilih Balai"
              onSelect={(selectedOption) => setBalai(selectedOption.value)}
              isRequired={true}
              errorMessage="Balai tidak boleh kosong"
            />
            {/* <Dropdown
              options={balaiOptions}
              label="Balai"
              placeholder="Pilih Balai"
              onSelect={(selectedOption) => setBalai(selectedOption.value)}
              value={balaiOptions.find(
                (option) => option.value === balai_kerja_id
              )}
              isRequired={true}
              errorMessage="Balai tidak boleh kosong"
            /> */}
          </div>

          <div className="flex-1 space-y-4">
            <TextInput
              label="Email"
              placeholder="Masukkan Email"
              value={email}
              isRequired={true}
              errorMessage="Email tidak boleh kosong"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <Dropdown
              options={satuanKerjaOptions}
              label="Satuan Kerja"
              placeholder="Pilih Satuan Kerja"
              onSelect={handleSatuanKerjaSelect}
              isRequired={true}
              errorMessage="Satuan Kerja tidak boleh kosong"
            />
            <Dropdown
              options={getOptions()}
              label="Kategori Vendor/Perusahaan"
              placeholder="Pilih kategori vendor/perusahaan"
              errorMessage="Kategori tidak boleh kosong."
              value={kategori_vendor_id}
              onSelect={(selectedOption) => {
                const associatedValues = labelToCategoriesMap[
                  selectedOption.label
                ] || [selectedOption.value];

                setkategori_vendor_id(associatedValues.join(","));
              }}
              isRequired={true}
            />{" "} */}
            <Dropdown
              options={satuanKerjaOptions}
              label="Kategori Vendor/Perusahaan"
              placeholder="Pilih kategori vendor/perusahaan"
              errorMessage="Kategori tidak boleh kosong."
              value={satuan_kerja_id}
              onSelect={(selectedOption) =>
                setSatuanKerja(selectedOption.value)
              }
              isRequired={true}
            />

            <TextInput
              label="Nomor Telepon"
              placeholder="Masukkan Nomor Telepon"
              value={no_handphone}
              isRequired={true}
              errorMessage="Nomor Telepon tidak boleh kosong"
              onChange={(e) => setNomorTelepon(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        {/* <FileInput
          onFileSelect={handleFileSelect}
          selectedFile={surat_penugasan_url}
          state={uploadState}
          progress={progress}
          required={true}
          Label="Upload SK/Surat Penugasan"
          HelperText="Format .JPG, .PNG dan maksimal 512Kb"
          errorMessage="Upload SK/Surat Penugasan tidak boleh kosong"
          onCancel={() => {
            setSelectedFile(null);
            setUploadState("default");
            setProgress(0);
          }}
        /> */}
        <FileInput
          onFileSelect={handleFileSelect}
          setSelectedFile={setSelectedFile} // Pass the setter function here
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
          onClick={handleRegister}
          variant="solid_blue"
          size="Medium"
          disabled={!isChecked}>
          Buat Akun
        </Button>
        <CustomAlert
          message={alertMessage}
          severity={alertSeverity}
          openInitially={alertOpen}
          onClose={() => setAlertOpen(false)}
        />
      </div>
    </div>
  );
};

export default Register;
