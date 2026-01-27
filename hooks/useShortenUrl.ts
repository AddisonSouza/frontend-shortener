
import { useState, useCallback } from 'react';
import { shortenUrl as shortenUrlService } from '../services/shortenerService';
import type { ShortenerResponse } from '../types';

export const useShortenUrl = () => {
  const [data, setData] = useState<ShortenerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const shortenUrl = useCallback(async (originalUrl: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await shortenUrlService(originalUrl);
      setData(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, shortenUrl };
};
