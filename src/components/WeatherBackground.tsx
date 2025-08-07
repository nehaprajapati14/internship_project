import React from 'react';

interface WeatherBackgroundProps {
  weatherType: string;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weatherType }) => {
  const renderParticles = () => {
    const type = weatherType.slice(0, 2);
    
    if (type === '13') { // Snow
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                transform: `translateY(-100vh)`,
                animation: `snowfall ${3 + Math.random() * 2}s linear infinite`,
              }}
            />
          ))}
        </div>
      );
    }
    
    if (type === '09' || type === '10') { // Rain
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-8 bg-blue-200 opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animation: `rainfall ${1 + Math.random()}s linear infinite`,
              }}
            />
          ))}
        </div>
      );
    }
    
    return null;
  };

  return (
    <>
      {renderParticles()}
      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        
        @keyframes rainfall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </>
  );
};

export default WeatherBackground;