import { useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { useStore } from "zustand";
import Navbar from "../../../components/navigationbar";
import TextInput from "../../../components/input";
import entri_dataStore from "./entri_data/entri_data";
import informasi_tahap_pengumpulanStore from "../pengawas/informasi_tahap_pengumpulan/informasi_tahap_pengumpulan";
import Datepicker from "../../../components/datepicker";
import SearchBox from "../../../components/searchbox";
import Button from "../../../components/button";
import Dropdown from "../../../components/dropdown";

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
            options={pengawasUserOptions}
            onSelect={(selectedOption) =>
              setFieldValue("pengawas_lapangan", selectedOption.value)
            }
            size="Medium"
            errorMessage="Nama Pengawas tidak boleh kosong"
          />
          <TextInput
            label="NIP Pengawas"
            labelPosition="left"
            placeholder="Masukkan NIP Pengawas"
            isRequired={true}
            size="Medium"
            errorMessage="NIP pengawas tidak boleh kosong"
            value={values.nip_pengawas || ""}
            onChange={(e) => setFieldValue("nip_pengawas", e.target.value)}
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

  const MaterialForm = ({ hide }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const paginatedMaterials =
      materials?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ) || [];

    return (
      <div className={`${hide ? "hidden" : ""}`}>
        <FieldArray name="materials">
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
                      {paginatedMaterials.map((item, index) => (
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
                          <td className="px-3 py-6">
                            <Field name={`materials.${index}.satuan_setempat`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `materials.${index}.satuan_setempat`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Satuan Setempat"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.materials?.[index]
                                      ?.satuan_setempat
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field
                              name={`materials.${index}.satuan_setempat_panjang`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `materials.${index}.satuan_setempat_panjang`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Satuan Setempat Panjang"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.materials?.[index]
                                      ?.satuan_setempat_panjang
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field
                              name={`materials.${index}.satuan_setempat_lebar`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `materials.${index}.satuan_setempat_lebar`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Satuan Setempat Lebar"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.materials?.[index]
                                      ?.satuan_setempat_lebar
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field
                              name={`materials.${index}.satuan_setempat_tinggi`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `materials.${index}.satuan_setempat_tinggi`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Satuan Setempat Tinggi"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.materials?.[index]
                                      ?.satuan_setempat_tinggi
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field
                              name={`materials.${index}.konversi_satuan_setempat`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `materials.${index}.konversi_satuan_setempat`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Konversi Satuan Setempat"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.materials?.[index]
                                      ?.konversi_satuan_setempat
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field
                              name={`materials.${index}.harga_satuan_setempat`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `materials.${index}.harga_satuan_setempat`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Harga Satuan Setempat"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.materials?.[index]
                                      ?.harga_satuan_setempat
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field
                              name={`materials.${index}.harga_konversi_satuan_setempat`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `materials.${index}.harga_konversi_satuan_setempat`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Harga Konversi Satuan Setempat"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.materials?.[index]
                                      ?.harga_konversi_satuan_setempat
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field name={`materials.${index}.harga_khusus`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `materials.${index}.harga_khusus`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Harga Khusus"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.materials?.[index]
                                      ?.harga_khusus
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field name={`materials.${index}.keterangan`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `materials.${index}.keterangan`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Keterangan"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.materials?.[index]?.keterangan
                                  }
                                />
                              )}
                            </Field>
                          </td>
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

    const paginatedPeralatans =
      peralatans?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ) || [];

    return (
      <div className={`${hide ? "hidden" : ""}`}>
        <FieldArray name="peralatans">
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
                      {paginatedPeralatans.map((item, index) => (
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
                          <td className="px-3 py-6">
                            <Field name={`peralatans.${index}.satuan_setempat`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `peralatans.${index}.satuan_setempat`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Satuan Setempat"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.peralatans?.[index]
                                      ?.satuan_setempat
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field
                              name={`peralatans.${index}.harga_sewa_satuan_setempat`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `peralatans.${index}.harga_sewa_satuan_setempat`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Harga Sewa Satuan Setempat"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.peralatans?.[index]
                                      ?.harga_sewa_satuan_setempat
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field
                              name={`peralatans.${index}.harga_sewa_konversi`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `peralatans.${index}.harga_sewa_konversi`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Harga Sewa Konversi"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.peralatans?.[index]
                                      ?.harga_sewa_konversi
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field name={`peralatans.${index}.harga_pokok`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `peralatans.${index}.harga_pokok`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Harga Pokok"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.peralatans?.[index]
                                      ?.harga_pokok
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field name={`peralatans.${index}.keterangan`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `peralatans.${index}.keterangan`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Keterangan"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.peralatans?.[index]?.keterangan
                                  }
                                />
                              )}
                            </Field>
                          </td>
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

    const paginatedTenaga_Kerjas =
      tenaga_Kerjas?.slice(
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
                      {paginatedTenaga_Kerjas.map((item, index) => (
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
                            <Field
                              name={`tenaga_Kerjas.${index}.harga_per_satuan_setempat`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `tenaga_Kerjas.${index}.harga_per_satuan_setempat`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Harga per Satuan Setempat"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.tenaga_Kerjas?.[index]
                                      ?.satuan_setempat
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field
                              name={`tenagarkerjas.${index}.harga_konversi_perjam`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `tenagarkerjas.${index}.harga_konversi_perjam`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Harga Konversi per Jam"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.tenagarkerjas?.[index]
                                      ?.harga_konversi_perjam
                                  }
                                />
                              )}
                            </Field>
                          </td>
                          <td className="px-3 py-6">
                            <Field name={`tenaga_Kerjas.${index}.keterangan`}>
                              {({ field, form }) => (
                                <TextInput
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setFieldValue(
                                      `tenaga_Kerjas.${index}.keterangan`,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Keterangan"
                                  className="input-field"
                                  isRequired={true}
                                  errorMessage={
                                    form.errors?.tenaga_Kerjas?.[index]
                                      ?.keterangan
                                  }
                                />
                              )}
                            </Field>
                          </td>
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
      <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
        Blok II: Keterangan Petugas Lapangan
      </h4>
      <Formik
        initialValues={{
          petugasLapangan: [""],
          skPenugasanPengawas: null,
        }}
        onSubmit={(handleSubmit) => {
          console.log("Data petugas lapangan:", values.petugasLapangan);
          console.log("Data skPenugasanPengawas:", values.skPenugasanPengawas);
          usePenugasanTimStore
            .getState()
            .savePengawasData(
              values.petugasLapangan,
              values.skPenugasanPengawas
            );
        }}>
        {({ values, submitForm, setFieldValue }) => (
          <Form className="h-full flex flex-col">
            <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
              <FieldArray
                name="petugasLapangan"
                render={(arrayHelpers) => (
                  <div className="space-y-4">
                    {values.petugasLapangan.map((_, index) => (
                      <div key={index} className="items-center space-y-8">
                        <Field
                          as={Dropdown}
                          name={`petugasLapangan.${index}`}
                          label={`Nama Petugas Lapangan`}
                          labelPosition="left"
                          placeholder="Masukkan Petugas Lapangan"
                          isRequired={true}
                          options={userOptions}
                          onSelect={(selectedOption) =>
                            setFieldValue(
                              `petugasLapangan.${index}`,
                              selectedOption.value
                            )
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
                          // labelWidth="100px"
                          errorMessage="NIP tidak boleh kosong"
                          value={values.nama_tim}
                          onChange={(e) =>
                            setFieldValue("nama_tim", e.target.value)
                          }
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
                            value={date}
                            onChange={handleDateChange}
                            error={error}
                            helperText={helperText}
                          />
                        </div>
                        <Field
                          as={Dropdown}
                          name={`petugasLapangan.${index}`}
                          label={`Nama Pengawas`}
                          labelPosition="left"
                          placeholder="Masukkan Pengawas"
                          isRequired={true}
                          options={userOptions}
                          onSelect={(selectedOption) =>
                            setFieldValue(
                              `petugasLapangan.${index}`,
                              selectedOption.value
                            )
                          }
                          size="Medium"
                          errorMessage="Nama Pengawas tidak boleh kosong"
                        />
                        <TextInput
                          label="NIP Pengawas"
                          labelPosition="left"
                          placeholder="Masukkan NIP Pengawas"
                          isRequired={true}
                          size="Medium"
                          labelWidth="100px"
                          errorMessage="NIP tidak boleh kosong"
                          value={values.nama_tim}
                          onChange={(e) =>
                            setFieldValue("nama_tim", e.target.value)
                          }
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
                            value={date}
                            onChange={handleDateChange}
                            error={error}
                            helperText={helperText}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          </Form>
        )}
      </Formik>
      <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
        Blok III: Keterangan Pemberi Informasi
      </h4>
      <Formik
        initialValues={{
          petugasLapangan: "",
          tanggalSurvei: null,
        }}
        onSubmit={(handleSubmit) => {
          // Handle form submission
          console.log(values);
        }}>
        {({ values, setFieldValue, handleSubmit }) => (
          <Form className="h-full flex flex-col">
            <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
              {/* Dropdown for Nama Pemberi Informasi */}
              {/* ini kl bisa style manual harusnya soalnya aku gak nemu ini styling nya di mana*/}
              {/* <Field
                as={Dropdown}
                name="petugasLapangan"
                label="Nama Pemberi Informasi/Jabatan"
                labelPosition="left"
                placeholder="Pilih Nama Pemberi Informasi/Jabatan"
                isRequired={true}
                options={userOptions}
                onSelect={(selectedOption) =>
                  setFieldValue("petugasLapangan", selectedOption.value)
                }
                size="Medium"
                errorMessage="Nama Pemberi Informasi/Jabatan tidak boleh kosong"
              /> */}
              <TextInput
                label="ama Pemberi Informasi/Jabatan"
                labelPosition="left"
                placeholder="Masukkan Nama Pemberi Informasi/Jabatan"
                isRequired={true}
                size="Medium"
                errorMessage="Nama Pemberi Informasi/Jabatan tidak boleh kosong"
                value={values.nip_pengawas || ""}
                onChange={(e) => setFieldValue("nip_pengawas", e.target.value)}
              />
              {/* Datepicker for Tanggal Survei */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "352px",
                }}>
                <div className="text-B2">Tanggal Survei</div>
                <Datepicker
                  label="Tanggal Survei"
                  value={date}
                  onChange={handleDateChange}
                  error={error}
                  helperText={helperText}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
        Blok IV: Keterangan Pemberi Informasi
      </h4>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <PetugasLapanganForm
              values={values}
              setFieldValue={setFieldValue}
            />
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
            <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
              <Button variant="solid_yellow" size="Medium">
                Simpan Sebagai Draft
              </Button>

              <Button variant="solid_blue" size="Medium" type="submit">
                Simpan
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
        <Button
          variant="solid_yellow"
          size="Medium"
          // onClick={navigateToTahap1}
        >
          Simpan Sebagai Draft
        </Button>

        <Button
          variant="solid_blue"
          size="Medium"
          onClick={() => handleSubmit(values)}>
          Simpan
        </Button>
      </div>
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
