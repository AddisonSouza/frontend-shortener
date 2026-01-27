
/**
 * Validates if a string is a well-formed URL.
 * It uses the browser's built-in URL parser for robustness.
 * @param url The string to validate.
 * @returns true if the URL is valid, false otherwise.
 */
export const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  
  // Prepend http:// if no protocol is present to help the URL parser
  let urlToTest = url;
  if (!/^(https|http|ftp):\/\//i.test(urlToTest)) {
      urlToTest = `http://${urlToTest}`;
  }

  try {
    const parsedUrl = new URL(urlToTest);
    // Check if the hostname has a domain extension (e.g., .com, .org)
    // This helps filter out invalid inputs like "http://example"
    return parsedUrl.hostname.includes('.');
  } catch (error) {
    return false;
  }
};
