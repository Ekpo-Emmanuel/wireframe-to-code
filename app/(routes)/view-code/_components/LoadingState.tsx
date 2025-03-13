import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoadingStateProps {
  progress: number;
  progressMessage: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ progress, progressMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 h-[70vh]">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
        <h3 className="text-lg font-medium text-center text-gray-800 dark:text-gray-200 mb-2">
          {progressMessage}
        </h3>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          This may take a minute or two
        </p>
      </div>
    </div>
  );
};

export default LoadingState; 