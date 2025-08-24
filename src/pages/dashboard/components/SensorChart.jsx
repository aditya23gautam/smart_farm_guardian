import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const SensorChart = ({ chartData, selectedSensors, onSensorToggle }) => {
  const sensorColors = {
    'Soil Moisture': '#2D5A27',
    'Temperature': '#F4A261',
    'pH Level': '#4A90A4',
    'Light Intensity': '#D97706',
    'Nitrogen': '#16A34A'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry) => (
            <p key={entry?.dataKey} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value}${entry?.dataKey === 'Temperature' ? '°F' : 
                entry?.dataKey === 'Soil Moisture' ? '%' : 
                entry?.dataKey === 'pH Level' ? '' : 
                entry?.dataKey === 'Light Intensity' ? ' lux' : ' ppm'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">24-Hour Sensor Trends</h3>
        <Icon name="TrendingUp" size={20} className="text-primary" />
      </div>
      {/* Sensor Toggle Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(sensorColors)?.map((sensor) => (
          <button
            key={sensor}
            onClick={() => onSensorToggle(sensor)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
              selectedSensors?.includes(sensor)
                ? 'text-white shadow-soft'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            style={{
              backgroundColor: selectedSensors?.includes(sensor) ? sensorColors?.[sensor] : undefined
            }}
          >
            {sensor}
          </button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedSensors?.map((sensor) => (
              <Line
                key={sensor}
                type="monotone"
                dataKey={sensor}
                stroke={sensorColors?.[sensor]}
                strokeWidth={2}
                dot={{ fill: sensorColors?.[sensor], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: sensorColors?.[sensor], strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Chart Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Data updated every 5 minutes</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Live data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorChart;