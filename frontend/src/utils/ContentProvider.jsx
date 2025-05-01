import React, { createContext, useContext, useState } from 'react';
import Home from '../pages/Home';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(<Home />);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
      throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
  };