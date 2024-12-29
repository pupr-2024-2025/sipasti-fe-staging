import React, { useState, useEffect } from "react";

const RadioButton = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Initialize the radioState for managing form data
  const [radioState, setRadioState] = useState({
    active: false,
    inactive: false,
    disabled: false,
  });

  useEffect(() => {
    // If selectedOption changes, update radioState accordingly
    setRadioState((prevState) => ({
      ...prevState,
      active: selectedOption === "active",
      inactive: selectedOption === "inactive",
      disabled: selectedOption === "disabled",
    }));
  }, [selectedOption]);

  return (
    <div className="radio-buttons">
      <div className="radio-option">
        <input
          type="radio"
          id="active"
          name="status"
          value="active"
          checked={selectedOption === "active"}
          onChange={handleChange}
        />
        <label
          htmlFor="active"
          className={selectedOption === "active" ? "active" : ""}>
          Active
        </label>
      </div>

      <div className="radio-option">
        <input
          type="radio"
          id="inactive"
          name="status"
          value="inactive"
          checked={selectedOption === "inactive"}
          onChange={handleChange}
        />
        <label
          htmlFor="inactive"
          className={selectedOption === "inactive" ? "inactive" : ""}>
          Inactive
        </label>
      </div>

      <div className="radio-option">
        <input
          type="radio"
          id="disabled"
          name="status"
          value="disabled"
          checked={selectedOption === "disabled"}
          onChange={handleChange}
          disabled
        />
        <label htmlFor="disabled" className="disabled">
          Disabled
        </label>
      </div>

      <div className="selected-option">
        <p>Selected Option: {selectedOption || "None"}</p>
      </div>

      {/* Optional: Display radioState for debugging */}
      <div className="radio-state">
        <p>Radio State: {JSON.stringify(radioState)}</p>
      </div>
    </div>
  );
};

export default RadioButton;
