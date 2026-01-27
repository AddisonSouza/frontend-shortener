
import React from 'react';
import { HomePage } from './pages/Home';
import { LinkIcon } from './components/icons/LinkIcon';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <header className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center gap-3">
          <LinkIcon className="w-8 h-8 text-indigo-400" />
          <h1 className="text-2xl font-bold tracking-tight text-white">
            QuickLink
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <HomePage />
      </main>

      <footer className="py-4 px-4 sm:px-6 lg:px-8 text-center text-slate-500">
        <p>Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;
