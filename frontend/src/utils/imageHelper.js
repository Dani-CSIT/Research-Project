/**
 * Helper function to get the full image URL
 * @param {string} imageUrl - The image URL from the database
 * @returns {string} - The full image URL
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return 'https://via.placeholder.com/300x300';
  }
  
  // If it's a local upload (starts with /uploads/), prepend the backend URL
  // Normalize missing leading slash (handle both '/uploads/...' and 'uploads/...')
  const normalized = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  if (normalized.startsWith('/uploads/')) {
    // Prefer explicit env var; fallback to localhost:5000 constructed from window
    const backendUrl = process.env.REACT_APP_API_URL || (typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.hostname}:5000`
      : 'http://localhost:5000');
    return `${backendUrl}${normalized}`;
  }
  
  // Otherwise, return as is (external URL)
  return imageUrl;
};

/**
 * Get product image URL with fallback
 * @param {object} product - The product object
 * @param {number} index - The image index (default 0)
 * @returns {string} - The image URL
 */
export const getProductImageUrl = (product, index = 0) => {
  const imageUrl = product?.images?.[index]?.url || product?.images?.[index] || product?.image;
  return getImageUrl(imageUrl);
};
