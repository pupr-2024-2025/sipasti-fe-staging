import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import { TickSquare, InfoCircle, Warning2, CloseCircle } from "iconsax-react";
import colors from "../styles/colors";

const CustomStyledAlert = styled(Alert)(({ severity }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "1rem",
  fontFamily: "var(--font-poppins-r)",
  borderRadius: "12px",
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
}));

const CustomAlert = ({
  message,
  severity = "info",
  openInitially = false,
  onClose,
}) => {
  const [open, setOpen] = useState(openInitially);
  useEffect(() => {
    setOpen(openInitially);
  }, [openInitially]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
        return null;
    }
  })();

  const renderIcon = () => {
    switch (severity) {
      case "success":
        return <TickSquare size="32" variant="Bulk" color={iconColor} />;
      case "info":
        return <InfoCircle size="32" variant="Bulk" color={iconColor} />;
      case "warning":
        return <Warning2 size="32" variant="Bulk" color={iconColor} />;
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
