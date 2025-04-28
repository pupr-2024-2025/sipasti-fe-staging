export interface OptionType {
    label: string;
    value: string;
  }
  
  export interface InputVendorFormProps {
    nama_vendor: string;
    setnama_vendor: (val: string) => void;
    selectedTypes: string[];
    handleCheckboxChange: (type: string) => void;
    kategori_vendor_id: string;
    setkategori_vendor_id: (val: string) => void;
    getOptions: () => OptionType[];
    sumber_daya: string;
    setsumber_daya: (val: string) => void;
    alamat: string;
    setalamat: (val: string) => void;
    no_telepon: string;
    setno_telepon: (val: string) => void;
    no_hp: string;
    setno_hp: (val: string) => void;
    nama_pic: string;
    setnama_pic: (val: string) => void;
    provinsiOptions: OptionType[];
    handleProvinsiChange: (selected: OptionType) => void;
    provinsi_id: string;
    kotaOptions: OptionType[];
    handleKotaChange: (selected: OptionType) => void;
    kota_id: string;
  }
  