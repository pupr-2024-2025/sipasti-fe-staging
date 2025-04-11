import React, { createContext, useContext, useState, ReactNode } from "react";
import CustomAlert from "@/components/ui/alert";

type SeverityType = "success" | "info" | "warning" | "error";

interface AlertContextType {
  showAlert: (message: string, severity?: SeverityType) => void;
}

export const AlertContext = createContext<AlertContextType>({
  showAlert: () => {},
});

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SeverityType>("info");
  const [open, setOpen] = useState(false);

  const showAlert = (msg: string, sev: SeverityType = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <CustomAlert
        message={message}
        severity={severity}
        openInitially={open}
        onClose={handleClose}
      />
    </AlertContext.Provider>
  );
};
