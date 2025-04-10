import { motion } from "framer-motion";
import React, { ReactNode, MouseEventHandler } from "react";

type ButtonSize = "ExtraSmall" | "Small" | "Medium" | "Large" | "ExtraLarge";
type ButtonVariant =
  | "solid_blue"
  | "solid_yellow"
  | "outlined_blue"
  | "outlined_yellow"
  | "blue_text"
  | "red_text"
  | "outlined_icon"
  | "disabled";

type ButtonProps = {
  children: ReactNode,
  size?: ButtonSize,
  variant?: ButtonVariant,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean,
  className?: string,
  iconLeft?: ReactNode,
  iconRight?: ReactNode,
  type?: "button" | "submit" | "reset",
};

const Button: React.FC<ButtonProps> = ({
  children,
  size = "Medium",
  variant = "solid_blue",
  onClick,
  disabled = false,
  className = "",
  iconLeft = null,
  iconRight = null,
  type = "button",
}) => {
  const sizes: Record<ButtonSize, string> = {
    ExtraSmall: className?.includes("custom-padding")
      ? "text-ExtraSmall rounded-[8px]"
      : "px-3 py-1 text-ExtraSmall rounded-[8px]",
    Small: className?.includes("custom-padding")
      ? "text-Small rounded-[12px]"
      : "px-5 py-1.5 text-Small rounded-[12px]",
    Medium: className?.includes("custom-padding")
      ? "text-Medium rounded-[16px]"
      : "px-6 py-3 text-Medium rounded-[16px]",
    Large: className?.includes("custom-padding")
      ? "text-Large rounded-[20px]"
      : "px-5 py-2.5 text-Large rounded-[20px]",
    ExtraLarge: className?.includes("custom-padding")
      ? "text-ExtraLarge rounded-[24px]"
      : "px-6 py-3 text-ExtraLarge rounded-[24px]",
  };

  const variants: Record<ButtonVariant, string> = {
    solid_blue:
      "bg-custom-blue-500 text-emphasis-on_color-high hover:bg-custom-blue-600 active:bg-custom-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700",
    solid_yellow:
      "bg-custom-yellow-500 text-emphasis-on_color-high hover:bg-custom-yellow-600 active:bg-custom-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-700",
    outlined_blue:
      "ring-2 ring-custom-blue-500 text-custom-blue-500 hover:bg-custom-blue-600/10 active:bg-custom-blue-700/1 focus:outline-none focus:ring-2 focus:ring-blue-700",
    outlined_yellow:
      "ring-2 ring-custom-yellow-500 text-custom-yellow-500 hover:bg-custom-yellow-600/10 active:bg-custom-yellow-700/1 focus:outline-none focus:ring-2 focus:ring-yellow-700",
    blue_text:
      "text-custom-blue-500 hover:text-custom-blue-600 active:text-custom-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700",
    red_text:
      "text-custom-red-500 hover:text-custom-red-600 active:text-custom-red-700 focus:outline-none focus:ring-2 focus:ring-red-700",
    outlined_icon:
      "ring-2 ring-custom-blue-500 text-custom-blue-500 hover:bg-custom-blue-500/10 active:bg-custom-blue-700/20 focus:outline-none focus:ring-2 focus:ring-blue-700 flex justify-center items-center rounded-full h-10 w-10",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={
        !disabled
          ? {
              scale: [1, 1.1, 0.95, 1.03, 1],
              transition: { duration: 0.6, ease: "easeInOut" },
            }
          : {}
      }
      whileTap={
        !disabled
          ? {
              scale: 0.92,
              rotate: [-1, 0.5, -0.5, 0],
              transition: { duration: 0.2 },
            }
          : {}
      }
      animate={{
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      className={`${sizes[size]} ${
        disabled ? variants["disabled"] : variants[variant]
      } flex justify-center items-center ${className}`}>
      {iconLeft && <span className="mr-1">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-1">{iconRight}</span>}
    </motion.button>
  );
};

export default Button;
