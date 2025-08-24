import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherCard = ({ weatherData }) => {
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny': case'clear':
        return 'Sun';
      case 'cloudy': case'overcast':
        return 'Cloud';
      case 'rainy': case'rain':
        return 'CloudRain';
      case 'stormy':
        return 'CloudLightning';
      default:
        return 'Sun';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Current Weather</h3>
        <div className="flex items-center space-x-2">
          <Icon 
            name={getWeatherIcon(weatherData?.condition)} 
            size={24} 
            className="text-accent" 
          />
          <span className="text-sm text-muted-foreground">{weatherData?.condition}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground mb-1">
            {weatherData?.temperature}°F
          </div>
          <div className="text-sm text-muted-foreground">Temperature</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground mb-1">
            {weatherData?.humidity}%
          </div>
          <div className="text-sm text-muted-foreground">Humidity</div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-semibold text-foreground mb-1">
            {weatherData?.windSpeed} mph
          </div>
          <div className="text-sm text-muted-foreground">Wind Speed</div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-semibold text-foreground mb-1">
            {weatherData?.pressure} inHg
          </div>
          <div className="text-sm text-muted-foreground">Pressure</div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Feels like</span>
          <span className="font-medium text-foreground">{weatherData?.feelsLike}°F</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">UV Index</span>
          <span className="font-medium text-foreground">{weatherData?.uvIndex}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;