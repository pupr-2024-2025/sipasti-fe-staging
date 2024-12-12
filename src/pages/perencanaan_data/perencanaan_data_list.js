import React, { useState, useEffect } from "react";
import Navbar from "../../components/navigationbar";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import { More } from "iconsax-react";

const PerencanaanDataList = () => {
  const [tableData, setTableData] = useState([]);
  const [tableState, setTableState] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);

  const columns = [
    {
      title: "Nama Paket",
      accessor: "nama_paket",
      type: "text",
      width: "280px",
    },
    {
      title: "Nama Balai",
      accessor: "nama_balai",
      type: "text",
      width: "280px",
    },
    { title: "Nama PPK", accessor: "nama_ppk", type: "text", width: "200px" },
    {
      title: "Jabatan PPK",
      accessor: "jabatan_ppk",
      type: "text",
      width: "200px",
    },
    { title: "Kode RUP", accessor: "kode_rup", type: "text", width: "140px" },
    { title: "Status", accessor: "status", type: "text", width: "280px" },
    {
      title: "Aksi",
      accessor: "aksi",
      type: "iconButton",
      icon: More,
      width: "52px",
      onClick: (row) => alert(`Hapus baris ID: ${row.id}`),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-ecatalogue-staging.online/api/perencanaan-data/table-list-prencanaan-data",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched Data:", result);
        setTableData(result.data);
        setTotalData(result.data.length);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-8">
      <Navbar />
      <div className="space-y-3">
        <h1 className="text-H3 font-bold mt-8">Informasi Perencanaan Data</h1>
        <Table
          columns={columns}
          data={paginatedData}
          setParentState={setTableState}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalData={totalData}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PerencanaanDataList;
