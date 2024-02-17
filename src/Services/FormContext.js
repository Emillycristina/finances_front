import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [manualData, setManualData] = useState([]);
  
  const handleAddRow = (newRow) => {
    setManualData((prevData) => [...prevData, newRow]);
  };

  return (
    <FormContext.Provider value={{ onAddRow: handleAddRow, manualData }}>
      {children}
    </FormContext.Provider>
  );
};
