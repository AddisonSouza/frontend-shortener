
import { ShortenerResponse, ApiResponse } from '../types';

const API_URL = import.meta.env.API_URL;
const API_KEY = import.meta.env.API_KEY;

/**
 * Calls the backend API to shorten a URL.
 * @param originalUrl The long URL to be shortened.
 * @returns A promise that resolves with the shortened URL data or rejects with an error.
 */
export const shortenUrl = async (originalUrl: string): Promise<ShortenerResponse> => {
  console.log('API_URL:', API_URL);
  if (!API_URL) {
    throw new Error('API configuration missing');
  }

  try {
     console.log('Sending request to shorten URL:', originalUrl);
     console.log('Sending request to API_URL:', API_URL);
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${API_KEY}`,
      },
      body: JSON.stringify({ originalUrl: originalUrl }),
    });

    const data: ApiResponse = await response.json();
    console.log('📦 Backend response data:', data);
    
    // Handle API response structure
    if (!response.ok) {
      // If HTTP status is not ok, throw with backend message
      throw new Error(data.message || `API Error: ${response.status} ${response.statusText}`);
    }
    
    if (!data.success) {
      // If backend indicates failure
      throw new Error(data.message || 'Failed to shorten URL');
    }
    
    const result = { 
      shortUrl: data.data 
    };
    console.log('🔄 Mapped result:', result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to shorten URL. Please check your connection and try again.');
  }
};
