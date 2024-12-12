import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import QuestionMark from "../../public/images/question_mark.svg";

const Tooltip = ({ children, text, showIcon = false }) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef();
  const targetRef = useRef();

  const showTooltip = () => {
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (visible && tooltipRef.current && targetRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();
      const spaceAbove = targetRect.top;
      const spaceBelow = window.innerHeight - targetRect.bottom;
    }
  }, [visible]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      ref={targetRef}>
      {children}
      {visible && (
        <div>
          <div
            ref={tooltipRef}
            className="absolute z-10 p-3 bg-emphasis-on_surface-high text-emphasis-on_color-high text-Caption rounded-[16px] shadow-lg transition-opacity duration-200"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              opacity: visible ? 1 : 0,
              minWidth: "200px",
            }}>
            {showIcon && (
              <div className="flex items-center">
                <Image
                  src={QuestionMark}
                  alt="Help"
                  width={16}
                  height={16}
                  className="mr-1"
                />
                <span>{text}</span>
              </div>
            )}
            {!showIcon && <span>{text}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
