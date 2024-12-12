import React, { useState, useEffect } from "react";
import Navbar from "../../components/navigationbar";
import Stepper from "../../components/stepper";
import useStore from "./tahap3/tahap3store";
import SearchBox from "../../components/searchbox";
import Button from "../../components/button";
import Checkbox from "../../components/checkbox";
import Pagination from "../../components/pagination";

export default function Tahap3V2() {
  const NUMBER_OF_STEPS = 4;
  const [currentStep, setCurrentStep] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [currentTab, setCurrentTab] = useState(0);
  const navigateToTahap1 = () => {
    window.location.href = "/perencanaan_data/tahap1?fromTahap2=true";
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

  useEffect(() => {
    fetchStatusProgres();
  }, []);

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
      <div className="space-y-4">
        <div className="flex flex-row justify-between items-center">
          <Tabs
            items={tabs}
            onChange={setCurrentTab}
            selectedValue={currentTab}
          />
          <div className="flex flex-row items-center space-x-4">
            <SearchBox
              placeholder="Cari Material..."
              onSearch={(query) => handleSearch(query, "material")}
              filterOptions={filterOptions}
              withFilter={true}
              onFilterClick={(filters) => {
                console.log("Filter option clicked:", filters); // Debug
                handleFilterClick(filters);
              }}
              //   onSearch={handleSearch}
            />
            <Button
              variant="solid_blue"
              size="Medium"
              //   onClick={() => setIsModalOpen(true)}
            >
              Tambah Data
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-[16px] border border-gray-200 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-max">
            <thead>
              <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                <th className="px-3 py-6 text-sm font-semibold text-center w-[52px]">
                  <Checkbox
                    label=""
                    checked={false}
                    onChange={(checked) => {
                      console.log("Select All Checked:", checked);
                      // Tambahkan logika select all jika diperlukan
                    }}
                  />
                </th>
                <th className="px-3 py-6 text-sm font-semibold text-center w-[52px]">
                  No
                </th>
                <th className="px-3 py-6 text-sm font-semibold w-[280px]">
                  Nama Vendor
                </th>
                <th className="px-3 py-6 text-sm font-semibold w-[280px]">
                  Sumber Daya
                </th>
                <th className="px-3 py-6 text-sm font-semibold w-[280px]">
                  Pemilik Vendor
                </th>
                <th className="px-3 py-6 text-sm font-semibold w-[200px]">
                  Alamat
                </th>
                <th className="px-3 py-6 text-sm font-semibold w-[200px]">
                  Kontak
                </th>
              </tr>
            </thead>
            <tbody>
              {dataByTab[currentTab]
                ?.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0
                        ? "bg-custom-neutral-0"
                        : "bg-custom-neutral-100"
                    }`}>
                    <td className="px-3 py-6 text-sm text-center">
                      <Checkbox
                        label=""
                        checked={false}
                        onChange={(checked) => {
                          console.log(`Row ${index + 1} Checked:`, checked);
                        }}
                      />
                    </td>
                    <td className="px-3 py-6 text-sm text-center">
                      {index + 1}
                    </td>
                    <td className="px-3 py-6 text-sm">{item.nama_vendor}</td>
                    <td className="px-3 py-6 text-sm">{item.sumber_daya}</td>
                    <td className="px-3 py-6 text-sm">{item.pemilik_vendor}</td>
                    <td className="px-3 py-6 text-sm">{item.alamat}</td>
                    <td className="px-3 py-6 text-sm">{item.kontak}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
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

        <Button
          variant="solid_blue"
          size="Medium"
          onClick={() => handleSubmit(values)}>
          Simpan & Lanjut
        </Button>
      </div>
    </div>
  );
}
