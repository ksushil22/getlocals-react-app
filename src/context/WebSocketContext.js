import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import {useSelector} from "react-redux";

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [newOrder, setNewOrder] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    const socketRef = useRef(null);
    const reconnectTimeout = useRef(null);
    const reconnectAttempts = useRef(0);

    const token = sessionStorage.getItem("access"); // JWT token
    const WS_URL = process.env.WS_URL;

    const businessId = useSelector((state) => state.business.businessId);


    const connect = useCallback(() => {
        if (!token) {
            console.log("No Token; returning.....")
            return
        }; // don't connect without token
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) return;

        const wsUrl = `${WS_URL}/orders?token=${token}&businessId=${businessId}`;
        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("✅ WebSocket connected");
            setIsConnected(true);
            setError(null);
            reconnectAttempts.current = 0;
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setNewOrder(data);
                console.log("New Order: ", data)
            } catch (err) {
                console.log(err);
                console.warn("Invalid WebSocket message:", event.data);
            }
        };

        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
            setError("WebSocket error occurred");
        };

        socket.onclose = () => {
            console.log("⚠️ WebSocket closed");
            setIsConnected(false);
        };
    }, [token]);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
        setIsConnected(false);
        clearTimeout(reconnectTimeout.current);
    }, []);

    const handleReconnect = useCallback(() => {
        const maxAttempts = 2;
        if (reconnectAttempts.current < maxAttempts) {
            const delay = Math.min(5000 * reconnectAttempts.current, 20000);
            reconnectTimeout.current = setTimeout(() => {
                reconnectAttempts.current += 1;
                connect();
            }, delay);
        } else {
            setError("Failed to reconnect to WebSocket.");
        }
    }, [connect]);

    useEffect(() => {
        connect();
        return () => disconnect();
    }, [connect, disconnect]);

    return (
        <WebSocketContext.Provider value={{ newOrder, isConnected, error, connect, disconnect }}>
            {children}
        </WebSocketContext.Provider>
    );
};
