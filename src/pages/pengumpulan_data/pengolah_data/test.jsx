import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useStore } from "zustand";
import Navbar from "../../../components/navigationbar";
import TextInput from "../../../components/input";
import entri_dataStore from "./test/test";
import informasi_tahap_pengumpulanStore from "../pengawas/informasi_tahap_pengumpulan/informasi_tahap_pengumpulan";
import SearchBox from "../../../components/searchbox";
import Button from "../../../components/button";
import Dropdown from "../../../components/dropdown";
import dayjs from "dayjs";

// Import untuk lokal Indonesia
import "dayjs/locale/id";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

// Set locale ke Indonesia
dayjs.locale("id");

export default function EntriData() {
  const [nip, setNip] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const {
    userOptions,
    pengawasUserOptions,
    fetchPengawasUserOptions,
    fetchUserOptions,
    initialValues,
    materials,
    peralatans,
    tenaga_Kerjas,
    fetchData,
  } = useStore(entri_dataStore);

  useEffect(() => {
    fetchUserOptions();
    fetchPengawasUserOptions();
    fetchData(136);
  }, [fetchUserOptions, fetchPengawasUserOptions, fetchData]);

  const handleSubmit = async (values) => {
    if (!values.tanggal_survei) {
      alert("Tanggal survei wajib diisi!");
      return;
    }

    // Format tanggal sebelum mengirim ke API (dd/mm/yyyy)
    const formattedTanggalSurvei = dayjs(values.tanggal_survei).format(
      "DD/MM/YYYY"
    );

    // Cek nilai tanggal survei yang diformat
    console.log("Tanggal Survei yang diformat:", formattedTanggalSurvei);

    const informasiUmumId = localStorage.getItem("informasi_umum_id");

    const requestData = {
      informasi_umum_id: informasiUmumId,
      tanggal_survei: formattedTanggalSurvei,
      material: values.materials || [],
      peralatan: values.peralatans || [],
      tenaga_kerja: values.tenagaKerjas || [],
    };

    try {
      const response = await axios.post(
        "https://api-ecatalogue-staging.online/api/pengumpulan-data/store-entri-data",
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const identifikasiKebutuhanId =
          response.data?.data?.material?.[0]?.identifikasi_kebutuhan_id ?? 0;
        localStorage.setItem(
          "identifikasi_kebutuhan_id",
          identifikasiKebutuhanId
        );
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    }
  };

  const PetugasLapanganForm = ({ values, setFieldValue }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="id">
      <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
        <Field
          as={Dropdown}
          name="petugas_lapangan"
          label="Nama Petugas Lapangan"
          labelPosition="left"
          placeholder="Masukkan Nama Petugas Lapangan"
          isRequired={true}
          options={userOptions}
          onSelect={(selectedOption) =>
            setFieldValue("petugas_lapangan", selectedOption.value)
          }
          size="Medium"
          errorMessage="Nama Petugas Lapangan tidak boleh kosong"
        />
        <TextInput
          label="NIP"
          placeholder="Masukkan NIP Petugas Lapangan"
          isRequired={true}
          size="Medium"
          value={values.nip || ""}
          onChange={(e) => setFieldValue("nip", e.target.value)}
        />
        <div className="text-B2">Tanggal Survei</div>
        <DatePicker
          label="Tanggal Survei"
          value={values.tanggal_survei ? dayjs(values.tanggal_survei) : null}
          onChange={(date) => {
            setFieldValue("tanggal_survei", date);
            // Cek tanggal yang dipilih saat diubah (format dd/mm/yyyy)
            console.log(
              "Tanggal Survei yang dipilih:",
              date.format("DD/MM/YYYY")
            );
          }}
          slotProps={{
            textField: {
              error,
              helperText: error ? "Tanggal harus diisi" : "",
              fullWidth: true,
            },
          }}
          localeText={{
            cancelButtonLabel: "Batal",
            okButtonLabel: "Pilih",
          }}
        />
        <Field
          as={Dropdown}
          name="pengawas_lapangan"
          label="Nama Pengawas"
          placeholder="Masukkan Nama Pengawas"
          isRequired={true}
          options={pengawasUserOptions}
          onSelect={(selectedOption) => {
            setFieldValue("pengawas_lapangan", selectedOption.value);
            setNip(selectedOption.nrp);
          }}
          size="Medium"
          errorMessage="Nama Pengawas tidak boleh kosong"
        />
        {nip && (
          <div className="text-sm text-gray-600 mt-2">
            <strong>NIP:</strong> {nip}
          </div>
        )}
      </div>
    </LocalizationProvider>
  );

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, values }) => (
        <Form>
          <PetugasLapanganForm values={values} setFieldValue={setFieldValue} />
          <Button type="submit">Kirim</Button>
        </Form>
      )}
    </Formik>
  );
}
