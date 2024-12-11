import React, { useState } from "react";
import colors from "../styles/colors";
import { EyeSlash, Eye, CloseCircle } from "iconsax-react";

const TextInput = ({
  label,
  placeholder = "Lorem Ipsum",
  size = "Small",
  baseClasses = "p-3 min-h-12 w-full border-[1.5px]",
  variant = "border",
  value,
  onChange,
  disabledActive = false,
  className = "",
  type = "text",
  isRequired = false,
  errorMessage = "Wajib diisi",
  labelPosition = "top",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const sizes = {
    ExtraSmall: "text-ExtraSmall px-2 py-1",
    Small: "text-Small px-3 py-2",
    Medium: "text-Medium px-4 py-3",
    Large: "text-Large px-5 py-4",
    ExtraLarge: "text-ExtraLarge px-6 py-5",
  };

  const variants = {
    border:
      "border border-surface-light-outline focus:outline-none focus:border-2 focus:border-custom-blue-500",
    disabledActive:
      "bg-white border border-surface-light-outline cursor-not-allowed text-emphasis-on_surface-high",
  };

  const handleBlur = () => {
    if (isRequired && !value) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    if (!disabledActive) {
      onChange(e);
      if (error) {
        setError("");
      }
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {labelPosition === "top" ? (
        <>
          {label && (
            <label
              className="text-B2 text-emphasis-on_surface-high w-[180px] block mb-1"
              style={{ whiteSpace: "nowrap" }}>
              {label}
              {isRequired && (
                <span className="text-custom-red-500 ml-1">*</span>
              )}
            </label>
          )}
          <div className="relative w-full">
            <input
              type={isPasswordVisible ? "text" : type}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabledActive}
              className={`${sizes[size]} ${baseClasses} ${
                disabledActive
                  ? variants.disabledActive
                  : error
                  ? `border-custom-red-500 focus:border-custom-blue-500 border-2`
                  : variants[variant]
              } rounded-[16px] transition-all duration-200 ease-in-out h-12`}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-6 w-6">
                {isPasswordVisible ? (
                  <EyeSlash
                    color={colors.Emphasis.Light.On_Surface.Medium}
                    variant="Linear"
                    size={24}
                  />
                ) : (
                  <Eye
                    color={colors.Emphasis.Light.On_Surface.Medium}
                    variant="Linear"
                    size={24}
                  />
                )}
              </button>
            )}
          </div>
          {error && (
            <div className="flex items-center mt-1">
              <CloseCircle
                color={colors.Solid.Basic.Red[500]}
                variant="Linear"
                size={16}
                className="mr-1"
              />
              <span className="text-custom-red-500 text-ExtraSmall">
                {error}
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center space-x-12">
            {label && (
              <label
                className="text-B2 text-emphasis-on_surface-high h-8 min-w-[180px] mr-2 flex items-center"
                style={{ whiteSpace: "nowrap" }}>
                {label}
                {isRequired && (
                  <span className="text-custom-red-500 ml-1">*</span>
                )}
              </label>
            )}
            <div className="relative w-full">
              <input
                type={isPasswordVisible ? "text" : type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabledActive}
                className={`${sizes[size]} ${baseClasses} ${
                  disabledActive
                    ? variants.disabledActive
                    : error
                    ? `border-custom-red-500 focus:border-custom-blue-500 border-2`
                    : variants[variant]
                } rounded-[16px] transition-all duration-200 ease-in-out h-12`}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-6 w-6">
                  {isPasswordVisible ? (
                    <EyeSlash
                      color={colors.Emphasis.Light.On_Surface.Medium}
                      variant="Linear"
                      size={24}
                    />
                  ) : (
                    <Eye
                      color={colors.Emphasis.Light.On_Surface.Medium}
                      variant="Linear"
                      size={24}
                    />
                  )}
                </button>
              )}
            </div>
          </div>
          {error && (
            <div className="flex items-center mt-1 ml-[236px]">
              <CloseCircle
                color={colors.Solid.Basic.Red[500]}
                variant="Linear"
                size={16}
                className="mr-1"
              />
              <span className="text-custom-red-500 text-ExtraSmall">
                {error}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TextInput;
