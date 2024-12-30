import React, { useState, useEffect } from "react";
import Navbar from "../../components/navigationbar";
import Stepper from "../../components/stepper";
import useStore from "./tahap3/tahap3store";
import SearchBox from "../../components/searchbox";
import Button from "../../components/button";
import Checkbox from "../../components/checkbox";
import Pagination from "../../components/pagination";
import { Form, Formik } from "formik";
import MaterialShortlist from "./tahap3/forms/MaterialShortlist";
import PeralatanShortlist from "./tahap3/forms/PeralatanShortlist";
import TenagaKerjaShortlist from "./tahap3/forms/TenagaKerjaShortlist";
import { useRouter } from "next/router";
import axios from "axios";
import CustomAlert from "../../components/alert";

export default function Tahap3() {
  const NUMBER_OF_STEPS = 4;
  const [currentStep, setCurrentStep] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigateToTahap1 = () => {
    window.location.href = "/perencanaan_data/tahap2?fromTahap3=true";
  };
  const { initialValues, fetchStatusProgres } = useStore();

  const filterOptions = [
    { label: "Responden/Vendor", accessor: "nama_vendor", checked: true },
    { label: "Sumber Daya", accessor: "sumber_daya", checked: false },
    { label: "Pemilik Vendor", accessor: "pemilik_vendor", checked: false },
    { label: "Alamat", accessor: "alamat", checked: false },
    { label: "Kontak", accessor: "kontak", checked: false },
  ];

  const stepLabels = [
    "Informasi Umum",
    "Identifikasi Kebutuhan",
    "Penentuan Shortlist Vendor",
    "Perancangan Kuesioner",
  ];

  const tabs = ["Material", "Peralatan", "Tenaga Kerja"];
  const dataByTab = [
    initialValues.material,
    initialValues.peralatan,
    initialValues.tenaga_kerja,
  ];

  const router = useRouter();

  const {
    currentTab,
    alertMessage,
    alertSeverity,
    isAlertOpen,
    setAlertMessage,
    setAlertSeverity,
    setIsAlertOpen,
  } = useStore();

  console.log("currentTab", currentTab);

  useEffect(() => {
    fetchStatusProgres();
  }, [fetchStatusProgres]);

  const Tabs = ({ items, onChange, selectedValue, button }) => {
    const handleClick = (tabIndex) => {
      onChange(tabIndex);
    };

    return (
      <div>
        <div className="flex justify-between">
          <div className="inline-flex space-x-2 bg-custom-neutral-100 rounded-[16px] p-2 h-[60px]">
            {items.map((item, tabIndex) => (
              <button
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

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Adjust totalData to reflect the data for the selected tab
  const totalData = dataByTab[currentTab]?.length || 0;

  console.log('initialValue', initialValues)

  return (
    <div className="p-8">
      <Navbar />
      <div className="space-y-3 pt-8">
        <h3 className="text-H3 text-emphasis-on_surface-high">
          Tahap Perencanaan Data
        </h3>
      </div>
      <div className="justify-center items-center space-x-4 mt-3 bg-neutral-100 px-6 pb-8 pt-16 rounded-[16px]">
        <Stepper
          currentStep={currentStep}
          numberOfSteps={NUMBER_OF_STEPS}
          labels={stepLabels}
        />
      </div>
      <h4 className="text-H4 text-emphasis-on_surface-high m-4">
        Penentuan Shortlist Vendor
      </h4>
      <Formik
        initialValues={{
          material: [],
          peralatan: [],
          tenaga_kerja: [],
        }}
        onSubmit={async (values) => {
          const materials = values.material;
          const peralatans = values.peralatan;
          const tenagaKerjas = values.tenaga_kerja;
          const selectedMaterials = materials.filter(
            (item) => (item?.checked ?? false) === true
          );
          const selectedPeralatans = peralatans.filter(
            (item) => (item?.checked ?? false) === true
          );
          const selectedTenagaKerjas = tenagaKerjas.filter(
            (item) => (item?.checked ?? false) === true
          );

          console.log("selectedMaterials", selectedMaterials);
          const completedSelectedMaterials = selectedMaterials
            .filter((material) => material.checked)
            .map((material) =>
              initialValues.material.find(
                (vendor) => vendor.id === material.value
              )
            );

          const completedSelectedPeralatans = selectedPeralatans
            .filter((peralatan) => peralatan.checked)
            .map((peralatan) =>
              initialValues.peralatan.find(
                (vendor) => vendor.id === peralatan.value
              )
            );

          const completedSelectedTenagaKerjas = selectedTenagaKerjas
            .filter((tenagaKerja) => tenagaKerja.checked)
            .map((tenagaKerja) =>
              initialValues.tenaga_kerja.find(
                (vendor) => vendor.id === tenagaKerja.value
              )
            );

          const combinedSelectedItems = [
            ...completedSelectedMaterials,
            ...completedSelectedPeralatans,
            ...completedSelectedTenagaKerjas,
          ];

          console.log("combinedSelectedItems", combinedSelectedItems);

          const mappedSelectedItems = combinedSelectedItems.map((item) => {
            return {
              data_vendor_id: item.id,
              nama_vendor: item.nama_vendor,
              pemilik_vendor: item.pemilik_vendor,
              sumber_daya: item.sumber_daya,
              alamat: item.alamat,
              kontak: item.kontak,
            };
          });

          const response = await axios.post(
            "https://api-ecatalogue-staging.online/api/perencanaan-data/store-shortlist-vendor",
            {
              identifikasi_kebutuhan_id:
                localStorage.getItem("identifikasi_kebutuhan_id") || "",
              shortlist_vendor: mappedSelectedItems,
            }
          );

          if (response.data.status === "success") {
            setAlertMessage("Data berhasil disimpan.");
            setAlertSeverity("success");
            setIsAlertOpen(true);
            router.replace("/perencanaan_data/tahap4");
            return;
          }
          setAlertMessage("Gagal menyimpan data.");
          setAlertSeverity("error");
          setIsAlertOpen(true);
        }}
        enableReinitialize={true}>
        {({ values }) => (
          <Form>
            <MaterialShortlist
              values={values}
              rows={initialValues.material}
              hide={currentTab !== 0}
            />
            <PeralatanShortlist
              values={values}
              rows={initialValues.peralatan}
              hide={currentTab !== 1}
            />
            <TenagaKerjaShortlist
              values={values}
              rows={initialValues.tenaga_kerja}
              hide={currentTab !== 2}
            />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalData={totalData}
              onPageChange={handlePaginationChange}
            />
            <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
              <Button
                variant="outlined_yellow"
                size="Medium"
                onClick={navigateToTahap1}>
                Kembali
              </Button>

              <Button type="submit" variant="solid_blue" size="Medium">
                Simpan & Lanjut
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <CustomAlert
        message={alertMessage}
        severity={alertSeverity}
        openInitially={isAlertOpen}
        onClose={() => setIsAlertOpen(true)}
      />
    </div>
  );
}