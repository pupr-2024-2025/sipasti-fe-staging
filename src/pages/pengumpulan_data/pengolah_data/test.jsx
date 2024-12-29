import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import Navbar from "../../../components/navigationbar";
import Button from "../../../components/button";
import { useStore } from "./test/test";
import { submitData } from "../../../services/api";
import FileInput from "../../../components/FileInput";

function App() {
  const { data, setData, updateStatus } = useStore();
  const [beritaacara, setBeritaAcara] = useState(null);
  const [selectedberitaacara, setselectedBeritaAcara] = useState(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleCancelBeritaAcara = () => {
    console.log("Cancelling file upload...");

    setBeritaAcara(null);
    setselectedBeritaAcara(null);

    setProgress(0);
    setBeritaAcaraState("default");

    setError("");
  };

  const [beritaacarastate, setBeritaAcaraState] = useState("default");

  const handleChange = (id_pemeriksaan, status) => {
    updateStatus(id_pemeriksaan, status);
  };

  const isSubmitDisabled = data.some(
    (item) => item.status_pemeriksaan === null
  );

  const handleSubmit = async (values) => {
    try {
      const cleanedData = data.map(
        ({ nomor, kelengkapan_dokumen, ...rest }) => rest
      );

      console.log("Selected Berita Acara:", selectedberitaacara);
      // if (selectedberitaacara) {
      //   formData.append("beritaacara", selectedberitaacara);
      // } else {
      //   console.log("Berita Acara tidak ada");
      // }

      const formData = new FormData();

      // Menambahkan data non-file
      cleanedData.forEach((item) => {
        formData.append("data[]", JSON.stringify(item)); // Menambahkan data lain dalam array
      });

      // Menambahkan file berita acara
      if (selectedberitaacara) {
        formData.append("beritaacara", selectedberitaacara);
      }

      // Mengonversi FormData ke objek biasa untuk JSON
      let jsonPayload = {};
      formData.forEach((value, key) => {
        if (key in jsonPayload) {
          // Jika key sudah ada, buat array untuk menampung beberapa nilai
          jsonPayload[key] = [].concat(jsonPayload[key], value);
        } else {
          jsonPayload[key] = value;
        }
      });

      // Menampilkan payload dalam format JSON
      console.log(
        "Payload yang akan dikirimkan:",
        JSON.stringify(jsonPayload, null, 2)
      );

      // Mengirimkan formData ke API
      const response = await submitData(formData);
      console.log("Data berhasil dikirim", response);
    } catch (error) {
      console.error("Gagal mengirim data", error);
    }
  };

  const handleBeritaAcara = (files) => {
    if (files.length === 0) {
      setError("File wajib dipilih.");
      return;
    }

    const file = files[0];
    setselectedBeritaAcara(file);
    setBeritaAcaraState("processing");
    setError("");
    try {
      setselectedBeritaAcara(file);
      setBeritaAcaraState("done");
    } catch (error) {
      console.error("Error processing logo file:", error);
      setBeritaAcaraState("default");
    }
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBeritaAcaraState("done");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="p-8">
      <Navbar />
      <Formik
        initialValues={{}}
        onSubmit={(values) => console.log("Form data:", values)}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="rounded-[16px] border border-gray-200 overflow-hidden mt-4">
              <div className="overflow-x-auto">
                <table className="table-fixed w-full">
                  <thead>
                    <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                      <th className="px-3 py-6 text-sm text-center w-[40px]">
                        No
                      </th>
                      <th className="px-3 py-6 text-sm w-[180px]">
                        Kelengkapan Dokumen
                      </th>
                      <th className="px-3 py-6 text-sm text-center w-[150px] hidden">
                        ID Pemeriksaan
                      </th>
                      <th className="px-3 py-6 text-sm text-center w-[200px] hidden">
                        Status Pemeriksaan
                      </th>
                      <th className="px-3 py-6 text-sm text-center w-[200px] hidden">
                        Verified By
                      </th>
                      <th className="px-3 py-6 text-sm text-center w-[140px]">
                        Memenuhi
                      </th>
                      <th className="px-3 py-6 text-sm text-center w-[140px]">
                        Tidak Memenuhi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr
                        key={item.id_pemeriksaan}
                        className={`${
                          index % 2 === 0
                            ? "bg-custom-neutral-0"
                            : "bg-custom-neutral-100"
                        }`}
                      >
                        <td className="px-3 py-4 text-sm text-center">
                          {item.nomor}
                        </td>
                        <td className="px-3 py-4 text-sm">
                          {item.kelengkapan_dokumen}
                        </td>
                        <td className="px-3 py-4 text-sm text-center hidden">
                          {item.id_pemeriksaan}
                        </td>
                        <td className="px-3 py-4 text-sm hidden">
                          {item.status_pemeriksaan || "Belum Dipilih"}
                        </td>
                        <td className="px-3 py-4 text-sm hidden">
                          {item.verified_by}
                        </td>

                        {item.id_pemeriksaan && (
                          <>
                            <td className="px-3 py-4 text-sm text-center">
                              <input
                                type="radio"
                                id={`status-${item.id_pemeriksaan}-memenuhi`}
                                name={`status-${item.id_pemeriksaan}`}
                                value="memenuhi"
                                checked={item.status_pemeriksaan === "memenuhi"}
                                onChange={() =>
                                  handleChange(item.id_pemeriksaan, "memenuhi")
                                }
                                className="mr-2"
                              />
                            </td>
                            <td className="px-3 py-4 text-sm text-center">
                              <input
                                type="radio"
                                id={`status-${item.id_pemeriksaan}-tidak_memenuhi`}
                                name={`status-${item.id_pemeriksaan}`}
                                value="tidak_memenuhi"
                                checked={
                                  item.status_pemeriksaan === "tidak_memenuhi"
                                }
                                onChange={() =>
                                  handleChange(
                                    item.id_pemeriksaan,
                                    "tidak_memenuhi"
                                  )
                                }
                                className="mr-2"
                              />
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <FileInput
              onFileSelect={(files) => {
                handleBeritaAcara(files);
                setFieldValue("beritaacara", files[0]);
              }}
              setSelectedFile={setBeritaAcara}
              buttonText="Pilih Berkas"
              multiple={false}
              accept=".pdf"
              Label="Unggah Berita Acara"
              HelxperText="Format .PDF dan maksimal 2MB"
              state={beritaacarastate}
              onCancel={() => {
                handleCancelBeritaAcara();
                setFieldValue("beritaacara", null);
              }}
              selectedFile={selectedberitaacara}
              maxSizeMB={2}
            />
            <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
              <Button
                variant="solid_blue"
                size="Medium"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
              >
                Simpan
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
