import React, { createContext, useReducer } from "react";

export const initialState = {
  candidatesData: {},
  countryData: {},
  showTooltip: true,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_CANDIDATES_DATA":
      return { ...state, candidatesData: action.payload };
    case "SET_COUNTRY_DATA":
      return { ...state, countryData: action.payload };
    case "SHOW_TOOLTIP":
      return { ...state, showTooltip: action.payload };
    default:
      return state;
  }
}

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
