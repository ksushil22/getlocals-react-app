import {PUBLIC_BUSINESS_API} from "../../redux/api_url";
import {useLocation} from "react-router-dom";
import { getImageUrl as getImageUrlFromUtils } from "../../utils/imageUtils";

export const MainHeadingStyle= {
    fontWeight: 'bolder',
    fontSize: '2.5em',
    paddingLeft: '30px',
    color: '#605f5f',
    margin: 0
}

export function formatPhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber?.replace(/\D/g, '');

    // Extract area code, first three digits, and last four digits
    const areaCode = phoneNumber?.slice(0, 3);
    const firstPart = phoneNumber?.slice(3, 6);
    const secondPart = phoneNumber?.slice(6);

    // Format and return the phone number
    return `(${areaCode}) ${firstPart}-${secondPart}`;
}

export function getMapUrl(address) {
    const formattedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
}

// Re-export from imageUtils for backward compatibility
export const getImageUrl = getImageUrlFromUtils;

export function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const sectionHeight = section.getBoundingClientRect().height;
        const viewportHeight = window.innerHeight;

        if (sectionHeight < viewportHeight) {
            // Center the section
            const offset = (viewportHeight - sectionHeight) / 2;
            window.scrollTo({
                top: section.offsetTop - offset,
                behavior: 'smooth'
            });
        } else {
            // Leave 70px from the top
            window.scrollTo({
                top: section.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    }
}

export function calculateTax(total) {
    return 0.13 * total; // keep as number
}

export function calculatePlatformFee(total) {
    return 0.05 * total; // keep as number
}

/**
 * Rounds a number to 2 decimals.
 * @param {number} num - the number to round
 * @param {boolean} asString - if true, returns "12.00" style string
 * @returns {number|string} rounded number
 */
export function roundTo2(num, asString = false) {
    const rounded = Math.round(num * 100) / 100; // keeps it numeric
    return asString ? rounded.toFixed(2) : rounded;
}
