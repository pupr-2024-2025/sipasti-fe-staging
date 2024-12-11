import { CloseCircle } from "iconsax-react";
import Select from "react-select";
import colors from "../styles/colors";
import { useEffect, useState } from "react";

const DropdownAPI = ({
  options,
  value,
  isRequired = false,
  errorMessage,
  onChange,
  placeholder,
}) => {
  const [error, setError] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  const handleChange = (selectedOption) => {
    onChange(selectedOption);

    if (isRequired && !selectedOption) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  return (
    <div className="relative flex flex-col w-full">
      <div className="w-full">
        <Select
          options={options}
          value={value}
          onChange={handleChange}
          isRequired={isRequired}
          placeholder={placeholder}
          className={`react-select ${error ? "border-custom-red-500" : ""}`}
          classNamePrefix="select"
          isClearable={false}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: "48px",
              borderWidth: "1.5px",
              borderRadius: "16px",
              transition: "all 200ms ease-in-out",
              borderColor: error
                ? colors.Solid.Basic.Red[500]
                : base.borderColor,
              boxShadow: "none",
              "&:hover": {
                borderColor: error
                  ? colors.Solid.Basic.Red[500]
                  : colors.Solid.Basic.Blue[500],
              },
            }),
            placeholder: (base) => ({
              ...base,
              color: "gray",
              textAlign: "left",
            }),
            menu: (base) => ({
              ...base,
              zIndex: 100000,
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              padding: "8px",
            }),
            option: (base, state) => ({
              ...base,
              fontSize: "0.875rem",
              textAlign: "left",
              padding: "8px",
              borderRadius: "8px",
              marginBottom: "4px",
              backgroundColor: state.isSelected
                ? colors.Solid.Basic.Blue[500]
                : state.isFocused
                ? colors.Solid.Basic.Blue[50]
                : base.backgroundColor,
              color: state.isSelected
                ? "white"
                : state.isFocused
                ? colors.Solid.Basic.Blue[500]
                : base.color,
            }),
          }}
          menuPortalTarget={isBrowser ? document.body : null}
          menuPosition="fixed"
        />
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

export default DropdownAPI;
