// CustomSlider.js
import React from "react";

const CustomSlider = ({ min, max, step, value, onChange, disabled }) => {
  const handleChange = (event) => {
    onChange(parseFloat(event.target.value));
  };

  return (
    <div className="w-full relative my-4 sm:my-0">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="slider w-40 h-1.5 bg-gray-200 bg-opacity-30 rounded-full outline-none appearance-none cursor-pointer"
        disabled={disabled}
      />
      <div
        className="absolute top-3 left-0 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  );
};

export default CustomSlider;
