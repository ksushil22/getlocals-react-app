'use client';

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import {useSelector} from "react-redux";
import { getSessionStorage } from "../../lib/utils/storage.js";
import { message } from "antd";

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [newOrder, setNewOrder] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    const socketRef = useRef(null);
    const reconnectTimeout = useRef(null);
    const reconnectAttempts = useRef(0);
    const isManualDisconnect = useRef(false);

    // Safe sessionStorage access - only on client side
    const token = getSessionStorage("access"); // JWT token
    const WS_URL = process.env.NEXT_PUBLIC_WS_URL || '';

    const businessId = useSelector((state) => state.business.businessId);

    // Play pleasant chime notification for new orders
    const playOrderSound = useCallback(() => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Pleasant chime frequencies (a major chord: C, E, G in higher octave)
            const chimeNotes = [
                { freq: 523.25, time: 0, duration: 0.3 },      // C5
                { freq: 659.25, time: 0.08, duration: 0.35 },  // E5
                { freq: 783.99, time: 0.16, duration: 0.4 }    // G5
            ];
            
            chimeNotes.forEach(note => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = note.freq;
                oscillator.type = 'sine'; // Sine wave for a pure, pleasant tone
                
                // Envelope: quick attack, gentle decay
                const startTime = audioContext.currentTime + note.time;
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.02); // Quick attack
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);
                
                oscillator.start(startTime);
                oscillator.stop(startTime + note.duration);
            });
        } catch (err) {
            console.warn('Could not play notification chime:', err);
        }
    }, []);

    const connect = useCallback(() => {
        // Don't connect without token or businessId
        if (!token) {
            console.log("No Token; returning...");
            return;
        }
        
        if (!businessId) {
            console.log("No businessId; waiting for it to load...");
            return;
        }
        
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) return;

        isManualDisconnect.current = false;
        const wsUrl = `${WS_URL}/orders?token=${token}&businessId=${businessId}`;
        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("✅ WebSocket connected");
            setIsConnected(true);
            setError(null);
            reconnectAttempts.current = 0;
            
            // Show success message only on reconnection
            if (reconnectAttempts.current > 0) {
                message.success('Connection restored!');
            }
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                
                // Backend handles heartbeat, we just receive order updates
                if (data.type === 'heartbeat' || data.type === 'pong') {
                    // Ignore heartbeat messages from backend
                    return;
                }
                
                // Handle new order or order update
                setNewOrder(data);
                console.log("🔔 New Order/Update:", data);
                
                // Play notification sound
                playOrderSound();
                
                // Show notification
                message.info({
                    content: `New order received: ${data.orderNumber}`,
                    duration: 5,
                    style: { marginTop: '60px' }
                });
            } catch (err) {
                console.log(err);
                console.warn("Invalid WebSocket message:", event.data);
            }
        };

        socket.onerror = (err) => {
            console.error("❌ WebSocket error:", err);
            setError("WebSocket error occurred");
        };

        socket.onclose = (event) => {
            console.log("⚠️ WebSocket closed", event.code, event.reason);
            setIsConnected(false);
            
            // Only attempt reconnect if not manual disconnect
            if (!isManualDisconnect.current) {
                message.warning('Connection lost. Attempting to reconnect...');
                handleReconnect();
            }
        };
    }, [token, WS_URL, businessId, playOrderSound]);

    const disconnect = useCallback(() => {
        isManualDisconnect.current = true;
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
        setIsConnected(false);
        clearTimeout(reconnectTimeout.current);
    }, []);

    const handleReconnect = useCallback(() => {
        const maxAttempts = 10; // Increased from 2
        if (reconnectAttempts.current < maxAttempts) {
            // Exponential backoff: 1s, 2s, 4s, 8s, 16s, 30s max
            const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
            console.log(`🔄 Reconnecting in ${delay}ms (attempt ${reconnectAttempts.current + 1}/${maxAttempts})`);
            
            reconnectTimeout.current = setTimeout(() => {
                reconnectAttempts.current += 1;
                connect();
            }, delay);
        } else {
            const errorMsg = "Failed to reconnect to WebSocket after multiple attempts.";
            setError(errorMsg);
            message.error({
                content: errorMsg + ' Please refresh the page.',
                duration: 0, // Don't auto-close
            });
        }
    }, [connect]);

    useEffect(() => {
        // Only connect on client side when businessId is available
        if (typeof window !== 'undefined' && businessId) {
            connect();
            return () => {
                disconnect();
            };
        }
    }, [businessId, connect, disconnect]);

    return (
        <WebSocketContext.Provider value={{ newOrder, isConnected, error, connect, disconnect }}>
            {children}
        </WebSocketContext.Provider>
    );
};
