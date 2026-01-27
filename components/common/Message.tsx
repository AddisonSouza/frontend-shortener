import React from 'react';
import { MessageProps } from '../../types';
import { CheckIcon } from '../icons/CheckIcon';

const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

export const Message: React.FC<MessageProps> = ({ message, type }) => {
  const isSuccess = type === 'success';
  
  const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-all duration-200";
  const typeClasses = isSuccess 
    ? "bg-green-900/20 text-green-400 border border-green-900/30" 
    : "bg-red-900/20 text-red-400 border border-red-900/30";
  
  const Icon = isSuccess ? CheckIcon : XCircleIcon;
  
  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};