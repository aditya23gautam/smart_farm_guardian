import React from 'react';
import Icon from '../../../components/AppIcon';

const SensorCard = ({ sensor }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'optimal':
        return 'text-success bg-success/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'critical':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getSensorIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'soil moisture':
        return 'Droplets';
      case 'temperature':
        return 'Thermometer';
      case 'ph level':
        return 'TestTube';
      case 'light intensity':
        return 'Sun';
      case 'nitrogen':
        return 'Leaf';
      default:
        return 'Activity';
    }
  };

  const getValueColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'optimal':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-soft hover:shadow-elevated transition-smooth">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getSensorIcon(sensor?.type)} 
            size={20} 
            className="text-primary" 
          />
          <h4 className="font-medium text-foreground">{sensor?.type}</h4>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor?.status)}`}>
          {sensor?.status}
        </span>
      </div>
      <div className="mb-3">
        <div className={`text-2xl font-bold ${getValueColor(sensor?.status)} mb-1`}>
          {sensor?.value} {sensor?.unit}
        </div>
        <div className="text-sm text-muted-foreground">
          Range: {sensor?.optimalRange}
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Last updated</span>
        <span className="font-medium text-foreground">{sensor?.lastUpdated}</span>
      </div>
      {sensor?.trend && (
        <div className="flex items-center mt-2 text-sm">
          <Icon 
            name={sensor?.trend === 'up' ? 'TrendingUp' : sensor?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
            size={16} 
            className={sensor?.trend === 'up' ? 'text-success' : sensor?.trend === 'down' ? 'text-error' : 'text-muted-foreground'} 
          />
          <span className="ml-1 text-muted-foreground">
            {sensor?.trend === 'up' ? 'Increasing' : sensor?.trend === 'down' ? 'Decreasing' : 'Stable'}
          </span>
        </div>
      )}
    </div>
  );
};

export default SensorCard;