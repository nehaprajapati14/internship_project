import React from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange, disabled }) => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get date 30 days ago (limit for historical data simulation)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const minDate = thirtyDaysAgo.toISOString().split('T')[0];

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={minDate}
          max={today}
          disabled={disabled}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      <p className="text-white/70 text-sm mt-2 text-center">
        Select a date (up to 30 days ago) or today for current weather
      </p>
    </div>
  );
};

export default DatePicker;