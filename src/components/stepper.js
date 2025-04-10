import React from "react";

export default function Stepper({ currentStep, numberOfSteps, labels }) {
  const getOuterCircleStyle = (index) => {
    if (currentStep > index) {
      return "bg-custom-blue-500";
    } else if (currentStep === index) {
      return "border-4 border-custom-blue-500 bg-custom-blue-50";
    } else {
      return "border-4 border-custom-neutral-200 bg-transparent";
    }
  };

  const getInnerCircleStyle = (index) => {
    if (currentStep > index) {
      return "bg-custom-blue-500 text-custom-blue-50 text-B1 items-center";
    } else if (currentStep === index) {
      return "bg-custom-blue-500 text-custom-blue-50";
    } else {
      return "bg-custom-neutral-200 text-custom-blue-50 text-B1 items-center";
    }
  };

  const isFinalStep = (index) => index === numberOfSteps - 1;

  return (
    <div className="flex justify-center items-start">
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <React.Fragment key={index}>
          {/* Container for circle and text */}
          <div className="flex flex-col items-center">
            {/* Outer circle styling based on the step status */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${getOuterCircleStyle(
                index
              )}`}>
              {/* Inner circle with number inside */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${getInnerCircleStyle(
                  index
                )}`}>
                {index + 1}
              </div>
            </div>
            {/* Outer div for label with fixed size */}
            <div className="mt-2 w-40 h-auto flex justify-center items-center">
              <div className="text-gray-500 text-center">
                {labels[index] || `Step ${index + 1}`}
              </div>
            </div>
          </div>

          {/* Line between circles (active when circle is active) */}
          {!isFinalStep(index) && (
            <div
              className={`h-1 w-full max-w-[242px] rounded-full ${
                currentStep > index
                  ? "bg-custom-blue-500"
                  : "bg-custom-neutral-200"
              } mt-5`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
