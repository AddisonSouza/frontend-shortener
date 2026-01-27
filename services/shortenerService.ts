
import { ShortenerResponse } from '../types';

/**
 * Simulates a call to a backend API to shorten a URL.
 * @param originalUrl The long URL to be shortened.
 * @returns A promise that resolves with the shortened URL data or rejects with an error.
 */
export const shortenUrl = (originalUrl: string): Promise<ShortenerResponse> => {
  return new Promise((resolve, reject) => {
    // Simulate network latency of 1.5 seconds
    setTimeout(() => {
      // Simulate a random API failure to demonstrate error handling (20% chance of failure)
      if (Math.random() < 0.2) {
        reject(new Error('API Error: Could not process the request. Please try again.'));
        return;
      }

      // On success, generate a random short ID and construct the short URL
      const shortId = Math.random().toString(36).substring(2, 8);
      resolve({ shortUrl: `https://shrt.li/${shortId}` });
    }, 1500);
  });
};
