import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import Icon from '../../../components/AppIcon';

const ThresholdVisualizer = ({ data, selectedMetrics }) => {
  const metricConfigs = {
    soil_moisture: {
      name: 'Soil Moisture',
      unit: '%',
      icon: 'Droplets',
      optimal: { min: 40, max: 60 },
      warning: { min: 30, max: 70 },
      critical: { min: 20, max: 80 },
      color: '#2D5A27'
    },
    temperature: {
      name: 'Temperature',
      unit: '°F',
      icon: 'Thermometer',
      optimal: { min: 65, max: 75 },
      warning: { min: 55, max: 85 },
      critical: { min: 32, max: 95 },
      color: '#F4A261'
    },
    humidity: {
      name: 'Humidity',
      unit: '%',
      icon: 'CloudRain',
      optimal: { min: 50, max: 70 },
      warning: { min: 40, max: 80 },
      critical: { min: 30, max: 90 },
      color: '#4A90A4'
    },
    ph_level: {
      name: 'pH Level',
      unit: '',
      icon: 'TestTube',
      optimal: { min: 6.0, max: 7.0 },
      warning: { min: 5.5, max: 7.5 },
      critical: { min: 5.0, max: 8.5 },
      color: '#8B5CF6'
    },
    light_intensity: {
      name: 'Light Intensity',
      unit: 'lux',
      icon: 'Sun',
      optimal: { min: 800, max: 1000 },
      warning: { min: 600, max: 1200 },
      critical: { min: 200, max: 1500 },
      color: '#D97706'
    },
    nitrogen: {
      name: 'Nitrogen',
      unit: 'ppm',
      icon: 'Leaf',
      optimal: { min: 30, max: 50 },
      warning: { min: 25, max: 60 },
      critical: { min: 15, max: 100 },
      color: '#16A34A'
    }
  };

  const getLatestValue = (metric) => {
    if (!data?.length) return null;
    const latest = data?.[data?.length - 1];
    return latest?.[metric];
  };

  const getThresholdStatus = (value, config) => {
    if (value >= config?.optimal?.min && value <= config?.optimal?.max) {
      return 'optimal';
    }
    if (value >= config?.warning?.min && value <= config?.warning?.max) {
      return 'warning';
    }
    return 'critical';
  };

  const getTrend = (metric) => {
    if (data?.length < 2) return 'stable';
    
    const latest = data?.[data?.length - 1]?.[metric];
    const previous = data?.[data?.length - 2]?.[metric];
    
    const change = ((latest - previous) / previous) * 100;
    
    if (Math.abs(change) < 2) return 'stable';
    return change > 0 ? 'up' : 'down';
  };

  const getAnomalies = (metric) => {
    if (!data?.length) return 0;
    
    const config = metricConfigs?.[metric];
    return data?.filter(reading => {
      const value = reading?.[metric];
      return value < config?.warning?.min || value > config?.warning?.max;
    })?.length;
  };

  const statusIcons = {
    optimal: CheckCircle,
    warning: AlertTriangle,
    critical: AlertCircle
  };

  const statusColors = {
    optimal: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    critical: 'text-destructive bg-destructive/10'
  };

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    stable: () => <div className="w-4 h-4 border-b-2 border-muted-foreground"></div>
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Threshold Analysis & Alerts</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedMetrics?.map(metric => {
          const config = metricConfigs?.[metric];
          const value = getLatestValue(metric);
          const status = getThresholdStatus(value, config);
          const trend = getTrend(metric);
          const anomalies = getAnomalies(metric);
          
          const StatusIcon = statusIcons?.[status];
          const TrendIcon = trendIcons?.[trend];

          return (
            <div key={metric} className="space-y-4">
              {/* Metric Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name={config?.icon} size={20} style={{ color: config?.color }} />
                  <h4 className="font-medium text-foreground">{config?.name}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon className={`w-4 h-4 ${statusColors?.[status]?.split(' ')?.[0]}`} />
                  <TrendIcon className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {/* Current Value */}
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {value?.toFixed(1)}{config?.unit}
                </div>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors?.[status]}`}>
                  <StatusIcon className="w-3 h-3" />
                  {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
                </div>
              </div>

              {/* Threshold Visualization */}
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Threshold Ranges</div>
                
                {/* Visual Threshold Bar */}
                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                  {/* Critical zones */}
                  <div 
                    className="absolute h-full bg-destructive/30"
                    style={{
                      left: '0%',
                      width: `${(config?.warning?.min / config?.critical?.max) * 100}%`
                    }}
                  ></div>
                  <div 
                    className="absolute h-full bg-destructive/30"
                    style={{
                      left: `${(config?.warning?.max / config?.critical?.max) * 100}%`,
                      width: `${((config?.critical?.max - config?.warning?.max) / config?.critical?.max) * 100}%`
                    }}
                  ></div>
                  
                  {/* Warning zones */}
                  <div 
                    className="absolute h-full bg-warning/30"
                    style={{
                      left: `${(config?.warning?.min / config?.critical?.max) * 100}%`,
                      width: `${((config?.optimal?.min - config?.warning?.min) / config?.critical?.max) * 100}%`
                    }}
                  ></div>
                  <div 
                    className="absolute h-full bg-warning/30"
                    style={{
                      left: `${(config?.optimal?.max / config?.critical?.max) * 100}%`,
                      width: `${((config?.warning?.max - config?.optimal?.max) / config?.critical?.max) * 100}%`
                    }}
                  ></div>
                  
                  {/* Optimal zone */}
                  <div 
                    className="absolute h-full bg-success/50"
                    style={{
                      left: `${(config?.optimal?.min / config?.critical?.max) * 100}%`,
                      width: `${((config?.optimal?.max - config?.optimal?.min) / config?.critical?.max) * 100}%`
                    }}
                  ></div>
                  
                  {/* Current value indicator */}
                  <div 
                    className="absolute w-1 h-full bg-foreground rounded-full"
                    style={{
                      left: `${Math.max(0, Math.min(100, (value / config?.critical?.max) * 100))}%`
                    }}
                  ></div>
                </div>

                {/* Range Labels */}
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{config?.critical?.min}{config?.unit}</span>
                  <span className="text-success">Optimal: {config?.optimal?.min}-{config?.optimal?.max}{config?.unit}</span>
                  <span>{config?.critical?.max}{config?.unit}</span>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-sm font-medium text-foreground">{anomalies}</div>
                  <div className="text-xs text-muted-foreground">Anomalies (24h)</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-foreground">
                    {trend === 'stable' ? '±0%' : trend === 'up' ? '+2.1%' : '-1.8%'}
                  </div>
                  <div className="text-xs text-muted-foreground">Trend (1h)</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Status Summary */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {selectedMetrics?.filter(metric => {
                const value = getLatestValue(metric);
                return getThresholdStatus(value, metricConfigs?.[metric]) === 'optimal';
              })?.length}
            </div>
            <div className="text-sm text-muted-foreground">Metrics in Optimal Range</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {selectedMetrics?.filter(metric => {
                const value = getLatestValue(metric);
                return getThresholdStatus(value, metricConfigs?.[metric]) === 'warning';
              })?.length}
            </div>
            <div className="text-sm text-muted-foreground">Warning Levels</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">
              {selectedMetrics?.filter(metric => {
                const value = getLatestValue(metric);
                return getThresholdStatus(value, metricConfigs?.[metric]) === 'critical';
              })?.length}
            </div>
            <div className="text-sm text-muted-foreground">Critical Alerts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThresholdVisualizer;