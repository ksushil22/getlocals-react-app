import React from "react";
import { createContext, useContext } from 'react';
import useSSE from '../hooks/useSSE';

const SSEContext = createContext();

export const SSEProvider = ({ children }) => {
    console.log(process.env);
    const sse = useSSE(`${process.env.BASE_API_URL}order/stream/`);

    return (
        <SSEContext.Provider value={sse}>
            {children}
        </SSEContext.Provider>
    );
};

export const useSSEContext = () => useContext(SSEContext);
