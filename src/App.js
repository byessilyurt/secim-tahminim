import React, { useState } from "react";
import Presidency from "./components/Presidency";
import Parties from "./components/Parties";
import Country from "./components/Country"; // Make sure you've created and imported the Country component
import Share from "./components/Share";

const App = () => {
  const [currentSection, setCurrentSection] = useState("presidency");
  const [candidatesData, setCandidatesData] = useState({});
  const [partiesData, setPartiesData] = useState({});
  const [countryData, setCountryData] = useState({});

  const handleButtonClick = () => {
    switch (currentSection) {
      case "presidency":
        setCurrentSection("country");
        break;
      default:
        break;
    }
  };

  const handleBackButtonClick = () => {
    switch (currentSection) {
      case "country":
        setCurrentSection("presidency");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div
        className={`h-auto ${currentSection !== "presidency" ? "hidden" : ""}`}
      >
        <Presidency
          candidatesData={candidatesData}
          setCandidatesData={setCandidatesData}
        />
      </div>
      <div className={`h-auto ${currentSection !== "country" ? "hidden" : ""}`}>
        <Country
          countriesData={countryData}
          setCountriesData={setCountryData}
        />
      </div>

      <div className="mt-4 flex">
        {currentSection !== "presidency" && (
          <button onClick={handleBackButtonClick} className="mr-2">
            Back
          </button>
        )}
        {currentSection !== "country" && (
          <button
            onClick={handleButtonClick}
            className="fixed bottom-0 w-full py-4 text-xl text-teal-800 font-bold border-2 border-solid border-teal-500 bg-slate-100 bg-opacity-70 md:bg-opacity-0 "
          >
            Devam Et
          </button>
        )}
        {currentSection === "country" && <Share />}
      </div>
    </div>
  );
};

export default App;
