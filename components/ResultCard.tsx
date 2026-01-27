
import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ResultCardProps {
  shortUrl: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ shortUrl }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // You could add user feedback here, e.g., an alert or toast message
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="w-full bg-slate-800 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
      <a 
        href={shortUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-indigo-400 font-medium truncate hover:underline"
      >
        {shortUrl}
      </a>
      <button
        onClick={handleCopy}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 w-full sm:w-auto ${
          isCopied
            ? 'bg-green-600 text-white cursor-default'
            : 'bg-indigo-600 text-white hover:bg-indigo-500'
        }`}
        disabled={isCopied}
      >
        {isCopied ? (
          <>
            <CheckIcon className="w-5 h-5" />
            Copied!
          </>
        ) : (
          <>
            <ClipboardIcon className="w-5 h-5" />
            Copy Link
          </>
        )}
      </button>
    </div>
  );
};
