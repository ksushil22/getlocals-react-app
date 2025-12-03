/**
 * Safe sessionStorage utilities for Next.js SSR compatibility
 * These functions only access sessionStorage on the client side
 */

/**
 * Safely get item from sessionStorage (client-side only)
 * @param {string} key - Storage key
 * @returns {string|null} - Stored value or null
 */
export const getSessionStorage = (key) => {
    if (typeof window === 'undefined') {
        return null;
    }
    try {
        return sessionStorage.getItem(key);
    } catch (error) {
        console.error(`Error getting sessionStorage key "${key}":`, error);
        return null;
    }
};

/**
 * Safely set item in sessionStorage (client-side only)
 * @param {string} key - Storage key
 * @param {string} value - Value to store
 */
export const setSessionStorage = (key, value) => {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        sessionStorage.setItem(key, value);
    } catch (error) {
        console.error(`Error setting sessionStorage key "${key}":`, error);
    }
};

/**
 * Safely remove item from sessionStorage (client-side only)
 * @param {string} key - Storage key
 */
export const removeSessionStorage = (key) => {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing sessionStorage key "${key}":`, error);
    }
};

/**
 * Safely get item from localStorage (client-side only)
 * @param {string} key - Storage key
 * @returns {string|null} - Stored value or null
 */
export const getLocalStorage = (key) => {
    if (typeof window === 'undefined') {
        return null;
    }
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error(`Error getting localStorage key "${key}":`, error);
        return null;
    }
};

/**
 * Safely set item in localStorage (client-side only)
 * @param {string} key - Storage key
 * @param {string} value - Value to store
 */
export const setLocalStorage = (key, value) => {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
    }
};

/**
 * Safely remove item from localStorage (client-side only)
 * @param {string} key - Storage key
 */
export const removeLocalStorage = (key) => {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
    }
};

/**
 * Check if we're on the client side
 * @returns {boolean}
 */
export const isClient = () => typeof window !== 'undefined';

