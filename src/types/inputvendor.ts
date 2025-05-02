export interface DropdownOption  {
    label: string;
    value: string;
    jenis_vendor_id: string;
    setjenis_vendor_id: (value: string) => void;
  }
  
  export interface InputVendorFormProps {
    jenis_vendor_id: string;
    setjenis_vendor_id: (val: string) => void;
    nama_vendor: string;
    setnama_vendor: (val: string) => void;
    selectedTypes: string[];
    handleCheckboxChange: (type: string) => void;
    kategori_vendor_id: string;
    setkategori_vendor_id: (val: string) => void;
    getOptions: () => DropdownOption [];
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
    provinsiOptions: DropdownOption [];
    handleProvinsiChange: (selected: DropdownOption ) => void;
    provinsi_id: string;
    kotaOptions: DropdownOption [];
    handleKotaChange: (selected: DropdownOption ) => void;
    kota_id: string;
  }
  