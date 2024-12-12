import React, { useState, useEffect } from "react";
import Table from "./table";
import axios from "axios";
import { useRouter } from "next/router";
import useStore from "./store";

const Tahap3 = ({ onNext, onBack }) => {
  const [data, setData] = useState({ material: [], equipment: [], labor: [] });
  const [currentPage, setCurrentPage] = useState({
    material: 1,
    equipment: 1,
    labor: 1,
  });
  const itemsPerPage = 10;
  const [materialData, setMaterialData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [laborData, setLaborData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [identifikasi_kebutuhan_id, setIdentifikasi_Kebutuhan_id] =
    useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allDataMaterial, setAllDataMaterial] = useState([]);
  const [allDataPeralatan, setAllDataPeralatan] = useState([]);
  const [allDataTenagaKerja, setAllDataTenagaKerja] = useState([]);
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);
  const [checkedMaterial, setCheckedMaterial] = useState([]);
  const [checkedEquipment, setCheckedEquipment] = useState([]);
  const [checkedLabor, setCheckedLabor] = useState([]);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const store = useStore ? useStore() : {};
  const { setCheckedValue } = store;

  useEffect(() => {
    // Ambil identifikasi_kebutuhan_id dari localStorage
    const storedId = localStorage.getItem("identifikasi_kebutuhan_id");
    if (storedId) {
      setIdentifikasi_Kebutuhan_id(storedId);

      // Request ke API dengan ID langsung di URL
      axios
        .get(
          `https://api-ecatalogue-staging.online/api/perencanaan-data/get-data-vendor/${storedId}`
        )
        .then((response) => {
          const { material, peralatan, tenaga_kerja } = response.data.data;
          setMaterialData(material || []);
          setEquipmentData(peralatan || []);
          setLaborData(tenaga_kerja || []);
          setAllDataMaterial(material || []);
          // setDataPeralatan(peralatan || []);
          setAllDataPeralatan(peralatan || []);
          // setDataTenagaKerja(tenaga_kerja || []);
          setAllDataTenagaKerja(tenaga_kerja || []);
          const materialIds = material.map((material) => material.id);
          console.log("material is called", materialIds);
          setCheckedValue(materialIds);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.warn(
        "identifikasi_kebutuhan_id tidak ditemukan di localStorage."
      );
    }
  }, []);

  const handleCheckboxChange = (vendor, isChecked) => {
    const updatedVendors = isChecked
      ? [
          ...selectedVendors,
          {
            data_vendor_id: vendor.id,
            nama_vendor: vendor.nama_vendor,
            pemilik_vendor: vendor.pemilik_vendor,
            sumber_daya: vendor.sumber_daya,
            alamat: vendor.alamat,
            kontak: vendor.kontak,
          },
        ]
      : selectedVendors.filter(
          (selectedVendor) => selectedVendor.data_vendor_id !== vendor.id
        );

    setSelectedVendors(updatedVendors);

    // Update the checkbox state for material
    setCheckedMaterial((prevChecked) => {
      const updatedChecked = isChecked
        ? [...prevChecked, vendor.id]
        : prevChecked.filter((id) => id !== vendor.id);
      return updatedChecked;
    });

    // Update the parent state with the selected vendors
    setParentState(updatedVendors);
  };

  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    if (selectedVendors.length === 0) {
      console.error("Silakan pilih minimal satu vendor.");
      isValid = false;
    }

    selectedVendors.forEach((vendor, index) => {
      if (!vendor.data_vendor_id) {
        newErrors[`shortlist_vendor.${index}.data_vendor_id`] =
          "ID Vendor diperlukan.";
        isValid = false;
      }
    });

    setFormErrors(newErrors);
    return isValid;
  };
  const handleFilterClick = (filters) => {
    // Cari filter yang dicentang (checked: true)
    const activeFilter = filters.find((filter) => filter.checked);

    if (!activeFilter) {
      console.log("No active filter selected.");
      return;
    }

    console.log("Filter clicked:", activeFilter.accessor); // Filter yang dipilih

    // Update activeFilterColumn untuk toggle antara filter yang aktif atau null
    setActiveFilterColumn((prev) => {
      const newActiveColumn =
        prev === activeFilter.accessor ? null : activeFilter.accessor;
      console.log("Active filter column updated to:", newActiveColumn);
      return newActiveColumn;
    });

    // Panggil fungsi pencarian untuk langsung menerapkan filter
    handleSearch("", "material"); // Ganti 'material' dengan tab yang sesuai
  };

  const fetchVendorData = async (id) => {
    console.log("Fetching vendor data for ID:", id);

    try {
      const response = await axios.get(
        `https://api-ecatalogue-staging.online/api/perencanaan-data/get-data-vendor/${id}`
      );
      const result = response.data;

      console.log("Vendor data fetched successfully:", JSON.stringify(result));
      if (result?.data) {
        const { material, peralatan, tenaga_kerja } = result.data;
        const materialIds = material.map((material) => material.id);
        console.log(materialIds);
        const peralatanIds = peralatan.map((peralatan) => peralatan.id);
        console.log(peralatanIds);
        const tenaga_kerjaIds = tenaga_kerja.map(
          (tenaga_kerja) => tenaga_kerja.id
        );
        console.log(tenaga_kerjaIds);

        setMaterialData(material || []);
        setEquipmentData(peralatan || []);
        setLaborData(tenaga_kerja || []);
        setAllDataMaterial(material || []);
        setAllDataPeralatan(peralatan || []);
        setAllDataTenagaKerja(tenaga_kerja || []);

        setCheckedMaterial(materialIds);
        setCheckedEquipment(peralatanIds);
        setCheckedLabor(tenaga_kerjaIds);

        console.log("State updated with vendor data.");
      }
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  };

  useEffect(() => {
    const storedId = localStorage.getItem("identifikasi_kebutuhan_id");
    if (storedId) {
      setIdentifikasi_Kebutuhan_id(storedId);
      fetchVendorData(storedId);
    } else {
      console.warn(
        "identifikasi_kebutuhan_id tidak ditemukan di localStorage."
      );
    }
  }, []);

  const columns = [
    {
      title: "",
      accessor: "select",
      type: "checkbox",
      width: "48px",
      onChange: handleCheckboxChange,
    },
    {
      title: "Responden/Vendor",
      accessor: "nama_vendor",
      type: "text",
      width: "408px",
    },
    {
      title: "Sumber Daya",
      accessor: "sumber_daya",
      type: "text",
      width: "408px",
    },
    {
      title: "Pemilik Vendor",
      accessor: "pemilik_vendor",
      type: "text",
      width: "260px",
    },
    {
      title: "Alamat",
      accessor: "alamat",
      type: "text",
      placeholder: "Masukkan Spesifikasi",
      width: "340px",
    },
    {
      title: "Kontak",
      accessor: "kontak",
      type: "text",
      placeholder: "Masukkan Spesifikasi",
      width: "200px",
    },
  ];

  return (
    <div className="p-8">
      <div className="mt-3 space-y-8">
        <div className="space-y-3">
          <Table
            columns={columns}
            data={materialData}
            errors={formErrors}
            setParentState={() => {}}
            checkedValue={checkedMaterial} // Mengirim daftar ID yang sudah tercentang
          />
        </div>
      </div>
    </div>
  );
};

export default Tahap3;
