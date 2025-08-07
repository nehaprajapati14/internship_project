import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-500/20 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30 max-w-md mx-auto">
      <div className="flex items-start">
        <AlertCircle className="w-6 h-6 text-red-300 mr-3 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <p className="text-white font-medium mb-2">Oops! Something went wrong</p>
          <p className="text-white/90 text-sm mb-4">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/30 hover:bg-red-500/40 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;