export interface RegisterFormState {
    email: string;
    nama_lengkap: string;
    nik: string;
    nrp: string;
    balai_kerja_id: string;
    satuan_kerja_id: string;
    no_handphone: string;
    surat_penugasan_url: File | null;
  }

  export type RegisterErrorMessages = Partial<Record<keyof RegisterFormState, string>>;

  
  export interface OptionType {
    value: string;
    label: string;
  }
  