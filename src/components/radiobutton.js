import React, { useState } from "react";

const RadioButton = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
    </div>
  );
};

export default RadioButton;
