// CountrySection.js
import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { colorMap, candidates } from "../data";
import turkeySvg from "../images/country/turkey.svg";

const CountrySection = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [cityColors, setCityColors] = useState({});
  const [mouseDown, setMouseDown] = useState(false);

  const handleCityClick = (cityId) => {
    setCityColors({
      ...cityColors,
      [cityId]: selectedColor,
    });
  };

  const handleCityMouseEnter = (cityId) => {
    if (mouseDown) {
      handleCityClick(cityId);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-white px-4 sm:px-0"
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
    >
      <ReactSVG
        src={turkeySvg}
        beforeInjection={(svg) => {
          svg.classList.add(
            "w-full",
            "md:w-3/4",
            "lg:w-1/2",
            "xl:w-2/3",
            "2xl:max-w-screen-lg",
            "mx-auto"
          );
          Array.from(svg.querySelectorAll("path")).forEach((path) => {
            const cityId = path.getAttribute("id");
            path.style.fill = cityColors[cityId] || "lightgray";
            path.addEventListener("click", () => handleCityClick(cityId));
            path.addEventListener("mouseenter", () =>
              handleCityMouseEnter(cityId)
            );
          });
        }}
        renumerateIRIElements={false}
        wrapper="span"
      />

      <div className="flex justify-center mt-5 space-x-2 sm:space-x-4">
        {candidates.map((candidate) => (
          <button
            key={candidate.id}
            style={{ backgroundColor: colorMap[candidate.id] }}
            onClick={() => setSelectedColor(colorMap[candidate.id])}
            disabled={candidate.withdrawn}
            className={`w-24 sm:w-48 h-12 sm:h-24 flex items-center justify-center ${
              candidate.withdrawn ? "" : "cursor-pointer"
            }`}
          >
            <img
              src={candidate.imageUrl}
              alt={candidate.name}
              className="w-12 sm:w-36 h-16 sm:h-36 rounded-full border-3 border-white object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountrySection;
