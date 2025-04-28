import React from "react";
import TextInput from "@/components/ui/textinput";
import Dropdown, { OptionType } from "@/components/ui/dropdown";
import Checkbox from "../checkbox";
import { InputVendorFormProps } from "@/types/inputvendor";

const InputVendorForm: React.FC<InputVendorFormProps> = ({
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
}) => {
  const kategoriOptions = getOptions() ?? [];

  const selectedKategori: OptionType | null =
    kategoriOptions.find((option) => option.value === kategori_vendor_id) ||
    null;

  const selectedProvinsi: OptionType | null =
    provinsiOptions.find((option) => option.value === provinsi_id) || null;

  const selectedKota: OptionType | null =
    kotaOptions.find((option) => option.value === kota_id) || null;

  return (
    <div className="flex-grow grid grid-cols-1 gap-4 py-8 px-6 rounded-[16px] bg-custom-neutral-100">
      <TextInput
        label="Nama Vendor/Perusahaan"
        placeholder="Masukkan nama vendor/perusahaan"
        variant="border"
        isRequired={true}
        errorMessage="Vendor/Perusahaan tidak boleh kosong."
        value={nama_vendor}
        onChange={(e) => setnama_vendor(e.target.value)}
      />

      <div className="space-b-1">
        <p className="text-B2">Jenis Responden/ Vendor</p>
        <div className="flex space-x-8">
          <Checkbox
            label="Material"
            checked={selectedTypes.includes("1")}
            onChange={() => handleCheckboxChange("1")}
          />
          <Checkbox
            label="Peralatan"
            checked={selectedTypes.includes("2")}
            onChange={() => handleCheckboxChange("2")}
          />
          <Checkbox
            label="Tenaga Kerja"
            checked={selectedTypes.includes("3")}
            onChange={() => handleCheckboxChange("3")}
          />
        </div>
      </div>

      <Dropdown
        options={kategoriOptions}
        label="Kategori Vendor/Perusahaan"
        placeholder="Pilih kategori vendor/perusahaan"
        errorMessage="Kategori tidak boleh kosong."
        value={selectedKategori}
        onSelect={(selectedOption) =>
          setkategori_vendor_id(selectedOption ? selectedOption.value : "")
        }
        isRequired={true}
      />

      <TextInput
        label="Sumber daya yang dimiliki"
        placeholder="Masukkan sumber daya"
        type="text"
        variant="border"
        isRequired={true}
        errorMessage="Sumber daya tidak boleh kosong."
        value={sumber_daya}
        onChange={(e) => setsumber_daya(e.target.value)}
      />

      <TextInput
        label="Alamat vendor atau perusahaan"
        placeholder="Masukkan alamat"
        type="text"
        variant="border"
        isRequired={true}
        errorMessage="Alamat tidak boleh kosong."
        value={alamat}
        onChange={(e) => setalamat(e.target.value)}
      />

      <div className="flex gap-8">
        <TextInput
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon"
          type="text"
          variant="border"
          isRequired={true}
          errorMessage="Nomor telepon tidak boleh kosong."
          value={no_telepon}
          onChange={(e) => setno_telepon(e.target.value)}
          className="flex-1"
        />
        <TextInput
          label="Nomor HP"
          placeholder="Masukkan nomor HP"
          type="text"
          variant="border"
          isRequired={true}
          errorMessage="Nomor HP tidak boleh kosong."
          value={no_hp}
          onChange={(e) => setno_hp(e.target.value)}
          className="flex-1"
        />
      </div>

      <TextInput
        label="Nama PIC"
        placeholder="Masukkan nama PIC"
        type="text"
        variant="border"
        isRequired={true}
        errorMessage="Nama PIC tidak boleh kosong."
        value={nama_pic}
        onChange={(e) => setnama_pic(e.target.value)}
      />

      <div className="flex gap-8">
        <Dropdown
          options={provinsiOptions}
          label="Pilih Provinsi"
          placeholder="Pilih Provinsi"
          onSelect={(option) => {
            if (option) handleProvinsiChange(option);
          }}
          value={selectedProvinsi}
          isRequired
          errorMessage="Provinsi harus dipilih"
        />

        <Dropdown
          options={kotaOptions}
          label="Pilih Kota"
          placeholder="Pilih Kota"
          onSelect={(option) => {
            if (option) handleKotaChange(option);
          }}
          value={selectedKota}
          isRequired
          errorMessage="Kota harus dipilih"
        />
      </div>
    </div>
  );
};

export default InputVendorForm;
