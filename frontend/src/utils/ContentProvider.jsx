import React, { createContext, useContext, useState } from 'react';
import Home from '../pages/Home';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [state, setState] = useState({
        name: 'home',
        content: <Home />,
    });

    const setContent = (name, content) => {
        setState({ name, content });
    };

    return (
        <ContentContext.Provider value={{ state, setContent, userId, setUserId }}>
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