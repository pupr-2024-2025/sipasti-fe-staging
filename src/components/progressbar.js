import React from "react";

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { label: "Informasi Umum" },
    { label: "Identifikasi Kebutuhan" },
    { label: "Penentuan Shortlist Vendor" },
    { label: "Perancangan Kuesioner" },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 flex items-center">
          {/* Circle */}
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              index + 1 === currentStep
                ? "bg-custom-blue-600 text-white"
                : "border-2 border-neutral-300 text-neutral-400"
            }`}>
            <span>{index + 1}</span>
          </div>

          {/* Line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 ${
                index + 1 < currentStep ? "bg-blue-600" : "bg-neutral-300"
              }`}
            />
          )}

          {/* Label */}
          <div className="mt-2 text-center text-neutral-400 text-xs">
            <p
              className={`${
                index + 1 === currentStep ? "text-blue-600 font-bold" : ""
              }`}>
              {step.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
