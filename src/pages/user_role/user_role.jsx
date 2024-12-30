import React, { useState, useEffect } from "react";
import Navbar from "../../components/navigationbar";
import Pagination from "../../components/pagination";
import Button from "../../components/button";
import { More } from "iconsax-react";
import colors from "../../styles/colors";
import Link from "next/link";
import Checkbox from "../../components/checkbox";
import CustomAlert from "../../components/alert";
import userRoleStore from "./_store/user_role_store";
import DropdownAPI from "../../components/dropdownapi";

export default function PenugasanTim() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { users, roles, fetchUsers, fetchRoles, addChangedRole, submitData } =
    userRoleStore();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    alignRight: false,
  });

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  /* const handleToggleDropdown = (rowId, event) => {
		if (activeDropdown === rowId) {
			setActiveDropdown(null);
		} else {
			const rect = event.target.getBoundingClientRect();
			const screenWidth = window.innerWidth;
			const dropdownWidth = 200;

			let positionLeft = rect.left + window.scrollX;
			let alignRight = false;

			if (positionLeft + dropdownWidth > screenWidth) {
				positionLeft = screenWidth - dropdownWidth - 10;
				alignRight = true;
			}

			setDropdownPosition({
				top: rect.bottom + window.scrollY,
				left: positionLeft,
				alignRight: alignRight,
			});
			setActiveDropdown(rowId);
		}
	}; */

  const showPDF = (pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    } else {
      alert("PDF not available!");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [fetchUsers, fetchRoles]);

  const paginatedData = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-8">
      <Navbar />
      <div className="space-y-3 pt-8">
        <h3 className="text-H3 text-emphasis-on_surface-high">
          Manajemen Role
        </h3>
        <div className="rounded-[16px] border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-auto w-full min-w-max">
              <thead>
                <tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
                  <th className="px-3 py-6 text-sm font-semibold text-center ">
                    User ID
                  </th>
                  <th className="px-3 py-6 text-sm font-semibold ">
                    Nama Lengkap
                  </th>
                  <th className="px-3 py-6 text-sm font-semibold ">NIP/NRP</th>
                  <th className="px-3 py-6 text-sm font-semibold ">Role</th>
                  <th className="px-3 py-6 text-sm font-semibold ">No. HP</th>
                  <th className="px-3 py-6 text-sm font-semibold ">
                    Satuan Kerja
                  </th>
                  <th className="px-3 py-6 text-sm font-semibold ">
                    Balai Kerja
                  </th>
                  <th className="px-3 py-6 text-sm font-semibold ">Email</th>
                  <th className="px-3 py-6 text-sm font-semibold text-center">
                    SK Penugasan
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={` ${
                      index % 2 === 0
                        ? "bg-custom-neutral-0"
                        : "bg-custom-neutral-100"
                    }`}
                  >
                    <td className="px-3 py-6 text-sm text-center">
                      {item.user_id}
                    </td>
                    <td className="px-3 py-6 text-sm">{item.nama_lengkap}</td>
                    <td className="px-3 py-6 text-sm">{item["nrp/nip"]}</td>
                    <td>
                      <DropdownAPI
                        options={roles}
                        selectedItem={item.role}
                        onChange={(role) => {
                          addChangedRole(item.user_id, role.value);
                        }}
                      />
                    </td>
                    <td className="px-3 py-6 text-sm">{item.no_handphone}</td>
                    <td className="px-3 py-6 text-sm">{item.satuan_kerja}</td>
                    <td className="px-3 py-6 text-sm">{item.balai_kerja}</td>
                    <td className="px-3 py-6 text-sm">{item.email}</td>
                    <td className="px-3 py-6 text-sm">
                      <div className="flex justify-center">
                        <Button
                          variant="outlined_blue"
                          size="Medium"
                          onClick={() => showPDF(item.surat_penugasan_url)}
                        >
                          Lihat PDF
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalData={users.length}
        onPageChange={setCurrentPage}
      />
      <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
        <Button variant="outlined_yellow" size="Medium">
          Kembali
        </Button>

        <Button
          type="submit"
          variant="solid_blue"
          size="Medium"
          onClick={() => {
            submitData();
          }}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
}
