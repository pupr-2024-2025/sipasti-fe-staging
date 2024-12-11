import { useState } from "react";
import Button from "./button";

const AddRowModal = ({ handleClose, handleAddRow, currentIndex }) => {
  const getTitle = (index) => {
    switch (index) {
      case 0:
        return "Material";
      case 1:
        return "Peralatan";
      case 2:
        return "Tenaga Kerja";
      default:
        return "";
    }
  };

  const [rowsToAdd, setRowsToAdd] = useState(1);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 shadow-md w-96 rounded-[12px]">
        <label className="block mb-2">
          <p className="text-Medium font-bold text-emphasis-on_surface-high">
            Tambah Data {getTitle(currentIndex)}
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
          <Button variant="outlined_yellow" size="Medium" onClick={handleClose}>
            Batal{" "}
          </Button>
          <Button
            onClick={() => {
              handleAddRow(rowsToAdd);
              handleClose();
            }}>
            Tambah
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddRowModal;
