import React, { useState, useEffect } from "react";
import Navbar from "../../../components/navigationbar";
import Pagination from "../../../components/pagination";
import penugasanTimStore from "../penugasan_tim/_store/penugasan_tim";
import Button from "../../../components/button";
import { More } from "iconsax-react";
import colors from "../../../styles/colors";
import Link from "next/link";
import Checkbox from "../../../components/checkbox";
import CustomAlert from "../../../components/alert";

export default function PenugasanTim() {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
    const {
        pengawas,
        fetchTableData,
        submitData,
        addSelectedPengawas,
        removeSelectedPengawas,
		addSelectedId,
		removeSelectedId,
        alertSeverity,
        alertMessage,
        isAlertOpen,
        setAlertClose,
    } = penugasanTimStore();
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
		fetchTableData('petugas-lapangan');
	}, [fetchTableData]);

	const paginatedData = pengawas.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	return (
		<div className="p-8">
			<Navbar />
			<div className="space-y-3 pt-8">
				<h3 className="text-H3 text-emphasis-on_surface-high">Petugas Lapangan</h3>
				<div className="rounded-[16px] border border-gray-200 overflow-hidden">
					<div className="overflow-x-auto">
						<table className="table-auto w-full min-w-max">
							<thead>
								<tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
									<th className="px-3 py-6 text-sm font-semibold text-center ">
										<Checkbox
                                            checked={selectAll}
                                            onChange={() => {}}
                                            name="selectAll"
                                        />
									</th>
									<th className="px-3 py-6 text-sm font-semibold ">
										Nama Lengkap
									</th>
									<th className="px-3 py-6 text-sm font-semibold ">NIP/NRP</th>
									<th className="px-3 py-6 text-sm font-semibold ">
										Satuan Kerja
									</th>
									<th className="px-3 py-6 text-sm font-semibold ">
										Status Penugasan
									</th>
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
                                            <Checkbox
                                                onChange={(checked) => {
                                                    if (checked) {
                                                        addSelectedPengawas(item?.id_user ?? 0);
														addSelectedId(item?.petugas_lapangan_id ?? 0);
                                                        return;
                                                    }
                                                    removeSelectedPengawas(item?.id_user ?? 0);
													removeSelectedId(item?.petugas_lapangan_id ?? 0);
                                                }}
                                            />
										</td>
										<td className="px-3 py-6 text-sm">{item.nama_lengkap}</td>
										<td className="px-3 py-6 text-sm">{item.nrp}</td>
										<td className="px-3 py-6 text-sm">
											{item.satuan_kerja_nama}
										</td>
										<td className="px-3 py-6 text-sm">{item.status}</td>
										<td className="px-3 py-6 text-sm">
											<div className="flex justify-center">
												<Button
													variant="outlined_blue"
													size="Medium"
													// className="px-4 py-2 border border-custom-blue-500 rounded-xl text-custom-blue-500 text-sm font-semibold hover:bg-custom-blue-50 transition-colors cursor-pointer"
													onClick={() => showPDF(item.url_sk_penugasan)}
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
				totalData={pengawas.length}
				onPageChange={setCurrentPage}
			/>
			<div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
				<Button
					variant="outlined_yellow"
					size="Medium"
					// onClick={navigateToTahap1}
				>
					Kembali
				</Button>

				<Button type="submit" variant="solid_blue" size="Medium" onClick={() => {
                    submitData('petugas-lapangan');
                }}>
					Simpan
				</Button>
			</div>
			{/* Dropdown di luar tabel */}
			{/* {activeDropdown && (
				<div
					className="absolute bg-white rounded-[12px] shadow-lg p-2 w-56"
					style={{
						top: dropdownPosition.top,
						left: dropdownPosition.alignRight
							? undefined
							: dropdownPosition.left,
						right: dropdownPosition.alignRight ? 0 : undefined, // Jika alignRight true, gunakan right
						zIndex: 10000,
						boxShadow: "0px 4px 16px 0px rgba(165, 163, 174, 0.45)",
					}}
				>
					<Link
						href="/pj_balai/monitoring/monitoring_perencanaan_data"
						className="block px-4 py-2 text-sm text-emphasis-on_surface-high hover:bg-custom-blue-50 rounded-[12px] transition-all duration-200"
					>
						Lihat PDF Kuesioner
					</Link>
					<Link
						href="/pj_balai/penugasan_tim/penugasan_tim"
						className="block px-4 py-2 text-sm text-emphasis-on_surface-high hover:bg-custom-blue-50 rounded-[12px] transition-all duration-200"
					>
						Lihat Detail Kuesioner
					</Link>
				</div>
			)} */}
            <CustomAlert
                message={alertMessage}
                severity={alertSeverity}
                openInitially={isAlertOpen}
                onClose={() => setAlertClose()}
            />
		</div>
	);
}
