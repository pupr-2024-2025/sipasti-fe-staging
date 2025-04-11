import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import { TickSquare, InfoCircle, Warning2 } from "iconsax-react";
import colors from "@/styles/colors";

type SeverityType = "success" | "info" | "warning" | "error";

interface CustomAlertProps {
  message: string;
  severity?: SeverityType;
  openInitially?: boolean;
  onClose?: () => void;
}

const CustomStyledAlert = styled(Alert)<{ severity: SeverityType }>(
  ({ severity }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1rem",
    fontFamily: "var(--font-poppins-r)",
    borderRadius: "12px",
    transition: "transform 0.3s ease, opacity 0.3s ease",
    transform: "translateY(-20px)",
    opacity: 0,
    "&.show": {
      transform: "translateY(0)",
      opacity: 1,
    },
    "& .MuiAlert-icon": {
      fontSize: "1.5rem",
    },
    ...(severity === "success" && {
      backgroundColor: colors.Solid.Basic.Green[100],
      color: colors.Solid.Basic.Green[600],
    }),
    ...(severity === "info" && {
      backgroundColor: colors.Solid.Basic.Blue[100],
      color: colors.Solid.Basic.Blue[600],
    }),
    ...(severity === "warning" && {
      backgroundColor: colors.Solid.Basic.Yellow[100],
      color: colors.Solid.Basic.Yellow[600],
    }),
    ...(severity === "error" && {
      backgroundColor: colors.Solid.Basic.Error[100],
      color: colors.Solid.Basic.Error[600],
    }),
  })
);

const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  severity = "info",
  openInitially = false,
  onClose,
}) => {
  const [open, setOpen] = useState(openInitially);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (openInitially) {
      setOpen(true);
      setTimeout(() => {
        setAnimate(true);
      }, 10);
    } else {
      setAnimate(false);
      setOpen(false);
    }
  }, [openInitially]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setAnimate(false);
    setTimeout(() => setOpen(false), 300);
    if (onClose) onClose();
  };

  const iconColor = (() => {
    switch (severity) {
      case "success":
        return colors.Solid.Basic.Green[600];
      case "info":
        return colors.Solid.Basic.Blue[600];
      case "warning":
        return colors.Solid.Basic.Yellow[600];
      case "error":
        return colors.Solid.Basic.Error[600];
      default:
        return undefined;
    }
  })();

  const renderIcon = () => {
    switch (severity) {
      case "success":
        return <TickSquare size="32" variant="Bulk" color={iconColor} />;
      case "info":
        return <InfoCircle size="32" variant="Bulk" color={iconColor} />;
      case "warning":
      case "error":
        return <Warning2 size="32" variant="Bulk" color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <CustomStyledAlert
        className={animate ? "show" : ""}
        onClose={handleClose}
        severity={severity}
        icon={renderIcon()}
        sx={{ width: "100%", fontSize: "B1" }}>
        {message}
      </CustomStyledAlert>
    </Snackbar>
  );
};

export default CustomAlert;
