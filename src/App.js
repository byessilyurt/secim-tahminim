import React, { useState } from "react";
import Presidency from "./components/Presidency";
import Parties from "./components/Parties";
import Country from "./components/Country"; // Make sure you've created and imported the Country component
import Share from "./components/Share";

const App = () => {
  const [currentSection, setCurrentSection] = useState("presidency");

  const handleButtonClick = () => {
    switch (currentSection) {
      case "presidency":
        setCurrentSection("parties");
        break;
      case "parties":
        setCurrentSection("country");
        break;
      default:
        break;
    }
  };

  const handleBackButtonClick = () => {
    switch (currentSection) {
      case "parties":
        setCurrentSection("presidency");
        break;
      case "country":
        setCurrentSection("parties");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {currentSection === "presidency" && <Presidency />}
      {currentSection === "parties" && <Parties />}
      {currentSection === "country" && <Country />}
      <div className="mt-4 flex">
        {currentSection !== "presidency" && (
          <button onClick={handleBackButtonClick} className="mr-2">
            Back
          </button>
        )}
        {currentSection !== "country" && (
          <button onClick={handleButtonClick}>Next</button>
        )}
        {currentSection === "country" && <Share />}
      </div>
    </div>
  );
};

export default App;
