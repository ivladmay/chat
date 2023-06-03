import React, { createContext, useContext } from 'react';

const WordFilterContext = createContext({});

const WordFilterProvider = ({ filter, children }) => (
  <WordFilterContext.Provider value={filter}>
    {children}
  </WordFilterContext.Provider>
);

const useWordFilter = () => useContext(WordFilterContext);

export { useWordFilter };
export default WordFilterProvider;
