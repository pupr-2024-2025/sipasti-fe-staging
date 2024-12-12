import { useEffect, useState } from "react";
import { FieldArray } from "formik";
import Navbar from "../../../components/navigationbar";
import TextInput from "../../../components/input";
import entri_dataStore from "./entri_data/entri_data";
import informasi_tahap_pengumpulanStore from "../pengawas/informasi_tahap_pengumpulan/informasi_tahap_pengumpulan";
import Datepicker from "../../../components/datepicker";
import SearchBox from "../../../components/searchbox";
import Button from "../../../components/button";

export default function EntriData() {
  const { dataEntri, fetchData } = entri_dataStore();
  const [date, setDate] = useState(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const { setSelectedValue } = entri_dataStore();

  const handleDateChange = (newDate) => {
    if (!newDate) {
      setError(true);
      setHelperText("Tanggal harus diisi");
    } else {
      setError(false);
      setHelperText("");
    }
    setDate(newDate);
  };

  useEffect(() => {
    fetchData(50);
  }, [fetchData]);

  const MaterialForm = ({
    values,
    setFieldValue,
    hide,
    provincesOptions,
    kelompokMaterialOptions,
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const paginatedMaterials = values.materials.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

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
                          Jenis Bahan
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Kualitas Bahan/Spesifikasi
                        </th>
                        <th className="px-3 py-6 text-sm w-[200px]">Satuan</th>
                        <th className="px-3 py-6 text-sm w-[200px]">Merk</th>
                        <th className="px-3 py-6 text-sm w-[140px]">
                          Satuan Setempat
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Panjang (m)
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Lebar (m)
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Tinggi (m)
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Konversi Satuan Setempat ke Satuan Standar
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Harga per satuan Setempat (Rp)
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Harga Konversi Satuan Setempat ke Satuan Standar (Rp)
                        </th>
                        <th className="px-3 py-6 text-sm w-[280px]">
                          Harga Khusus (Rp)
                        </th>
                        <th className="px-3 py-6 text-sm w-[200px]">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedMaterials.map((_, index) => {
                        const actualIndex =
                          (currentPage - 1) * itemsPerPage + index;
                        return (
                          <tr key={actualIndex} className="border-b">
                            <td className="px-3 py-6 text-center">
                              {actualIndex + 1}
                            </td>
                            <td className="px-3 py-6">
                              <Field
                                name={`materials.${actualIndex}.jenis_bahan`}>
                                {({ field, form }) => (
                                  <TextInput
                                    value={field.value}
                                    onChange={(e) =>
                                      form.setFieldValue(
                                        `materials.${actualIndex}.jenis_bahan`,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Jenis Bahan"
                                  />
                                )}
                              </Field>
                            </td>
                            {/* Repeat fields for other table columns */}
                            <td className="px-3 py-6 text-center">
                              <Button
                                variant="solid_red"
                                size="Small"
                                onClick={() => remove(actualIndex)}>
                                Hapus
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
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
          label="Alamat Responden/Vendor/ Geo-tagging"
          labelPosition="left"
          placeholder="Masukkan Alamat"
          size="Medium"
          labelWidth="100px"
          disabledActive={true}
          value={dataEntri?.alamat || ""}
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
      <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
        <TextInput
          label="Nama Petugas Lapangan"
          labelPosition="left"
          placeholder="Masukkan Nama Petugas Lapangan"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Nama petugas lapangan tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
        <TextInput
          label="NIP Petugas Lapangan"
          labelPosition="left"
          placeholder="Masukkan NIP Lapangan"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Nama tim tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
        {/* <TextInput
          label="Tanggal Survei"
          labelPosition="left"
          placeholder="Masukkan Tanggal Survei"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Tanggal survei tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        /> */}
        <div style={{ display: "flex", alignItems: "center", gap: "132px" }}>
          <div className="text-B2">Tanggal Survei</div>
          <Datepicker
            label="Tanggal Survei"
            value={date}
            onChange={handleDateChange}
            error={error}
            helperText={helperText}
          />
        </div>
        <TextInput
          label="Nama Pengawas"
          labelPosition="left"
          placeholder="Masukkan Nama Pengawas"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Nama pengawas tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
        <TextInput
          label="NIP Pengawas"
          labelPosition="left"
          placeholder="Masukkan NIP"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="NIP tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "80px" }}>
          <div className="text-B2">Tanggal Pengawasan</div>
          <Datepicker
            label="Tanggal Pengawasan"
            value={date}
            onChange={handleDateChange}
            error={error}
            helperText={helperText}
          />
        </div>
        {/* <TextInput
          label="Tanggal Pengawasan"
          labelPosition="left"
          placeholder="Masukkan Tanggal Pengawasan"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Tanggal pengawasan tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        /> */}
      </div>
      <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
        Blok III: Keterangan Pemberi Informasi
      </h4>
      <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
        <TextInput
          label="Nama Pemberi Informasi/Jabatan"
          labelPosition="left"
          placeholder="Masukkan Nama Pemberi Informasi/Jabatan"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Nama pemberi/informasi tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        />
        {/* <TextInput
          label="Tanggal Survei"
          labelPosition="left"
          placeholder="Masukkan Tanggal Survei"
          size="Medium"
          labelWidth="100px"
          isRequired={true}
          errorMessage="Tanggal survei tidak boleh kosong"
          // value={values.nama_tim}
          // onChange={(e) => setFieldValue("nama_tim", e.target.value)}
        /> */}
        <div style={{ display: "flex", alignItems: "center", gap: "132px" }}>
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
      <h4 className="text-H4 text-emphasis-on_surface-high mt-4">
        Blok IV: Keterangan Pemberi Informasi
      </h4>
      <MaterialForm
        values={{ materials: [] }} // Ganti dengan state/props sesuai kebutuhan
        setFieldValue={() => {}} // Ganti dengan handler `setFieldValue` dari Formik atau lainnya
        hide={false}
        provincesOptions={[]} // Isi dengan data options yang sesuai
        kelompokMaterialOptions={[]} // Isi dengan data options yang sesuai
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
