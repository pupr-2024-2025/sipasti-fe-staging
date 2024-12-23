import { useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { useStore } from "zustand";
import Navbar from "../../../../components/navigationbar";
import CustomAlert from "../../../../components/alert";
import TextInput from "../../../../components/input";
import entri_dataStore from "../pemeriksaan_store/pemeriksaan_data";
import informasi_tahap_pengumpulanStore from "../informasi_tahap_pengumpulan/informasi_tahap_pengumpulan";
import SearchBox from "../../../../components/searchbox";
import Button from "../../../../components/button";
import Dropdown from "../../../../components/dropdown";
import RadioButton from "../../../../components/radiobutton";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import axios from "axios";

import "dayjs/locale/id";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

dayjs.locale("id");

export default function EntriData() {
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
    material,
    peralatan,
    tenaga_kerja,
    dataEntri,
    fetchData,
    setSelectedValue,
    data_vendor_id,
    identifikasi_kebutuhan_id,
  } = useStore(entri_dataStore);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchUserOptions();
  }, [fetchUserOptions]);

  useEffect(() => {
    fetchPengawasUserOptions();
  }, [fetchPengawasUserOptions]);

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    severity: "info",
    message: "",
  });

  const handleAlertClose = () => {
    setAlertInfo((prev) => ({ ...prev, open: false }));
  };

  const validateFields = (values) => {
    if (!values.tanggal_survei) {
      setAlertInfo({
        open: true,
        severity: "error",
        message: "Tanggal survei wajib diisi!",
      });
      return false;
    }
    if (!values.user_id_petugas_lapangan) {
      setAlertInfo({
        open: true,
        severity: "error",
        message: "Petugas lapangan wajib diisi!",
      });
      return false;
    }
    if (!values.user_id_pengawas) {
      setAlertInfo({
        open: true,
        severity: "error",
        message: "Pengawas wajib diisi!",
      });
      return false;
    }
    if (!values.nama_pemberi_informasi) {
      setAlertInfo({
        open: true,
        severity: "error",
        message: "Nama pemberi informasi wajib diisi!",
      });
      return false;
    }
    // if (values.material.length === 0) {
    //   setAlertInfo({
    //     open: true,
    //     severity: "error",
    //     message: "Material wajib diisi minimal satu item!",
    //   });
    //   return false;
    // }
    // if (values.peralatan.length === 0) {
    //   setAlertInfo({
    //     open: true,
    //     severity: "error",
    //     message: "Peralatan wajib diisi minimal satu item!",
    //   });
    //   return false;
    // }
    // if (values.tenaga_kerja.length === 0) {
    //   setAlertInfo({
    //     open: true,
    //     severity: "error",
    //     message: "Tenaga kerja wajib diisi minimal satu item!",
    //   });
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async (values) => {
    console.log("Values sebelum validasi:", values);
    if (!validateFields(values)) {
      return;
    }

    try {
      const response = await axios.post(
        "https://api-ecatalogue-staging.online/api/pengumpulan-data/store-entri-data",
        {
          ...values,
          data_vendor_id,
          identifikasi_kebutuhan_id,
        },
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

        setAlertInfo({
          open: true,
          severity: "success",
          message: "Data berhasil disimpan!",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting data:", error);

      const errorMessage =
        error.response?.data?.message ??
        "Gagal menyimpan data. Silakan coba lagi.";
      setAlertInfo({
        open: true,
        severity: "error",
        message: errorMessage,
      });
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
    if (id) {
      console.log("shortlist_id yang dikirim:", id);
      fetchData(id);
    }
  }, [id, fetchData]);

  // useEffect(() => {
  //   fetchData(136);
  // }, [fetchData]);
  console.log("dataEntri:", dataEntri);
  const PemberiInformasiForm = ({ dataEntri, setFieldValue }) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} locale="id">
        <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
          <div className="space-y-8">
            <TextInput
              label="Nama Pemberi Informasi / Jabatan"
              labelPosition="left"
              placeholder="Nama Pemberi Informasi / Jabatan tidak ada"
              size="Medium"
              errorMessage="Nama pemberi informasi / jabatan tidak boleh kosong"
              value={
                dataEntri?.keterangan_pemberi_informasi
                  ?.nama_pemberi_informasi || ""
              }
              disabledActive={true}
            />
            <TextInput
              label="Tanda Tangan Responden"
              labelPosition="left"
              placeholder="Tanda Tangan Responden tidak ada"
              size="Medium"
              disabledActive={true}
              errorMessage="Tanda tangan responden tidak boleh kosong"
              value={
                dataEntri?.keterangan_pemberi_informasi
                  ?.tanda_tangan_responden || ""
              }
            />
          </div>
        </div>
      </LocalizationProvider>
    );
  };
  const PetugasLapanganForm = ({ dataEntri, setFieldValue }) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} locale="id">
        <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
          <div className="space-y-8">
            <TextInput
              label="Nama Petugas Lapangan"
              labelPosition="left"
              placeholder="Nama Petugas Lapangan tidak ada"
              size="Medium"
              errorMessage="Nama Petugas Lapangan tidak boleh kosong"
              value={
                dataEntri?.keterangan_petugas_lapangan?.nama_petugas_lapangan ||
                ""
              }
              disabledActive={true}
            />

            <TextInput
              label="NIP Petugas Lapangan"
              labelPosition="left"
              placeholder="NIP Petugas Lapangan tidak ada"
              size="Medium"
              errorMessage="NIP Petugas Lapangan tidak boleh kosong"
              value={
                dataEntri?.keterangan_petugas_lapangan?.nip_petugas_lapangan ||
                ""
              }
              disabledActive={true}
            />

            <div
              style={{ display: "flex", alignItems: "center", gap: "256px" }}>
              <div className="text-B2" style={{ minWidth: "200px" }}>
                Tanggal Survei
              </div>
              <DatePicker
                label="Tanggal Survei"
                value={
                  dataEntri?.keterangan_petugas_lapangan?.tanggal_survei
                    ? dayjs(
                        dataEntri.keterangan_petugas_lapangan.tanggal_survei,
                        "DD-MM-YYYY"
                      )
                    : null
                }
                onChange={(date) => {
                  const formattedDate = date.format("DD-MM-YYYY");
                  setFieldValue("tanggal_survei", formattedDate);
                }}
                slotProps={{
                  textField: {
                    error: false,
                    helperText: "",
                    fullWidth: true,
                  },
                }}
                localeText={{
                  cancelButtonLabel: "Batal",
                  okButtonLabel: "Pilih",
                }}
                disabled
              />
            </div>

            <TextInput
              label="Nama Pengawas"
              labelPosition="left"
              placeholder="Nama Pengawas tidak ada"
              size="Medium"
              errorMessage="Nama Pengawas tidak boleh kosong"
              value={
                dataEntri?.keterangan_petugas_lapangan?.nama_pengawas || ""
              }
              disabledActive={true}
            />

            <TextInput
              label="NIP Pengawas"
              labelPosition="left"
              placeholder="NIP Pengawas tidak ada"
              size="Medium"
              errorMessage="NIP Pengawas tidak boleh kosong"
              value={dataEntri?.keterangan_petugas_lapangan?.nip_pengawas || ""}
              disabledActive={true}
            />

            <div
              style={{ display: "flex", alignItems: "center", gap: "256px" }}>
              <div className="text-B2" style={{ minWidth: "200px" }}>
                Tanggal Pengawasan
              </div>
              <DatePicker
                label="Tanggal Pengawasan"
                value={
                  dataEntri?.keterangan_petugas_lapangan?.tanggal_pengawasan
                    ? dayjs(
                        dataEntri.keterangan_petugas_lapangan
                          .tanggal_pengawasan,
                        "DD-MM-YYYY"
                      )
                    : null
                }
                onChange={(date) => {
                  const formattedDate = date.format("DD-MM-YYYY");
                  setFieldValue("tanggal_pengawasan", formattedDate);
                }}
                slotProps={{
                  textField: {
                    error: false,
                    helperText: "",
                    fullWidth: true,
                  },
                }}
                localeText={{
                  cancelButtonLabel: "Batal",
                  okButtonLabel: "Pilih",
                }}
                disabled
              />
            </div>
          </div>
        </div>
      </LocalizationProvider>
    );
  };

  const MaterialForm = ({ hide }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const paginatedMaterial =
      material?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ) || [];

    return (
      <div className={`${hide ? "hidden" : ""}`}>
        <FieldArray name="material">
          {({ push, remove }) => (
            <div className="mt-6">
              <div className="flex flex-row justify-between items-center">
                <div className="">
                  <Tabs
                    items={["Material", "Peralatan", "Tenaga Kerja"]}
                    onChange={(index) => setSelectedValue(index)}
                    selectedValue={0}
                  />
                </div>
                <SearchBox
                  placeholder="Cari Material..."
                  onSearch={() => {}}
                  withFilter={true}
                />
              </div>
              <div className="rounded-[16px] border border-gray-200 overflow-hidden mt-4">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full min-w-max">
                    <thead>
                      <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                        <th className="px-3 py-6 text-sm text-center w-[52px]">
                          No
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Nama Material
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">Satuan</th>
                        <th className="px-3 py-6 text-sm w-[200px]">
                          Spesifikasi
                        </th>
                        <th className="px-3 py-6 text-sm w-[200px]">Ukuran</th>
                        <th className="px-3 py-6 text-sm w-[140px]">
                          Kodefikasi
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Kelompok Material
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Jumlah Kebutuhan
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">Merk</th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Provinsi
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">Kota</th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Satuan Setempat
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Satuan Setempat Panjang
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Satuan Setempat Lebar
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Satuan Setempat Tinggi
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Konversi Satuan Setempat ke Satuan Standar
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Harga per satuan Setempat (Rp)
                          <span className="text-custom-red-500">*</span>
                        </th>

                        <th className="px-3 py-6 text-sm w-[280px]">
                          Harga Konversi Satuan Setempat ke Satuan Standar (Rp)
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Harga Khusus (Rp)
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Keterangan
                          <span className="text-custom-red-500">*</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedMaterial.map((item, index) => (
                        <tr
                          key={item.id}
                          className={`${
                            index % 2 === 0
                              ? "bg-custom-neutral-0"
                              : "bg-custom-neutral-100"
                          }`}>
                          <td className="px-3 py-6 text-sm text-center">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.nama_material}
                          </td>
                          <td className="px-3 py-6 text-sm">{item.satuan}</td>
                          <td className="px-3 py-6 text-sm">
                            {item.spesifikasi}
                          </td>
                          <td className="px-3 py-6 text-sm">{item.ukuran}</td>
                          <td className="px-3 py-6 text-sm">
                            {item.kodefikasi}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.kelompok_material}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.jumlah_kebutuhan}
                          </td>
                          <td className="px-3 py-6 text-sm">{item.merk}</td>
                          <td className="px-3 py-6 text-sm">
                            {item.provincies_id}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.cities_id}
                          </td>
                          <td className="px-3 py-6">{item.satuan_setempat}</td>
                          <td className="px-3 py-6">
                            {item.satuan_setempat_panjang}
                          </td>
                          <td className="px-3 py-6">
                            {item.satuan_setempat_lebar}
                          </td>
                          <td className="px-3 py-6">
                            {item.satuan_setempat_tinggi}
                          </td>
                          <td className="px-3 py-6">
                            {item.konversi_satuan_setempat_ke_satuan_standar}
                          </td>
                          <td className="px-3 py-6">
                            {item.harga_per_satuan_setempat}
                          </td>
                          <td className="px-3 py-6">
                            {
                              item.harga_konversi_satuan_setempat_ke_satuan_standar
                            }
                          </td>
                          <td className="px-3 py-6">{item.harga_khusus}</td>
                          <td className="px-3 py-6">{item.keterangan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </FieldArray>
      </div>
    );
  };

  const PeralatanForm = ({ hide }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const paginatedPeralatan =
      peralatan?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ) || [];

    return (
      <div className={`${hide ? "hidden" : ""}`}>
        <FieldArray name="peralatan">
          {({ push, remove }) => (
            <div className="mt-6">
              <div className="flex flex-row justify-between items-center">
                <div className="">
                  <Tabs
                    items={["Material", "Peralatan", "Tenaga Kerja"]}
                    onChange={(index) => setSelectedValue(index)}
                    selectedValue={1}
                  />
                </div>
                <SearchBox
                  placeholder="Cari Peralatan..."
                  onSearch={() => {}}
                  withFilter={true}
                />
              </div>
              <div className="rounded-[16px] border border-gray-200 overflow-hidden mt-4">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full min-w-max">
                    <thead>
                      <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                        <th className="px-3 py-6 text-sm text-center w-[52px]">
                          No
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Nama Peralatan
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">Satuan</th>
                        <th className="px-3 py-6 text-sm w-[200px]">
                          Spesifikasi
                        </th>
                        <th className="px-3 py-6 text-sm w-[200px]">
                          Kapasitas
                        </th>
                        <th className="px-3 py-6 text-sm w-[140px]">
                          Kodefikasi
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Kelompok Peralatan
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Jumlah Kebutuhan
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">Merk</th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Provinsi
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Kabupaten/Kota
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Satuan Setempat
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Harga Sewa Satuan Setempat
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Harga Sewa Konversi
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Harga Pokok
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Keterangan
                          <span className="text-custom-red-500">*</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPeralatan.map((item, index) => (
                        <tr
                          key={item.id}
                          className={`${
                            index % 2 === 0
                              ? "bg-custom-neutral-0"
                              : "bg-custom-neutral-100"
                          }`}>
                          <td className="px-3 py-6 text-sm text-center">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.nama_peralatan}
                          </td>
                          <td className="px-3 py-6 text-sm">{item.satuan}</td>
                          <td className="px-3 py-6 text-sm">
                            {item.spesifikasi}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.kapasitas}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.kodefikasi}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.kelompok_peralatan}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.jumlah_kebutuhan}
                          </td>
                          <td className="px-3 py-6 text-sm">{item.merk}</td>
                          <td className="px-3 py-6 text-sm">
                            {item.provincies_id}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.cities_id}
                          </td>
                          <td className="px-3 py-6">{item.satuan_setempat}</td>
                          <td className="px-3 py-6">
                            {item.harga_sewa_satuan_setempat}
                          </td>
                          <td className="px-3 py-6">
                            {item.harga_sewa_konversi}
                          </td>
                          <td className="px-3 py-6">{item.harga_pokok}</td>
                          <td className="px-3 py-6">{item.keterangan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </FieldArray>
      </div>
    );
  };
  const TenagaKerjaForm = ({ hide }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const paginatedTenaga_kerja =
      tenaga_kerja?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ) || [];

    return (
      <div className={`${hide ? "hidden" : ""}`}>
        <FieldArray name="tenagakerja">
          {({ push, remove }) => (
            <div className="mt-6">
              <div className="flex flex-row justify-between items-center">
                <div className="">
                  <Tabs
                    items={["Material", "Peralatan", "Tenaga Kerja"]}
                    onChange={(index) => setSelectedValue(index)}
                    selectedValue={2}
                  />
                </div>
                <SearchBox
                  placeholder="Cari Tenaga Kerja..."
                  onSearch={() => {}}
                  withFilter={true}
                />
              </div>
              <div className="rounded-[16px] border border-gray-200 overflow-hidden mt-4">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full min-w-max">
                    <thead>
                      <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                        <th className="px-3 py-6 text-sm text-center w-[52px]">
                          No
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Jenis Tenaga Kerja
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">Satuan</th>
                        <th className="px-3 py-6 text-sm w-[200px]">
                          Jumlah Kebutuhan
                        </th>
                        <th className="px-3 py-6 text-sm w-[200px]">
                          Kodefikasi
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Provinsi
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Kabupaten/Kota
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Harga per Satuan Setempat
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Harga Konversi per Jam
                          <span className="text-custom-red-500">*</span>
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Keterangan
                          <span className="text-custom-red-500">*</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTenaga_kerja.map((item, index) => (
                        <tr
                          key={item.id}
                          className={`${
                            index % 2 === 0
                              ? "bg-custom-neutral-0"
                              : "bg-custom-neutral-100"
                          }`}>
                          <td className="px-3 py-6 text-sm text-center">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.jenis_tenaga_kerja}
                          </td>
                          <td className="px-3 py-6 text-sm">{item.satuan}</td>
                          <td className="px-3 py-6 text-sm">
                            {item.jumlah_kebutuhan}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.kodefikasi}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.provincies_id}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.cities_id}
                          </td>
                          <td className="px-3 py-6">
                            {item.harga_per_satuan_setempat}
                          </td>
                          <td className="px-3 py-6">
                            {item.harga_konversi_per_jam}
                          </td>
                          <td className="px-3 py-6">{item.keterangan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </FieldArray>
      </div>
    );
  };

  const VerifikasiDokumenForm = ({ hide }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const staticData = [
      { id: "A", kelengkapan: "KRITERIA VERIFIKASI", isTitle: true },
      {
        id: 1,
        kelengkapan: "Memeriksa kelengkapan data dan ada tidaknya bukti dukung",
      },
      {
        id: 2,
        kelengkapan:
          "Jenis material, peralatan, tenaga kerja yang dilakukan pengumpulan data berdasarkan identifikasi kebutuhan.",
      },
      { id: 3, kelengkapan: "Sumber harga pasar." },
      {
        id: 4,
        kelengkapan:
          "Harga survei didapat minimal 3 vendor untuk setiap jenis material peralatan atau sesuai dengan kondisi di lapangan.",
      },
      {
        id: 5,
        kelengkapan: "Khusus peralatan mencantumkan harga beli dan harga sewa.",
      },
      { id: "B", kelengkapan: "KRITERIA VALIDASI", isTitle: true },
      {
        id: 1,
        kelengkapan:
          "Kuesioner terisi lengkap dan sesuai dengan petunjuk cara pengisian kuesioner (lampiran iv) dan sudah ditandatangani Responden, Petugas Lapangan, dan Pengawas.",
      },
      {
        id: 2,
        kelengkapan:
          "Pemeriksaan dilakukan dengan diskusi/tatap muka antara Pengawas dan Petugas Lapangan.",
      },
    ];

    const [radioState, setRadioState] = useState(
      staticData.reduce((acc, item) => {
        acc[item.id] = {
          memenuhi: false,
          tidak_memenuhi: false,
        };
        return acc;
      }, {})
    );

    const handleRadioChange = (id, type) => {
      setRadioState((prevState) => ({
        ...prevState,
        [id]: {
          memenuhi: type === "memenuhi",
          tidak_memenuhi: type === "tidak_memenuhi",
        },
      }));
    };

    const paginatedData =
      staticData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ) || [];

    return (
      <div className={`${hide ? "hidden" : ""}`}>
        <FieldArray name="VerifikasiDokumenForm">
          {({ push, remove }) => (
            <div className="mt-6">
              <div className="flex flex-row justify-between items-center"></div>
              <div className="rounded-[16px] border border-gray-200 overflow-hidden mt-4">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full min-w-max">
                    <thead>
                      <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                        <th className="px-3 py-6 text-sm text-center w-[52px]">
                          No
                        </th>
                        <th className="px-3 py-6 text-sm w-[500px]">
                          Kelengkapan Dokumen
                        </th>
                        <th className="px-3 py-6 text-sm text-center w-[370px]">
                          Memenuhi
                        </th>
                        <th className="px-3 py-6 text-sm text-center w-[370px]">
                          Tidak Memenuhi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((item, index) => (
                        <tr
                          key={`${item.id}-${index}`} // Using combination of item.id and index for a unique key
                          className={`${
                            index % 2 === 0
                              ? "bg-custom-neutral-0"
                              : "bg-custom-neutral-100"
                          }`}>
                          <td className="px-3 py-6 text-sm text-center">
                            {item.isTitle ? item.id : index + 1}{" "}
                            {/* Use index + 1 for numbering */}
                          </td>
                          <td className="px-3 py-6 text-sm">
                            {item.isTitle ? (
                              <span className="font-bold">
                                {item.kelengkapan}
                              </span>
                            ) : (
                              item.kelengkapan
                            )}
                          </td>
                          {!item.isTitle && (
                            <>
                              <td className="px-3 py-6 text-sm text-center">
                                <div className="mt-2">
                                  <input
                                    type="radio"
                                    name={`memenuhi-${item.id}-${index}`} // Unique name using item.id + index
                                    checked={radioState[item.id]?.memenuhi}
                                    value="memenuhi"
                                    onChange={() =>
                                      handleRadioChange(item.id, "memenuhi")
                                    }
                                  />
                                </div>
                              </td>
                              <td className="px-3 py-6 text-sm text-center">
                                <div className="mt-2">
                                  <input
                                    type="radio"
                                    name={`tidak-memenuhi-${item.id}-${index}`} // Unique name using item.id + index
                                    checked={
                                      radioState[item.id]?.tidak_memenuhi
                                    }
                                    value="tidak_memenuhi"
                                    onChange={() =>
                                      handleRadioChange(
                                        item.id,
                                        "tidak_memenuhi"
                                      )
                                    }
                                  />
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </FieldArray>
      </div>
    );
  };

  return (
    <div className="p-8">
      <Navbar />
      <div className="space-y-3 pt-8">
        <h3 className="text-H3 text-emphasis-on_surface-high">
          Entri Data Hasil Survei
        </h3>
        <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
          Blok I: Keterangan Tempat
        </h4>
      </div>
      <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
        <TextInput
          label="Provinsi"
          labelPosition="left"
          placeholder="Masukkan Provinsi"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.provinsi || ""}
        />
        <TextInput
          label="Kabupaten/Kota"
          labelPosition="left"
          placeholder="Masukkan Kabupaten/Kota"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.kota || ""}
        />
        <TextInput
          label="Nama Responden/Vendor"
          labelPosition="left"
          placeholder="Masukkan Nama Responden/Vendor"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.nama_responden || ""}
        />
        <TextInput
          label="Alamat Responden/Geo-tagging"
          labelPosition="left"
          placeholder="Masukkan Alamat"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.alamat || ""}
          // labelMargin="150px"
        />
        <TextInput
          label="Nomor Telepon/HP /E-mail"
          labelPosition="left"
          placeholder="Masukkan Nomor Kontak"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.no_telepon || ""}
        />
        <TextInput
          label="Kategori Responden /Vendor"
          labelPosition="left"
          placeholder="Masukkan Kategori"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.kategori_responden || ""}
        />
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
              Blok II: Keterangan Petugas Lapangan
            </h4>
            {dataEntri && (
              <PetugasLapanganForm
                dataEntri={dataEntri}
                setFieldValue={setFieldValue}
              />
            )}
            <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
              Blok III: Keterangan Pemberi Informasi
            </h4>
            {dataEntri && (
              <PemberiInformasiForm
                dataEntri={dataEntri}
                setFieldValue={setFieldValue}
              />
            )}
            <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
              Blok IV: Keterangan Pemberi Informasi
            </h4>
            <MaterialForm
              values={values}
              setFieldValue={setFieldValue}
              hide={selectedValue !== 0}
              provincesOptions={[]}
              kelompokMaterialOptions={[]}
            />
            <PeralatanForm
              values={values}
              setFieldValue={setFieldValue}
              hide={selectedValue !== 1}
            />
            <TenagaKerjaForm
              values={values}
              setFieldValue={setFieldValue}
              hide={selectedValue !== 2}
            />
            <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
              Blok IV: Verifikasi Dokumen
            </h4>
            <VerifikasiDokumenForm
              values={values}
              setFieldValue={setFieldValue}
            />
            <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
              <Button variant="solid_blue" size="Medium" type="submit">
                Simpan
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <CustomAlert
        message={alertInfo.message}
        severity={alertInfo.severity}
        openInitially={alertInfo.open}
        onClose={handleAlertClose}
      />
    </div>
  );
}

const Tabs = ({ index, items, onChange, selectedValue, button }) => {
  const handleClick = (tabIndex) => {
    onChange(tabIndex);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="inline-flex space-x-2 bg-custom-neutral-100 rounded-[16px] p-2 h-[60px]">
          {items.map((item, tabIndex) => (
            <button
              type="button"
              key={tabIndex}
              onClick={() => handleClick(tabIndex)}
              className={`px-4 py-3 text-Small rounded-[12px] transition-all duration-300 cursor-pointer whitespace-nowrap ${
                selectedValue === tabIndex
                  ? "bg-custom-blue-500 text-emphasis-on_color-high"
                  : "text-emphasis-on_surface-medium hover:bg-surface-light-overlay"
              }`}>
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          {button && (
            <button
              type="button"
              className={`${
                button.variant === "solid_blue"
                  ? "bg-custom-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded-lg`}
              onClick={
                button.onClick || (() => console.log("Button clicked!"))
              }>
              {button.label || "Button"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
