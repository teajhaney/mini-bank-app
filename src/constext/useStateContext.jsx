import { createContext, useContext } from "react";

// Create the context
export const StateContext = createContext();

// Custom hook to use the context
export const useStateContext = () => useContext(StateContext);
