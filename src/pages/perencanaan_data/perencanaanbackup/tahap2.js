import React, { useState, useEffect } from "react";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import Tabs from "../../components/Tabs";
import Button from "../../components/button";
import { Trash } from "iconsax-react";
import SearchBox from "../../components/searchbox";

const Tahap2 = ({ onNext, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsToAdd, setRowsToAdd] = useState(0);
  const [provincies_idOptions, setprovincies_idOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  // const [selectedprovincies_id, setSelectedprovincies_id] = useState("");
  const [dataMaterial, setDataMaterial] = useState([
    {
      id: "",
      namaMaterial: "",
      satuan: "",
      spesifikasi: "",
      ukuran: "",
      kodefikasi: "",
      jumlahKebutuhan: "",
      merk: "",
      provincies_id: "",
      cities_id: "",
      kelompokMaterial: "",
    },
  ]);
  const validateInput = (rowId, accessor, value) => {
    const error = value
      ? ""
      : columns.find((col) => col.accessor === accessor)?.errorMessage;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [rowId]: {
        ...prevErrors[rowId],
        [accessor]: error,
      },
    }));
  };
  useEffect(() => {
    const fetchProvincesAndCities = async () => {
      try {
        const response = await fetch(
          "https://api-ecatalogue-staging.online/api/provinces-and-cities"
        );
        const result = await response.json();
        if (result.status === "success" && Array.isArray(result.data)) {
          const provinces = result.data.map((province) => ({
            label: province.province_name,
            value: province.id_province,
            cities: province.cities.map((city) => ({
              label: city.cities_name,
              value: city.cities_id,
            })),
          }));
          setprovincies_idOptions(provinces); // Set the province options
        } else {
          console.error("Unexpected data format:", result);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvincesAndCities();
  }, []);
  console.log(provincies_idOptions);
  console.log(cityOptions);
  // Handle province change to update city options
  const handleProvinceChange = (selectedprovincies_idId) => {
    console.log("Selected Province ID:", selectedprovincies_idId); // Debugging the province ID

    // Find the selected province in the list of province options
    const selectedprovincies_id = provincies_idOptions.find(
      (option) => option.value === selectedprovincies_idId.value
    );
    console.log("Selected Province ID:", selectedprovincies_id);

    if (selectedprovincies_id) {
      console.log("Selected Province Object:", selectedprovincies_id); // Debugging the selected province object
      setCityOptions(selectedprovincies_id.cities); // Update city options based on selected province
    } else {
      console.error("Province not found!");
    }
  };

  // console.log(provincies_idOptions[0]);

  const [dataPeralatan, setDataPeralatan] = useState([
    {
      id: "",
      namaPeralatan: "",
      satuan: "",
      tipe: "",
      merk: "",
      kapasitas: "",
      jumlahKebutuhan: "",
      provincies_id: "",
      cities_id: "",
    },
    // Tambahkan data lainnya sesuai kebutuhan
  ]);

  const [dataTenagaKerja, setDataTenagaKerja] = useState([
    {
      id: "1",
      namaPekerja: "",
      kategori: "",
      upah: "",
      jumlahKebutuhan: "",
      provincies_id: "",
      cities_id: "",
    },
  ]);

  const handleAddRowMaterial = () => {
    const newRows = Array.from({ length: rowsToAdd }, (_, index) => ({
      id: dataMaterial.length + index + 1,
      namaMaterial: "",
      satuan: "",
      spesifikasi: "",
      ukuran: "",
      kodefikasi: "",
      jumlahKebutuhan: "",
      merk: "",
      provincies_id: "",
      cities_id: "",
      kelompokMaterial: "",
    }));

    setDataMaterial((prevData) => [...newRows, ...prevData]);
    setFilteredDataMaterial((prevData) => [...newRows, ...prevData]);
    setRowsToAdd(0);
    setIsModalOpen(false);
  };

  const handleAddRowsPeralatan = () => {
    const newRows = Array.from({ length: rowsToAdd }, (_, index) => ({
      id: dataPeralatan.length + index + 1,
      namaPeralatan: "",
      satuan: "",
      tipe: "",
      merk: "",
      kapasitas: "",
      jumlahKebutuhan: "",
      provincies_id: "",
      cities_id: "",
    }));
    console.log(handleAddRowsPeralatan);

    setDataPeralatan((prevData) => [...newRows, ...prevData]);
    setFilteredDataPeralatan((prevData) => [...newRows, ...prevData]);
    setRowsToAdd(0);
    setIsModalOpen(false);
  };

  const handleAddRowsTenagaKerja = () => {
    const newRows = Array.from({ length: rowsToAdd }, (_, index) => ({
      id: dataTenagaKerja.length + index + 1,
      namaPekerja: "",
      kategori: "",
      upah: "",
      jumlahKebutuhan: "",
      provincies_id: "",
      cities_id: "",
    }));
    console.log(handleAddRowsTenagaKerja);
    setDataTenagaKerja((prevData) => [...newRows, ...prevData]);
    setFilteredDataTenagaKerja((prevData) => [...newRows, ...prevData]);
    setRowsToAdd(0);
    setIsModalOpen(false);
  };

  const [filteredDataMaterial, setFilteredDataMaterial] =
    useState(dataMaterial);
  const [filteredDataPeralatan, setFilteredDataPeralatan] =
    useState(dataPeralatan);
  const [filteredDataTenagaKerja, setFilteredDataTenagaKerja] =
    useState(dataTenagaKerja);

  const [stateMaterial, setStateMaterial] = useState(null);
  const [statePeralatan, setStatePeralatan] = useState(null);
  const [stateTenagaKerja, setStateTenagaKerja] = useState(null);

  let result = [];

  // const [filteredDataMaterial, setFilteredDataMaterial] =
  //   useState(dataMaterial);
  // const [filteredDataPeralatan, setFilteredDataPeralatan] =
  //   useState(dataPeralatan);
  // const [filteredDataTenagaKerja, setFilteredDataTenagaKerja] =
  //   useState(dataTenagaKerja);

  const handleSearch = (query) => {
    console.log(`Searching for: ${query}`);

    const lowerCaseQuery = query.toLowerCase();

    // Jika query kosong, reset ke data asli
    if (!query) {
      setFilteredDataMaterial(dataMaterial);
      setFilteredDataPeralatan(dataPeralatan);
      setFilteredDataTenagaKerja(dataTenagaKerja);
      return;
    }

    // Filter data material
    const newFilteredDataMaterial = dataMaterial.filter((item) => {
      return columnsMaterial.some((column) => {
        const value = item[column.accessor];
        // Jika accessor adalah untuk dropdown, periksa apakah nilai ada dalam options
        if (column.type === "dropdown API") {
          return column.options.some((option) =>
            option.label.toLowerCase().includes(lowerCaseQuery)
          );
        }
        return value && value.toString().toLowerCase().includes(lowerCaseQuery);
      });
    });
    setFilteredDataMaterial(newFilteredDataMaterial);

    // Filter data peralatan
    const newFilteredDataPeralatan = dataPeralatan.filter((item) => {
      return columnsPeralatan.some((column) => {
        const value = item[column.accessor];
        // Jika accessor adalah untuk dropdown, periksa apakah nilai ada dalam options
        if (column.type === "dropdown API") {
          return column.options.some((option) =>
            option.label.toLowerCase().includes(lowerCaseQuery)
          );
        }
        return value && value.toString().toLowerCase().includes(lowerCaseQuery);
      });
    });
    setFilteredDataPeralatan(newFilteredDataPeralatan);

    // Filter data tenaga kerja
    const newFilteredDataTenagaKerja = dataTenagaKerja.filter((item) => {
      return columnsTenagaKerja.some((column) => {
        const value = item[column.accessor];
        // Jika accessor adalah untuk dropdown, periksa apakah nilai ada dalam options
        if (column.type === "dropdown API") {
          return column.options.some((option) =>
            option.label.toLowerCase().includes(lowerCaseQuery)
          );
        }
        return value && value.toString().toLowerCase().includes(lowerCaseQuery);
      });
    });
    setFilteredDataTenagaKerja(newFilteredDataTenagaKerja);

    console.log(`Filtered Material Data:`, newFilteredDataMaterial);
    console.log(`Filtered Peralatan Data:`, newFilteredDataPeralatan);
    console.log(`Filtered Tenaga Kerja Data:`, newFilteredDataTenagaKerja);
  };

  const handleDelete = (row, tab) => {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus item ${
        tab === "Material"
          ? row.namaMaterial
          : tab === "Peralatan"
          ? row.namaPeralatan
          : row.namaPekerja
      }?`
    );
    if (confirmed) {
      const newData = (
        tab === "Material"
          ? dataMaterial
          : tab === "Peralatan"
          ? dataPeralatan
          : dataTenagaKerja
      ).filter((item) => item.id !== row.id);
      if (tab === "Material") {
        setDataMaterial(newData);
        setFilteredDataMaterial(newData);
      } else if (tab === "Peralatan") {
        setDataPeralatan(newData);
        setFilteredDataPeralatan(newData);
      } else {
        setDataTenagaKerja(newData);
        setFilteredDataTenagaKerja(newData);
      }
      setCurrentPage(1);
    }
  };

  const columnsMaterial = [
    {
      title: "Nama Material",
      accessor: "nama_material",
      placeholder: "Masukkan Nama Material",
      type: "textInput",
      width: "300px",
      errorMessage: "Email tidak boleh kosong",
      required: true,
    },
    {
      title: "Satuan",
      accessor: "satuan",
      type: "textInput",
      width: "154px",
      placeholder: "Masukkan Satuan",
      tooltipText: "Contoh pengisian: m³, m²",
      required: true,
    },
    {
      title: "Spesifikasi",
      accessor: "spesifikasi",
      type: "textInput",
      placeholder: "Masukkan Spesifikasi",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: Silika, GI Medium - Socket ",
    },
    {
      title: "Ukuran",
      accessor: "ukuran",
      type: "textInput",
      placeholder: "Masukkan Ukuran",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: Silika, GI Medium - Socket ",
    },
    {
      title: "Kodefikasi",
      accessor: "kodefikasi",
      type: "textInput",
      placeholder: "Masukkan Kodefikasi",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: M304, M.114.e  ",
    },
    {
      title: "Kelompok Material",
      accessor: "kelompok_material",
      type: "dropdown",
      options: ["Bahan Baku", "Bahan Olahan", "Bahan Jadi"],
      width: "240px",
      required: true,
    },
    {
      title: "Jumlah Kebutuhan",
      accessor: "jumlah_kebutuhan",
      type: "textInput",
      placeholder: "Masukkan Jumlah",
      width: "260px",
      required: true,
    },
    {
      title: "Merk",
      accessor: "merk",
      type: "textInput",
      placeholder: "Masukkan Merk",
      width: "200px",
      required: true,
    },
    {
      title: "Provinsi",
      accessor: "provincies_id",
      type: "dropdown API",
      options: provincies_idOptions, // Map the province options
      width: "200px",
      required: true,
      onChange: handleProvinceChange, // Update city options when province is selected
    },
    {
      title: "Kabupaten/Kota",
      accessor: "cities_id",
      type: "dropdown API",
      options: cityOptions, // City options depend on selected province
      width: "200px",
      required: true,
      onChange: (value) => {
        setCityOptions([]);
      }, // Menggunakan => untuk fungsi panah
    },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: Trash,
      onClick: (row) => handleDelete(row, "Material"),
      width: "52px",
    },
  ];

  const columnsPeralatan = [
    {
      title: "Nama Peralatan",
      accessor: "nama_peralatan",
      placeholder: "Masukkan Nama Peralatan",
      type: "textInput",
      width: "300px",
      required: true,
    },
    {
      title: "Satuan",
      accessor: "satuan",
      placeholder: "Masukkan Satuan",
      type: "textInput",
      width: "154px",
      required: true,
      tooltipText: "Contoh pengisian: m³, m²",
    },
    {
      title: "Spesifikasi",
      accessor: "spesifikasi",
      type: "textInput",
      placeholder: "Masukkan Spesifikasi",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: 80 HP, 20 HP",
    },
    {
      title: "Kapasitas",
      accessor: "kapasitas",
      type: "textInput",
      placeholder: "Masukkan Kapasitas",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: 0,9 m3, 0.6 m3",
    },
    {
      title: "Kodefikasi",
      accessor: "kodefikasi",
      type: "textInput",
      placeholder: "Masukkan Kodefikasi",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: E10, E06 ",
    },
    {
      title: "Kelompok Peralatan",
      accessor: "kelompok_peralatan",
      type: "dropdown",
      options: ["Mekanis", "Semi Mekanis"],
      placeholder: "Masukkan Kelompok Peralatan",
      width: "240px",
      required: true,
    },
    {
      title: "Jumlah Kebutuhan",
      accessor: "jumlah_kebutuhan",
      type: "textInput",
      placeholder: "Masukkan Jumlah Kebutuhan",
      width: "260px",
      required: true,
    },
    {
      title: "Merk",
      accessor: "merk",
      type: "textInput",
      placeholder: "Masukkan Merk",
      width: "200px",
      required: true,
    },
    {
      title: "Provinsi",
      accessor: "provincies_id",
      type: "dropdown API",
      options: provincies_idOptions, // Map the province options
      width: "200px",
      required: true,
      onChange: handleProvinceChange, // Update city options when province is selected
    },
    {
      title: "Kabupaten/Kota",
      accessor: "cities_id",
      type: "dropdown API",
      options: cityOptions, // City options depend on selected province
      width: "200px",
      required: true,
      onChange: (value) => {
        setCityOptions([]);
      }, // Menggunakan => untuk fungsi panah
    },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: Trash,
      onClick: (row) => handleDelete(row, "Peralatan"),
      width: "52px",
    },
  ];

  const columnsTenagaKerja = [
    {
      title: "Jenis Tenaga Kerja",
      accessor: "jenis_tenaga_kerja",
      type: "textInput",
      placeholder: "Masukkan Tenaga Kerja",
      width: "300px",
      required: true,
    },
    {
      title: "Satuan",
      accessor: "satuan",
      placeholder: "Masukkan Satuan",
      type: "textInput",
      width: "154px",
      required: true,
      tooltipText: "Nama harus diisi sesuai KTP",
    },
    {
      title: "Jumlah Kebutuhan",
      accessor: "jumlah_kebutuhan",
      type: "textInput",
      placeholder: "Masukkan Jumlah Kebutuhan",
      width: "240px",
      required: true,
    },
    {
      title: "Kodefikasi",
      accessor: "kodefikasi",
      type: "textInput",
      placeholder: "Masukkan Kodefikasi",
      width: "240px",
      required: true,
      tooltipText: "Contoh pengisian: L04,L02",
    },
    {
      title: "Provinsi",
      accessor: "provincies_id",
      type: "dropdown API",
      options: provincies_idOptions, // Map the province options
      width: "200px",
      required: true,
      onChange: handleProvinceChange, // Update city options when province is selected
    },
    {
      title: "Kabupaten/Kota",
      accessor: "cities_id",
      type: "dropdown API",
      options: cityOptions, // City options depend on selected province
      width: "200px",
      required: true,
      onChange: (value) => {
        setCityOptions([]);
      }, // Menggunakan => untuk fungsi panah
    },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: Trash,
      onClick: (row) => handleDelete(row, "Tenaga Kerja"),
      width: "52px",
    },
  ];

  const tabs = [
    {
      label: "Material",
      content: (
        <div className="mt-3 space-y-8">
          <div className="flex items-center space-x-3 mt-3">
            <SearchBox
              placeholder="Cari Material..."
              onSearch={handleSearch}
              withFilter={true}
            />
            <Button
              variant="solid_blue"
              size="Medium"
              onClick={() => setIsModalOpen(true)}>
              Tambah Data
            </Button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="bg-white p-6 shadow-md w-96 rounded-[12px]">
                <label className="block mb-2">
                  <p className="text-Medium font-bold text-emphasis-on_surface-high">
                    Tambah Data Material
                  </p>
                  <p className="text-Small text-emphasis-on_surface-medium">
                    Masukkan jumlah baris yang ingin ditambahkan:
                  </p>
                  <input
                    type="number"
                    value={rowsToAdd}
                    onChange={(e) => setRowsToAdd(Number(e.target.value))}
                    min="1"
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outlined_yellow"
                    size="Medium"
                    onClick={() => setIsModalOpen(false)}>
                    Batal{" "}
                  </Button>
                  <Button onClick={handleAddRowMaterial}>Tambah</Button>
                </div>
              </div>
            </div>
          )}

          <Table
            columns={columnsMaterial}
            data={filteredDataMaterial.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            setParentState={setStateMaterial}
          />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalData={dataMaterial.length}
            onPageChange={setCurrentPage}
          />
        </div>
      ),
    },
    {
      label: "Peralatan",
      content: (
        <div className="mt-3 space-y-8">
          <div className="flex items-center space-x-3 mt-3">
            <SearchBox
              placeholder="Cari Peralatan..."
              onSearch={handleSearch}
            />
            <Button
              variant="solid_blue"
              size="Medium"
              onClick={() => setIsModalOpen(true)}>
              Tambah Data
            </Button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="bg-white p-6 shadow-md w-96 rounded-[12px]">
                <label className="block mb-2">
                  <p className="text-Medium font-bold text-emphasis-on_surface-high">
                    Tambah Data Peralatan
                  </p>
                  <p className="text-Small text-emphasis-on_surface-medium">
                    Masukkan jumlah baris yang ingin ditambahkan:
                  </p>
                  <input
                    type="number"
                    value={rowsToAdd}
                    onChange={(e) => setRowsToAdd(Number(e.target.value))}
                    min="1"
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outlined_yellow"
                    size="Medium"
                    onClick={() => setIsModalOpen(false)}>
                    Batal{" "}
                  </Button>
                  <Button onClick={handleAddRowsPeralatan}>Tambah</Button>
                </div>
              </div>
            </div>
          )}
          <Table
            columns={columnsPeralatan}
            data={filteredDataPeralatan.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            setParentState={setStatePeralatan}
          />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalData={dataPeralatan.length}
            onPageChange={setCurrentPage}
          />
        </div>
      ),
    },
    {
      label: "Tenaga Kerja",
      content: (
        <div className="mt-3 space-y-8">
          <div className="flex items-center space-x-3 mt-3">
            <SearchBox
              placeholder="Cari Tenaga Kerja..."
              onSearch={handleSearch}
            />
            <Button
              variant="solid_blue"
              size="Medium"
              onClick={() => setIsModalOpen(true)}>
              Tambah Data
            </Button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className="bg-white p-6 shadow-md w-96 rounded-[12px]">
                <label className="block mb-2">
                  <p className="text-Medium font-bold text-emphasis-on_surface-high">
                    Tambah Data Tenaga Kerja
                  </p>
                  <p className="text-Small text-emphasis-on_surface-medium">
                    Masukkan jumlah baris yang ingin ditambahkan:
                  </p>
                  <input
                    type="number"
                    value={rowsToAdd}
                    onChange={(e) => setRowsToAdd(Number(e.target.value))}
                    min="1"
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outlined_yellow"
                    size="Medium"
                    onClick={() => setIsModalOpen(false)}>
                    Batal{" "}
                  </Button>
                  <Button onClick={handleAddRowsTenagaKerja}>Tambah</Button>
                </div>
              </div>
            </div>
          )}
          <Table
            columns={columnsTenagaKerja}
            data={filteredDataTenagaKerja.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            setParentState={setStateTenagaKerja}
          />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalData={dataTenagaKerja.length}
            onPageChange={setCurrentPage}
          />
        </div>
      ),
    },
  ];

  const handleSubmitSecondStep = async () => {
    try {
      const informasi_umum_id = localStorage.getItem("informasi_umum_id");
      const requestData = {
        informasi_umum_id: informasi_umum_id,
        material: stateMaterial,
        peralatan: statePeralatan,
        tenaga_kerja: stateTenagaKerja,
      };

      console.log(JSON.stringify(requestData));
      try {
        const response = await fetch(
          "https://api-ecatalogue-staging.online/api/perencanaan-data/store-identifikasi-kebutuhan",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        // Memeriksa apakah response berhasil
        if (!response.ok) {
          throw new Error("Submit tahap 2 gagal: " + response.statusText);
        }

        // Mengambil dan mem-parsing response data
        const responseData = await response.json(); // Parse the JSON data
        console.log(responseData);

        // Mengambil data identifikasi_kebutuhan_id dari response dan menyimpannya ke localStorage
        localStorage.setItem(
          "identifikasi_kebutuhan_id",
          responseData.data?.material[0]?.identifikasi_kebutuhan_id ?? 0
        );
      } catch (error) {
        console.error(error); // Mencetak error ke konsol untuk debugging
        throw error; // Melempar kembali error jika diperlukan
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <h4 className="text-H4 text-emphasis-on_surface-high">
        Identifikasi Kebutuhan{" "}
      </h4>
      <div className="mt-6">
        <Tabs tabs={tabs} />
      </div>
      <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
        <Button variant="outlined_yellow" size="Medium" onClick={onBack}>
          Kembali
        </Button>

        <Button
          variant="solid_blue"
          size="Medium"
          onClick={async () => {
            console.log("onNext called");
            try {
              await handleSubmitSecondStep();
              onNext();
            } catch (error) {
              alert(error.message);
            }
          }}>
          Simpan & Lanjut
        </Button>
      </div>
    </div>
  );
};

export default Tahap2;
