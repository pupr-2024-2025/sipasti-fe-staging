import React, { useState } from "react";
import Image from "next/image";

const Checkbox = ({ label, checked: initialChecked = false, onChange }) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <div className="flex items-center justify-left space-x-2 h-full">
      <button onClick={handleCheckboxChange} className="flex items-center">
        <Image
          src={checked ? "/images/checked.svg" : "/images/unchecked.svg"}
          alt={checked ? "Checked" : "Unchecked"}
          width={24} // Adjust dimensions as needed
          height={24}
        />
      </button>
      <span className="ml-2 text-emphasis-on_surface-medium">{label}</span>
    </div>
  );
};

export default Checkbox;
