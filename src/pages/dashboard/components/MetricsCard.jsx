import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ metrics }) => {
  const getMetricIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'total sensors':
        return 'Activity';
      case 'active alerts':
        return 'AlertTriangle';
      case 'farm area':
        return 'MapPin';
      case 'crop yield':
        return 'TrendingUp';
      case 'water usage':
        return 'Droplets';
      case 'energy saved':
        return 'Zap';
      default:
        return 'BarChart3';
    }
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Today's Metrics</h3>
        <Icon name="BarChart3" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics?.map((metric) => (
          <div key={metric?.id} className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon 
                  name={getMetricIcon(metric?.type)} 
                  size={20} 
                  className="text-primary" 
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm">{metric?.type}</h4>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="text-2xl font-bold text-foreground mb-1">
                {metric?.value}
                {metric?.unit && <span className="text-lg text-muted-foreground ml-1">{metric?.unit}</span>}
              </div>
            </div>
            
            {metric?.change !== undefined && (
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getChangeIcon(metric?.change)} 
                  size={14} 
                  className={getChangeColor(metric?.change)} 
                />
                <span className={`text-sm font-medium ${getChangeColor(metric?.change)}`}>
                  {Math.abs(metric?.change)}%
                </span>
                <span className="text-xs text-muted-foreground">vs yesterday</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsCard;