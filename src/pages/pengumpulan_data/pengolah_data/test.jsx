import { useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { useStore } from "zustand";
import Navbar from "../../../components/navigationbar";
import TextInput from "../../../components/input";
import entri_dataStore from "./test/test";
import informasi_tahap_pengumpulanStore from "../pengawas/informasi_tahap_pengumpulan/informasi_tahap_pengumpulan";
import Datepicker from "../../../components/datepicker";
import SearchBox from "../../../components/searchbox";
import Button from "../../../components/button";
import Dropdown from "../../../components/dropdown";

export default function EntriData() {
  const [nip, setNip] = useState("");
  const [date, setDate] = useState(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const {
    selectedValue,
    userOptions,
    pengawasUserOptions,
    fetchPengawasUserOptions,
    fetchUserOptions,
    initialValues,
    materials,
    peralatans,
    tenaga_Kerjas,
    dataEntri,
    fetchData,
    setSelectedValue,
    a,
  } = useStore(entri_dataStore);

  useEffect(() => {
    fetchUserOptions();
  }, [fetchUserOptions]);

  useEffect(() => {
    console.log("haiii", pengawasUserOptions); // Memeriksa struktur options dropdown
    fetchPengawasUserOptions();
  }, [fetchPengawasUserOptions]);

  const handleSubmit = async (values) => {
    console.log("Values sebelum validasi:", values);
    if (!values.tanggal_survei) {
      alert("Tanggal survei wajib diisi!");
      return;
    }

    const informasiUmumId = localStorage.getItem("informasi_umum_id");

    const material = values?.materials || [];
    const peralatan = values?.peralatans || [];
    const tenagaKerja = values?.tenagaKerjas || [];

    const requestData = {
      informasi_umum_id: informasiUmumId,
      tanggal_survei: dayjs(values.tanggal_survei).format("YYYY-MM-DD"),
      material,
      peralatan,
      tenaga_kerja: tenagaKerja,
    };

    console.log("Data yang akan dikirim ke API:", requestData);

    try {
      const response = await axios.post(
        "https://api-ecatalogue-staging.online/api/pengumpulan-data/store-entri-data",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response dari API:", response.data);

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

    console.log("Data berhasil disimpan ke state:", values);
  };

  const handleDateChange = (newDate) => {
    console.log("Tanggal yang dipilih di DatePicker:", newDate);
    if (!newDate) {
      setError(true);
      setHelperText("Tanggal harus diisi");
    } else {
      setError(false);
      setHelperText("");
      setFieldValue("tanggal_survei", newDate);
    }
  };

  useEffect(() => {
    fetchData(136);
  }, [fetchData]);

  const PetugasLapanganForm = ({ values, setFieldValue }) => {
    return (
      <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
        <div className="space-y-4">
          <Field
            as={Dropdown}
            name="petugas_lapangan"
            label="Nama Petugas Lapangan"
            labelPosition="left"
            placeholder="Masukkan Petugas Lapangan"
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
            labelPosition="left"
            placeholder="Masukkan NIP Petugas Lapangan"
            isRequired={true}
            size="Medium"
            errorMessage="NIP tidak boleh kosong"
            value={values.nip || ""}
            onChange={(e) => setFieldValue("nip", e.target.value)}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "352px",
            }}>
            <div className="text-B2">Tanggal Survei</div>
            <Datepicker
              label="Tanggal Survei"
              value={
                values.tanggal_survei ? dayjs(values.tanggal_survei) : null
              }
              onChange={(date) => {
                setFieldValue("tanggal_survei", date);
                handleDateChange(date);
              }}
              error={error}
              helperText={helperText}
            />
          </div>
          <Field
            as={Dropdown}
            name="pengawas_lapangan"
            label="Nama Pengawas"
            labelPosition="left"
            placeholder="Masukkan Nama Pengawas"
            isRequired={true}
            options={pengawasUserOptions} // Daftar opsi dropdown
            onSelect={(selectedOption) => {
              // Set nilai 'petugas_lapangan' dan 'nip' berdasarkan pilihan dropdown
              setFieldValue("petugas_lapangan", selectedOption.value);
              setNip(selectedOption.nrp); // Set nilai NIP menggunakan setState

              // Log nilai yang dipilih untuk debugging
              console.log("Selected Pengawas:", selectedOption);
              console.log("Selected NIP:", selectedOption.nrp);
            }}
            size="Medium"
            errorMessage="Nama Pengawas tidak boleh kosong"
          />

          {/* Tampilkan NIP di bawah dropdown */}
          {nip && (
            <div className="text-sm text-gray-600 mt-2">
              <strong>NIP:</strong> {nip}
            </div>
          )}

          {/* TextInput untuk memasukkan NIP */}
          <TextInput
            label="NIP"
            labelPosition="left"
            placeholder="Masukkan NIP Petugas Lapangan"
            isRequired={true}
            size="Medium"
            errorMessage="NIP tidak boleh kosong"
            value={nip || ""} // Gunakan nilai dari state nip
            onChange={(e) => {
              setNip(e.target.value); // Update nip jika ada perubahan manual
              setFieldValue("nip", e.target.value); // Sinkronkan dengan formik
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "300px",
            }}>
            <div className="text-B2">Tanggal Pengawasan</div>
            <Datepicker
              label="Tanggal Pengawasan"
              value={values.tanggal_pengawasan || ""}
              onChange={(date) => setFieldValue("tanggal_pengawasan", date)}
              error={false}
              helperText=""
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      // Add other necessary props if needed
    >
      {({ setFieldValue, values }) => (
        <Form>
          <PetugasLapanganForm values={values} setFieldValue={setFieldValue} />
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
}
