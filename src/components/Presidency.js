// Presidency.js
import React, { useState, useEffect, useContext } from "react";
import CustomSlider from "./CustomSlider";
import { candidates } from "../data";
import { AppContext } from "../context";

const Presidency = () => {
  const { state, dispatch } = useContext(AppContext);
  const { candidatesData } = state;

  const [lastMovedSlider, setLastMovedSlider] = useState(null);

  useEffect(() => {
    const totalPercentage = Object.values(candidatesData).reduce(
      (sum, percentage) => sum + (percentage ?? 0),
      0
    );

    if (totalPercentage > 100 && lastMovedSlider != null) {
      dispatch({
        type: "SET_CANDIDATES_DATA",
        payload: {
          ...candidatesData,
          [lastMovedSlider]: parseFloat(
            (candidatesData[lastMovedSlider] - (totalPercentage - 100)).toFixed(
              2
            )
          ),
        },
      });
    }
  }, [candidatesData, lastMovedSlider, dispatch]);

  const handleSliderChange = (id, value) => {
    dispatch({
      type: "SET_CANDIDATES_DATA",
      payload: {
        ...candidatesData,
        [id]: parseFloat(value.toFixed(2)),
      },
    });
    setLastMovedSlider(id);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-20">
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className="flex flex-col items-center justify-center space-y-4 "
        >
          <img
            src={candidate.imageUrl}
            alt={candidate.name}
            className="w-32 h-80 object-cover"
          />
          <div className="text-center">
            <h2 className="text-xl font-bold">{candidate.name}</h2>
          </div>

          <div className="relative">
            <span className="absolute top-0 md:top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md md:text-2xl font-bold">
              %{candidatesData[candidate.id]?.toFixed(2) ?? "0.00"}
            </span>
            <CustomSlider
              min={0}
              max={100}
              step={0.01}
              value={candidatesData[candidate.id] ?? 0}
              onChange={(value) => handleSliderChange(candidate.id, value)}
              disabled={candidate.withdrawn}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Presidency;
