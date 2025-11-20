/**
 * Business Image Type Enum
 * Matches the backend BusinessImageTypeEnum
 */
export const BusinessImageTypes = {
    CAROUSEL: 'CAROUSEL',
    MENU: 'MENU',
    LOGO: 'LOGO',
    EMPLOYEE: 'EMPLOYEE',
    THUMBNAIL: 'THUMBNAIL'
};

/**
 * Check if thumbnails should be generated for a given image type
 * @param {string} imageType 
 * @returns {boolean}
 */
export const shouldGenerateThumbnail = (imageType) => {
    // Generate thumbnails for these types by default
    return [
        BusinessImageTypes.MENU,
        BusinessImageTypes.LOGO
    ].includes(imageType);
};

/**
 * Check if image type should use progressive loading
 * @param {string} imageType 
 * @returns {boolean}
 */
export const shouldUseProgressiveLoading = (imageType) => {
    // Only use progressive loading for images that benefit from thumbnails
    return [
        BusinessImageTypes.MENU,
        BusinessImageTypes.LOGO
    ].includes(imageType);
};

/**
 * Get display name for image type
 * @param {string} imageType 
 * @returns {string}
 */
export const getImageTypeDisplayName = (imageType) => {
    const displayNames = {
        [BusinessImageTypes.CAROUSEL]: 'Carousel Image',
        [BusinessImageTypes.MENU]: 'Item Image',
        [BusinessImageTypes.LOGO]: 'Business Logo',
        [BusinessImageTypes.EMPLOYEE]: 'Employee Photo',
        [BusinessImageTypes.THUMBNAIL]: 'Thumbnail'
    };
    return displayNames[imageType] || imageType;
};