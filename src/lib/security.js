/**
 * Sanitizes a URL to ensure it is safe to be used in href attributes.
 * Prevents javascript: and data: payload injections.
 * 
 * @param {string} url - The URL to sanitize.
 * @returns {string} - The sanitized URL, or "#" if invalid.
 */
export const sanitizeUrl = (url) => {
  if (!url) return "#";
  try {
    const parsedUrl = new URL(url, window.location.origin);
    if (["http:", "https:", "mailto:", "tel:"].includes(parsedUrl.protocol)) {
      return parsedUrl.href;
    }
  } catch (e) {
    // If URL parsing fails, we fallback to string matching
    const trimmed = url.trim().toLowerCase();
    if (
      trimmed.startsWith('http://') || 
      trimmed.startsWith('https://') || 
      trimmed.startsWith('mailto:') ||
      trimmed.startsWith('tel:') ||
      trimmed.startsWith('/')
    ) {
      return url.trim();
    }
  }
  return "#";
};
