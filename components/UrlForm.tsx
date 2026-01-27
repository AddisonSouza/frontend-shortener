
import React, { useState } from 'react';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { isValidUrl } from '../utils/validators';

interface UrlFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const UrlForm: React.FC<UrlFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError('Please enter a URL.');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL.');
      return;
    }

    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError(null);
          }}
          placeholder="https://your-long-url.com/goes-here"
          disabled={isLoading}
          aria-label="URL to shorten"
        />
        <Button type="submit" disabled={isLoading} className="sm:w-40">
          {isLoading ? 'Shortening...' : 'Shorten'}
        </Button>
      </div>
      {error && <p className="text-red-400 text-sm text-left mt-1">{error}</p>}
    </form>
  );
};
