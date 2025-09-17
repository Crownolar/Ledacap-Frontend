import { createContext, useContext, useState } from "react";

const SampleContext = createContext();

export function SampleProvider({ children }) {
  const [samples, setSamples] = useState([]);

  const addSample = (sample) => {
    setSamples((prev) => [...prev, { id: Date.now(), ...sample }]);
  };

  const getSampleById = (id) => {
    return samples.find((s) => String(s.id) === String(id));
  };

  return (
    <SampleContext.Provider value={{ samples, addSample, getSampleById }}>
      {children}
    </SampleContext.Provider>
  );
}

export function useSamples() {
  return useContext(SampleContext);
}
