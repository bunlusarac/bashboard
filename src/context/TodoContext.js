import React, { createContext, useContext, useReducer } from "react";

export const AppContext = createContext();

//Wrapper for provider of TodoLayerContext
export const AppLayer = ({ initialState, reducer, children }) => {
    return(
        <AppContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </AppContext.Provider>
    );
}

//Method for consuming provider from wrapper above
export const useAppLayerValue = () => useContext(AppContext);