import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DateTimePickerProps {
  onDateTimeChange: (dateTime: Date) => void;
  disabled?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onDateTimeChange, disabled }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(new Date().toTimeString().slice(0, 5));
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get today's date and 7 days ago for date limits
  const today = new Date().toISOString().split('T')[0];
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const minDate = sevenDaysAgo.toISOString().split('T')[0];

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const dateTime = new Date(`${date}T${selectedTime}`);
    onDateTimeChange(dateTime);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    const dateTime = new Date(`${selectedDate}T${time}`);
    onDateTimeChange(dateTime);
  };

  const formatCurrentTime = () => {
    return currentTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Current Time Display */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 mb-6 text-center border border-white/20">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-white/80" />
          <span className="text-white/80 text-sm font-medium">Current Time</span>
        </div>
        <p className="text-white text-lg font-bold">
          {formatCurrentTime()}
        </p>
      </div>

      {/* Date and Time Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-white/80 text-sm font-medium mb-2">
            Select Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              min={minDate}
              max={today}
              disabled={disabled}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/90 backdrop-blur-sm text-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-white/80 text-sm font-medium mb-2">
            Select Time
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => handleTimeChange(e.target.value)}
              disabled={disabled}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/90 backdrop-blur-sm text-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <p className="text-white/70 text-sm mt-4 text-center">
        Select a date (up to 7 days ago) and time, or use current date/time for real-time weather
      </p>
    </div>
  );
};

export default DateTimePicker;