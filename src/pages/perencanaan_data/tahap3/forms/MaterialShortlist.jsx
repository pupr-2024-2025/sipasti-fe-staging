import { Field } from "formik";
import Checkbox from "../../../../components/checkbox";
import SearchBox from "../../../../components/searchbox";
import { Button } from "@mui/material";
import SimpleTabs from "../../../../components/SimpleTabs";
import useTahap3Store from "../tahap3store";
import { useEffect, useState } from "react";

const MaterialShortlist = ({
	values,
	rows,
	hide,
}) => {
	const tabs = ["Material", "Peralatan", "Tenaga Kerja"];

	const {
		setCurrentTab,
	} = useTahap3Store();

	const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

	return (
		<div className={`${hide ? "hidden" : ""}`}>
			<div className="space-y-4">
				<div className="flex flex-row justify-between items-center">
					<SimpleTabs
						items={tabs}
						onChange={setCurrentTab}
						selectedValue={0}
					/>
					<div className="flex flex-row items-center space-x-4">
						<SearchBox
							placeholder="Cari Material..."
							// onSearch={(query) => handleSearch(query, "material")}
							// filterOptions={filterOptions}
							withFilter={true}
							onFilterClick={(filters) => {
								console.log("Filter option clicked:", filters); // Debug
								handleFilterClick(filters);
							}}
						//   onSearch={handleSearch}
						/>
						<Button
							type="button"
							variant="solid_blue"
							size="Medium"
						//   onClick={() => setIsModalOpen(true)}
						>
							Tambah Data
						</Button>
					</div>
				</div>
			</div>
			<div className={`rounded-[16px] border border-gray-200 overflow-hidden mt-6`}>
				<div className="overflow-x-auto">
					<table className="table-auto w-full min-w-max">
						<thead>
							<tr className="bg-custom-blue-100 text-left text-emphasis-on_surface-high uppercase tracking-wider">
								<th className="px-3 py-6 text-sm font-semibold text-center w-[52px]">
									<Field
										name="checkedAllMaterial"
										type="checkbox"
										className="h-4 w-4"
									>
										{({ field, form }) => (
											<Checkbox
												{...field}
												onChange={(checked) => {
													console.log(field)
													console.log("Select All Checked:", checked);
													form.setFieldValue("checkedAllMaterial", checked);
													rows.forEach((item, index) => {
														form.setFieldValue(`material[${index}]`, {
															value: item.id,
															checked,
														})
													})
													setIsSelectAllChecked(checked);
												}}
											/>
										)}
									</Field>
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
							{rows.map((item, index) => (
								<tr
									key={item.id}
									className={`${index % 2 === 0 ? "bg-custom-neutral-0" : "bg-custom-neutral-100"}`}>
									<td className="px-3 py-6 text-sm text-center">
										{/* <Checkbox
										label=""
										checked={false}
										onChange={(checked) => {
											console.log(`Row ${index + 1} Checked:`, checked);
										}}
									/> */}
										<Field
											name={`material[${index}]`}
											type="checkbox"
											className="h-4 w-4"
											value={item.id}
											checked={isSelectAllChecked}
										>
											{({ field, form }) => (
												<Checkbox
													{...field}
													onChange={(e) => {
														form.setFieldValue(`material[${index}]`, {
															value: item.id,
															checked: e,
														})
													}}
												/>
											)}
										</Field>
									</td>
									<td className="px-3 py-6 text-sm text-center">{index + 1}</td>
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
		</div>
	)
}

export default MaterialShortlist;
