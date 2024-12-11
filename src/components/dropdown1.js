import React, { useState, useEffect } from "react";
import { CloseCircle } from "iconsax-react";
import colors from "../styles/colors";

const Dropdown = ({
  options,
  label,
  placeholder = "Pilih Opsi",
  onSelect,
  value,
  isRequired = false,
  errorMessage = "Wajib diisi",
  labelPosition = "top",
  labelWidth = "150px",
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedValue(selected);

    if (isRequired && !selected) {
      setError(errorMessage);
    } else {
      setError("");
    }
    onSelect && onSelect(selected);
  };

  const handleBlur = () => {
    if (isRequired && !selectedValue) {
      setError(errorMessage);
    }
  };

  return (
    <div
      className={`relative flex ${
        labelPosition === "left" ? "flex-row items-center" : "flex-col"
      } w-full`}>
      {label && (
        <label
          className={`text-B2 text-emphasis-on_surface-high ${
            labelPosition === "left" ? "mr-4" : "mb-1"
          }`}
          style={{
            width: labelPosition === "left" ? labelWidth : "auto",
            minWidth: labelPosition === "left" ? labelWidth : "auto",
          }}>
          {label}
          {isRequired && <span className="text-custom-red-500"> *</span>}
        </label>
      )}
      <div className={`w-full ${labelPosition === "left" ? "flex-1" : ""}`}>
        <select
          value={selectedValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full border ${
            error ? "border-custom-red-500" : "border-surface-light-outline"
          } p-3 rounded-[16px] text-B2 text-emphasis-on_surface-high`}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <div className="flex items-center mt-1">
            <CloseCircle
              color={colors.Solid.Basic.Red[500]}
              variant="Linear"
              size={16}
              className="mr-1"
            />
            <span className="text-custom-red-500 text-ExtraSmall">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
