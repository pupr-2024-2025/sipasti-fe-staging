import React, { useState } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { styled } from "@mui/system";

// Styling kustom untuk TextField
const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
  },
  "& .MuiInputBase-input": {
    color: "#333",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ccc",
  },
});

const Datepicker = ({ label, value, onChange, error, helperText }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            fullWidth
            variant="outlined"
            error={error}
            helperText={helperText}
            InputProps={{ ...params.InputProps }}
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
    <div style={{ width: "300px", margin: "0 auto", paddingTop: "50px" }}>
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
