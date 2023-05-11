import React, { useState } from "react";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "../custom-slider.css"; // Add this line to import the custom styles

import { candidates } from "../data";

const Presidency = () => {
  const [percentages, setPercentages] = useState(
    candidates.reduce((acc, candidate) => {
      acc[candidate.id] = 0;
      return acc;
    }, {})
  );

  const handleSliderChange = (id, value) => {
    const newPercentages = {
      ...percentages,
      [id]: parseFloat(value.toFixed(2)),
    };
    const totalPercentage = Object.values(newPercentages).reduce(
      (sum, percentage) => sum + percentage,
      0
    );

    if (totalPercentage <= 100) {
      setPercentages(newPercentages);
    }
  };

  const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value.toFixed(2)}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Slider.Handle value={value} {...restProps} />
      </Tooltip>
    );
  };
  return (
    <div className="mx-4 my-4 sm:mx-8 sm:my-8 md:mx-12 md:my-12 flex justify-center items-center gap-x-80 gap-y-8 sm:gap-48 md:gap-20 flex-wrap ">
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <img
            src={candidate.imageUrl}
            alt={candidate.name}
            className="w-32 h-80 object-cover"
          />
          <div className="flex flex-col items-center space-y-2">
            <span className="text-2xl font-bold">
              %{percentages[candidate.id].toFixed(2)}
            </span>
            <Slider
              min={0}
              max={100}
              step={0.01}
              value={percentages[candidate.id]}
              onChange={(value) => handleSliderChange(candidate.id, value)}
              handle={handle}
              className="w-64"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Presidency;
