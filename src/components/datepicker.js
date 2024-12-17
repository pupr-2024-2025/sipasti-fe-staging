import React, { useState } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

const Datepicker = ({
  label = "Pilih Tanggal",
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        inputFormat="YYYY/MM/DD" // Format eksplisit
        renderInput={(params) => (
          <TextField
            {...params}
            className="bg-surface-light-background text-emphasis-on_surface-high rounded-lg border-surface-light-outline focus:ring-2 focus:ring-solid-blue"
            fullWidth
            variant="outlined"
            error={error}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              className:
                "bg-surface-light-background text-emphasis-on_surface-medium",
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

const App = () => {
  const [date, setDate] = useState(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleDateChange = (newDate) => {
    if (!newDate) {
      setError(true);
      setHelperText("Tanggal harus diisi");
    } else {
      setError(false);
      setHelperText("");
    }
    setDate(newDate);
  };

  return (
    <div>
      {/* Datepicker */}
      <Datepicker
        label="Pilih Tanggal"
        value={date}
        onChange={handleDateChange}
        error={error}
        helperText={helperText}
      />
    </div>
  );
};

export default App;
