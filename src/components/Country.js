// CountrySection.js
import React, { useState, useContext, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { FaGithub } from "react-icons/fa";
import { colorMap, candidates } from "../data";
import turkeySvg from "../images/country/turkey.svg";
import { AppContext } from "../context";

const CountrySection = () => {
  const { state, dispatch } = useContext(AppContext);
  const { countryData } = state;

  const [selectedColor, setSelectedColor] = useState(null);
  const [cityColors, setCityColors] = useState(countryData);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    dispatch({
      type: "SET_COUNTRY_DATA",
      payload: cityColors,
    });
  }, [cityColors, dispatch]);

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
      className="flex flex-col items-center justify-start min-h-screen bg-white px-4 sm:px-0"
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onTouchStart={() => setMouseDown(true)}
      onTouchEnd={() => setMouseDown(false)}
    >
      <div className="fixed top-1 left-0 text-sm sm:text-base font-medium mt-4 ml-4 flex items-center">
        <FaGithub className="mr-2" />
        <a
          className="opacity-50"
          href="https://github.com/byessilyurt"
          target="_noblank"
        >
          @byessilyurt
        </a>
      </div>
      <h1 className="fixed top-0 text-xl sm:text-4xl font-medium mt-4 ">
        Türkiye Seçim Haritası 🇹🇷
      </h1>

      <ReactSVG
        src={turkeySvg}
        // Inside the beforeInjection function
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
            path.addEventListener(
              "pointerdown",
              (event) => {
                event.preventDefault();
                handleCityClick(cityId);
              },
              { passive: false }
            );
            path.addEventListener(
              "pointermove",
              (event) => {
                if (event.buttons === 1) {
                  event.preventDefault();
                  handleCityClick(cityId);
                }
              },
              { passive: false }
            );
          });
        }}
        renumerateIRIElements={false}
        wrapper="span"
      />

      <div className="flex justify-center mt-3 space-x-2 sm:space-x-4">
        {candidates.map((candidate) => {
          const candidatePercentage = state.candidatesData[candidate.id];
          return (
            <div className="flex flex-col items-center" key={candidate.id}>
              <button
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
              <div className="mt-10 font-medium text-xl text-center">
                <p>{candidate.name}</p>
                <p>
                  {candidatePercentage
                    ? `${candidatePercentage.toFixed(2)}%`
                    : "--"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountrySection;
