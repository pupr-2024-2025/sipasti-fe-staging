import React, { useState, useEffect } from "react";
import { CloseCircle } from "iconsax-react";
import Select, {
  SingleValue,
  MultiValue,
  ActionMeta,
  components,
  MenuProps,
} from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import colors from "@/styles/colors";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  label?: string;
  placeholder?: string;
  onSelect: (selected: DropdownOption | null) => void;
  value?: DropdownOption | null;
  isRequired?: boolean;
  errorMessage?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  placeholder = "Pilih Opsi",
  onSelect,
  value = null,
  isRequired = false,
  errorMessage = "Wajib Diisi",
}) => {
  const [selectedValue, setSelectedValue] = useState<DropdownOption | null>(
    value
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setSelectedValue(value || null);
  }, [value]);

  const handleChange = (
    selectedOption: SingleValue<DropdownOption> | MultiValue<DropdownOption>,
    _actionMeta: ActionMeta<DropdownOption>
  ) => {
    const single = selectedOption as SingleValue<DropdownOption>;
    setSelectedValue(single);
    onSelect(single);

    if (isRequired && !single) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };
  const handleBlur = () => {
    if (isRequired && !selectedValue) {
      setError(errorMessage);
    }
  };

  const formattedOptions = options.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  const Menu = (props: MenuProps<DropdownOption>) => (
    <AnimatePresence>
      {props.selectProps.menuIsOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}>
          <components.Menu {...props} />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative flex flex-col w-full">
      {label && (
        <label className="text-B2 text-emphasis-on_surface-high mb-1">
          {label}
          {isRequired && <span className="text-custom-red-500"> *</span>}
        </label>
      )}

      <Select<DropdownOption, false>
        value={selectedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        options={formattedOptions}
        placeholder={placeholder}
        classNamePrefix="select"
        isClearable={false}
        menuPortalTarget={typeof window !== "undefined" ? document.body : null}
        components={{ Menu }}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "48px",
            borderWidth: "1.5px",
            borderRadius: "16px",
            transition: "all 200ms ease-in-out",
            borderColor: error
              ? colors.Solid.Basic.Red[500]
              : colors.Solid.Basic.Neutral[300],
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
            zIndex: 9999,
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            padding: "8px",
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
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
  );
};

export default Dropdown;
