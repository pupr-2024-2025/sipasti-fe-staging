import React, { useState, useEffect } from "react";
import Navbar from "../../components/navigationbar";
import Tabs from "../../components/Tabs";
import TextInput from "../../components/input";
import Button from "../../components/button";
import Stepper from "../../components/stepper";
import Dropdown from "../../components/dropdown1";
// import Tahap2 from "./tahap2";
// import Tahap3 from "./tahap3";
// import Tahap4 from "./tahap4";
import CustomAlert from "../../components/alert";
import axios from "axios";
import { useRouter } from "next/router";
import { data } from "autoprefixer";
import { Formik } from "formik";
import SipastiForm from "./tahap1/forms/SipastiForm";
import ManualForm from "./tahap1/forms/ManualForm";
import tahap1Store from "./tahap1/forms/store/tahap1store";

const Tahap1V2 = () => {
  const [koderupSipasti, setKodeRUPSipasti] = useState("");
  const [namaPaketSipasti, setNamaPaketSipasti] = useState("");
  const [namaPPKSipasti, setNamaPPKSipasti] = useState("");
  const [jabatanPPKSipasti, setJabatanPPKSipasti] = useState("");
  // const [alertOpen, setAlertOpen] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");
  // const [alertSeverity, setAlertSeverity] = useState("info");
  const [balai_kerja_id, setBalai] = useState("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for Input Manual tab
  const [koderupManual, setKodeRUPManual] = useState("");
  const [namaBalaiManual, setNamaBalaiManual] = useState(0);
  const [namaPaketManual, setNamaPaketManual] = useState("");
  const [namaPPKManual, setNamaPPKManual] = useState("");
  const [jabatanPPKManual, setJabatanPPKManual] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  // const [filterCriteria, setFilterCriteria] = useState("");
  const [balaiOptions, setBalaiOptions] = useState([]);

  const handleCariData = () => {
    console.log("Mencari data di SIPASTI dengan Kode RUP:", koderupSipasti);
  };

  const {
    selectedTab,
    setInitialValueManual,
    initialValueManual,
    alertMessage,
    alertSeverity,
    isAlertOpen,
    setIsAlertOpen,
  } = tahap1Store();

  const NUMBER_OF_STEPS = 4;
  const stepLabels = [
    "Informasi Umum",
    "Identifikasi Kebutuhan",
    "Penentuan Shortlist Vendor",
    "Perancangan Kuesioner",
  ];
  const handleSubmit = async (type) => {
    const url =
      "http://api-ecatalogue-staging.online/api/perencanaan-data/store-informasi-umum";
    const data =
      type === "sipasti"
        ? {
          tipe_informasi_umum: "sipasti",
          kode_rup: koderupSipasti,
          nama_paket: namaPaketSipasti,
          nama_ppk: namaPPKSipasti,
          jabatan_ppk: jabatanPPKSipasti,
          nama_balai: "",
        }
        : {
          tipe_informasi_umum: "manual",
          kode_rup: koderupManual,
          nama_paket: namaPaketManual,
          nama_ppk: namaPPKManual,
          jabatan_ppk: jabatanPPKManual,
          nama_balai: namaBalaiManual,
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        console.log("Data berhasil dikirim ke API:", result);
        setAlertMessage("Data berhasil Disimpan.");
        setAlertSeverity("success");
        setAlertOpen(true);
        localStorage.setItem("informasi_umum_id", result.data.id);
        return true;
      } else {
        // Menampilkan pesan error dari API
        const errorMessage = result.message || "Gagal mengirim data ke API.";
        console.error("Gagal mengirim data ke API:", errorMessage);
        setAlertMessage(errorMessage);
        setAlertSeverity("error");
        setAlertOpen(true);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("Terjadi kesalahan saat menghubungkan ke API.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return false;
    }
  };
  useEffect(() => {
    const fetchBalaiOptions = async () => {
      try {
        const response = await fetch(
          "https://api-ecatalogue-staging.online/api/get-balai-kerja"
        );
        const result = await response.json();
        console.log("Get data balai" + result);
        if (result && result.data && Array.isArray(result.data)) {
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromTahap2 = params.get("fromTahap2");

    if (fromTahap2 === "true") {
      const informasiUmumId = localStorage.getItem("informasi_umum_id");
      if (informasiUmumId) {
        fetchInformasiUmum(informasiUmumId);
      }
    }
  }, [balaiOptions]); // Tambahkan balaiOptions ke dependensi
  console.log("nama balai manual", namaBalaiManual);

  const fetchInformasiUmum = async (id) => {
    console.log("Isi balaiOptions:", balaiOptions);
    try {
      const response = await axios.get(
        `https://api-ecatalogue-staging.online/api/perencanaan-data/informasi-umum/${id}`
      );
      const result = response.data;

      console.log("Get data informasi umum", result.data.nama_balai);

      if (result?.data) {
        // setKodeRUPManual(result.data.kode_rup || "");
        // setNamaPaketManual(result.data.nama_paket || "");
        // setNamaPPKManual(result.data.nama_ppk || "");
        // setJabatanPPKManual(result.data.jabatan_ppk || "");
        console.log("nama balai yang terisi", result.data.nama_balai);
        console.log("Isi formatted options : " + balaiOptions);
        const selectedBalai = balaiOptions.find((option) => {
          console.log("Isi dari option value : " + option.value);
          return option.value === parseInt(result.data.nama_balai);
        });
        if (typeof selectedBalai === "undefined") {
          console.log("error undefined data");
        }
        console.log("isi selected balai : " + selectedBalai?.label ?? "");
        const dataSaved = {
          kodeRup: result.data.kode_rup,
          namaPaket: result.data.nama_paket,
          namaPpk: result.data.nama_ppk,
          jabatanPpk: result.data.jabatan_ppk,
          namaBalai: selectedBalai,
        }
        setInitialValueManual(dataSaved);
        setNamaBalaiManual(selectedBalai?.value ?? 0);
      }
    } catch (error) {
      console.error("Gagal memuat data Informasi Umum:", error);
    }
    console.log("oh my wow", namaBalaiManual);
  };
  console.log("ayam bakar ash shiddiq", namaBalaiManual);
  
  console.log("type of nama balai", typeof namaBalaiManual);
  const areFieldsFilled = () => {
    console.log("=== Type Nama Balai", typeof namaBalaiManual);
    console.log("=== Value Nama Balai", namaBalaiManual);
    console.log("=== Type Nama Paket", typeof namaPaketManual);
    console.log("=== Value Nama Paket", namaPaketManual);
    console.log("=== Type Nama PPK", typeof namaPPKManual);
    console.log("=== Value Nama PPK", namaPPKManual);
    console.log("=== Type Jabatan PPK", typeof jabatanPPKManual);
    console.log("=== Value Jabatan PPK", jabatanPPKManual);
    return (
      typeof namaBalaiManual === "number" &&
      // namaBalaiManual.trim() !== "" &&
      typeof namaPaketManual === "string" &&
      namaPaketManual.trim() !== "" &&
      typeof namaPPKManual === "string" &&
      namaPPKManual.trim() !== "" &&
      typeof jabatanPPKManual === "string" &&
      jabatanPPKManual.trim() !== ""
    );
  };

  console.log('balaiOptions', balaiOptions)

  const handleNextStep = async (type) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (!areFieldsFilled()) {
        showAlert("Pastikan semua field telah diisi dengan benar.", "warning");
        return;
      }

      const isSubmitSuccessful = await handleSubmit(type);
      if (isSubmitSuccessful) {
        router.replace("/perencanaan_data/tahap2");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  console.log(selectedTab);

  return (
    <div className="p-8">
      <Navbar />
      <div className="space-y-8">
        <div className="space-y-3 pt-8">
          <h3 className="text-H3 text-emphasis-on_surface-high">
            Tahap Perencanaan Data
          </h3>
          <div className="justify-center items-center space-x-4 mt-3 bg-neutral-100 px-6 pb-8 pt-16 rounded-[16px]">
            <Stepper
              currentStep={currentStep}
              numberOfSteps={NUMBER_OF_STEPS}
              labels={stepLabels}
            />
            <br />
          </div>
          <h4 className="text-H4 text-emphasis-on_surface-high">
            Informasi Umum
          </h4>
          <SipastiForm
            hide={selectedTab !== 0}
          />
          <ManualForm
            hide={selectedTab !== 1}
            balaiOptions={balaiOptions}
            initialValues={initialValueManual}
          />
        </div>
      </div>
      <CustomAlert
        message={alertMessage}
        severity={alertSeverity}
        openInitially={isAlertOpen}
        onClose={() => setIsAlertOpen(true)}
      />
    </div>
  );
};

export default Tahap1V2;
