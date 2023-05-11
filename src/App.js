import React, { useState } from "react";
import Presidency from "./components/Presidency";
import Country from "./components/Country"; // Make sure you've created and imported the Country component
import Share from "./components/Share";
import ShareModal from "./components/ShareModal";

import { TbArrowBackUp } from "react-icons/tb";

const App = () => {
  const [currentSection, setCurrentSection] = useState("presidency");
  const [candidatesData, setCandidatesData] = useState({});
  const [partiesData, setPartiesData] = useState({});
  const [countryData, setCountryData] = useState({});
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleModalCloseRequest = () => {
    setIsShareModalOpen(false);
  };

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

      <div className="fixed bottom-0 left-0 flex items-center gap-x-0 mb-1 w-full">
        {currentSection !== "presidency" && (
          <div className="w-1/3 h-6 flex items-center justify-center py-6 text-2xl text-teal-800 border-2 border-solid border-teal-500 bg-slate-100 bg-opacity-70 md:bg-opacity-0 border-r-0 ">
            <button
              onClick={handleBackButtonClick}
              className="w-full flex justify-center items-center "
            >
              <TbArrowBackUp />
            </button>
          </div>
        )}
        {currentSection !== "country" && (
          <div className="w-full h-6 flex items-center justify-center py-6 text-2xl text-teal-800 font-medium border-2 border-solid border-teal-500 bg-slate-100 bg-opacity-70 md:bg-opacity-0">
            <button onClick={handleButtonClick} className="w-full">
              Devam Et
            </button>
          </div>
        )}
        {currentSection === "country" && (
          <div className="w-2/3 h-6 py-6 text-xl text-teal-800 font-medium border-2 border-solid border-teal-500 bg-slate-100 bg-opacity-70 md:bg-opacity-0 flex items-center justify-center">
            <button onClick={handleShareClick} className="w-full">
              <Share />
            </button>
            <ShareModal
              isOpen={isShareModalOpen}
              onRequestClose={handleModalCloseRequest}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
