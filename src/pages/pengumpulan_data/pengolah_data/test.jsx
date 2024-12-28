import { useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { useStore } from "zustand";
import Navbar from "../../../components/navigationbar";
import CustomAlert from "../../../components/alert";
import TextInput from "../../../components/input";
import entri_dataStore from "./test/test";
// import informasi_tahap_pengumpulanStore from "../informasi_tahap_pengumpulan/informasi_tahap_pengumpulan";
import SearchBox from "../../../components/searchbox";
import Button from "../../../components/button";
// import Dropdown from "../../../../components/dropdown";
// import RadioButton from "../../../../components/radiobutton";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import axios from "axios";

import "dayjs/locale/id";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

dayjs.locale("id");

export default function EntriData() {
  const [radioState, setRadioState] = useState({});
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

  const handleSubmit = async () => {
    // Persiapkan data sesuai format yang diminta
    const payload = Object.keys(radioState).map((id_pemeriksaan) => ({
      id_pemeriksaan,
      status_pemeriksaan: radioState[id_pemeriksaan]?.memenuhi
        ? "memenuhi"
        : "tidak_memenuhi",
      verified_by: "pengawas",
    }));

    console.log("Data yang akan dikirim:", payload);

    try {
      // Kirim data ke API (sesuaikan URL jika diperlukan)
      const response = await axios.post(
        "https://api-ecatalogue-staging.online/api/pengumpulan-data/verifikasi-pengawas",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response dari API:", response.data);

      if (response.status === 200) {
        setAlertInfo({
          open: true,
          severity: "success",
          message: "Data berhasil disimpan!",
        });
      }
    } catch (error) {
      console.error("Error saat menyimpan data:", error);
      setAlertInfo({
        open: true,
        severity: "error",
        message:
          error.response?.data?.message ??
          "Gagal menyimpan data. Silakan coba lagi.",
      });
    }
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

  const VerifikasiDokumenForm = ({ hide }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const staticData = [
      {
        id_pemeriksaan: "A",
        no: "A",
        kelengkapan: "KRITERIA VERIFIKASI",
        isTitle: true,
      },
      {
        id_pemeriksaan: "A1",
        no: 1,
        kelengkapan: "Memeriksa kelengkapan data dan ada tidaknya bukti dukung",
      },
      {
        id_pemeriksaan: "A2",
        no: 2,
        kelengkapan:
          "Jenis material, peralatan, tenaga kerja yang dilakukan pengumpulan data berdasarkan identifikasi kebutuhan.",
      },
      { id_pemeriksaan: "A3", no: 3, kelengkapan: "Sumber harga pasar." },
      {
        id_pemeriksaan: "A4",
        no: 4,
        kelengkapan:
          "Harga survei didapat minimal 3 vendor untuk setiap jenis material peralatan atau sesuai dengan kondisi di lapangan.",
      },
      {
        id_pemeriksaan: "A5",
        no: 5,
        kelengkapan: "Khusus peralatan mencantumkan harga beli dan harga sewa.",
      },
      {
        id_pemeriksaan: "B",
        no: "B",
        kelengkapan: "KRITERIA VALIDASI",
        isTitle: true,
      },
      {
        id_pemeriksaan: "B1",
        no: 1,
        kelengkapan:
          "Kuesioner terisi lengkap dan sesuai dengan petunjuk cara pengisian kuesioner (lampiran iv) dan sudah ditandatangani Responden, Petugas Lapangan, dan Pengawas.",
      },
      {
        id_pemeriksaan: "B2",
        no: 2,
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

    const handleRadioChange = (id_pemeriksaan, type) => {
      console.log(
        `Radio button changed: id_pemeriksaan=${id_pemeriksaan}, type=${type}`
      );
      setRadioState((prevState) => ({
        ...prevState,
        [id_pemeriksaan]: {
          memenuhi: type === "memenuhi",
          tidak_memenuhi: type === "tidak_memenuhi",
        },
      }));
    };

    console.log("radio state", radioState);

    const paginatedData =
      staticData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ) || [];

    return (
      <div className={`${hide ? "hidden" : ""}`}>
        <FieldArray name="VerifikasiDokumenForm">
          {({ push, remove }) => (
            <div>
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
                          key={`${item.id_pemeriksaan}-${index}`}
                          className={`${
                            index % 2 === 0
                              ? "bg-custom-neutral-0"
                              : "bg-custom-neutral-100"
                          }`}>
                          <td className="px-3 py-6 text-sm text-center">
                            {item.no}
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
                                    name={`radio-${item.id_pemeriksaan}`}
                                    checked={
                                      radioState[item.id_pemeriksaan]?.memenuhi
                                    }
                                    value="memenuhi"
                                    onChange={() =>
                                      handleRadioChange(
                                        item.id_pemeriksaan,
                                        "memenuhi"
                                      )
                                    }
                                  />
                                </div>
                              </td>
                              <td className="px-3 py-6 text-sm text-center">
                                <div className="mt-2">
                                  <input
                                    type="radio"
                                    name={`radio-${item.id_pemeriksaan}`}
                                    checked={
                                      radioState[item.id_pemeriksaan]
                                        ?.tidak_memenuhi
                                    }
                                    value="tidak_memenuhi"
                                    onChange={() =>
                                      handleRadioChange(
                                        item.id_pemeriksaan,
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

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
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
