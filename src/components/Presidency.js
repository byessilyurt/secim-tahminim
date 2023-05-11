// Presidency.js
import React, { useState, useEffect } from "react";
import CustomSlider from "./CustomSlider";
import { candidates } from "../data";

const Presidency = ({ candidatesData, setCandidatesData }) => {
  const [percentages, setPercentages] = useState(
    Object.keys(candidatesData).length > 0
      ? candidatesData
      : candidates.reduce((acc, candidate) => {
          acc[candidate.id] = candidate.withdrawn ? null : 0;
          return acc;
        }, {})
  );

  const [lastMovedSlider, setLastMovedSlider] = useState(null);

  useEffect(() => {
    const totalPercentage = Object.values(percentages).reduce(
      (sum, percentage) => sum + (percentage ?? 0),
      0
    );

    if (totalPercentage > 100 && lastMovedSlider != null) {
      setPercentages((prevPercentages) => ({
        ...prevPercentages,
        [lastMovedSlider]: parseFloat(
          (prevPercentages[lastMovedSlider] - (totalPercentage - 100)).toFixed(
            2
          )
        ),
      }));
    }
  }, [percentages, lastMovedSlider]);

  const handleSliderChange = (id, value) => {
    setPercentages({
      ...percentages,
      [id]: parseFloat(value.toFixed(2)),
    });
    setLastMovedSlider(id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
          <div className="relative">
            <span className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
              %{percentages[candidate.id]?.toFixed(2) ?? "--"}
            </span>
            <CustomSlider
              min={0}
              max={100}
              step={0.01}
              value={percentages[candidate.id] ?? 0}
              onChange={(value) => handleSliderChange(candidate.id, value)}
              className="w-64"
              disabled={candidate.withdrawn}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Presidency;
