
import React from 'react';
import { UrlForm } from '../components/UrlForm';
import { ResultCard } from '../components/ResultCard';
import { Spinner } from '../components/common/Spinner';
import { Message } from '../components/common/Message';
import { useShortenUrl } from '../hooks/useShortenUrl';

export const HomePage: React.FC = () => {
  const { data, error, successMessage, isLoading, shortenUrl } = useShortenUrl();

  return (
    <div className="w-full max-w-2xl text-center">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
        Shorten Your Links
      </h2>
      <p className="text-lg text-slate-400 mb-8">
        Create clean, memorable links in seconds. Paste your long URL below to get started.
      </p>
      
      <div className="bg-slate-800 p-6 rounded-lg shadow-2xl">
        <UrlForm onSubmit={shortenUrl} isLoading={isLoading} />
      </div>

      <div className="mt-8 min-h-[100px] flex flex-col items-center justify-center gap-4">
        {isLoading && <Spinner />}
        {error && <Message message={error} type="error" />}
        {successMessage && data && <Message message={successMessage} type="success" />}
        {data && <ResultCard shortUrl={data.shortUrl} />}
      </div>
    </div>
  );
};
