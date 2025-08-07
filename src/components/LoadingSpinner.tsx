import React from 'react';
import { Cloud } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative mb-6">
        <div className="w-20 h-20 border-4 border-white/20 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
        <Cloud className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white animate-pulse" />
      </div>
      <p className="text-white/90 text-lg font-medium animate-pulse">
        Fetching weather data...
      </p>
      <p className="text-white/70 text-sm mt-2">
        Please wait a moment
      </p>
    </div>
  );
};

export default LoadingSpinner;