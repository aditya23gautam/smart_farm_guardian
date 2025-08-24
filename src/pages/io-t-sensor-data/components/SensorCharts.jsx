import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import { TrendingUp, BarChart3, Activity, Maximize2, Minimize2, Zap } from 'lucide-react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SensorCharts = ({ 
  data, 
  selectedMetrics, 
  onMetricToggle, 
  chartView, 
  onChartViewChange,
  realTimeData 
}) => {
  const [zoomedChart, setZoomedChart] = useState(null);
  const [chartType, setChartType] = useState('line'); // line, area, composed

  const metricConfigs = {
    soil_moisture: {
      color: '#2D5A27',
      name: 'Soil Moisture',
      unit: '%',
      icon: 'Droplets',
      optimal: { min: 40, max: 60 },
      critical: { min: 20, max: 80 }
    },
    temperature: {
      color: '#F4A261',
      name: 'Temperature',
      unit: '°F',
      icon: 'Thermometer',
      optimal: { min: 65, max: 75 },
      critical: { min: 32, max: 95 }
    },
    humidity: {
      color: '#4A90A4',
      name: 'Humidity',
      unit: '%',
      icon: 'CloudRain',
      optimal: { min: 50, max: 70 },
      critical: { min: 30, max: 90 }
    },
    ph_level: {
      color: '#8B5CF6',
      name: 'pH Level',
      unit: '',
      icon: 'TestTube',
      optimal: { min: 6.0, max: 7.0 },
      critical: { min: 5.0, max: 8.5 }
    },
    light_intensity: {
      color: '#D97706',
      name: 'Light Intensity',
      unit: 'lux',
      icon: 'Sun',
      optimal: { min: 800, max: 1000 },
      critical: { min: 0, max: 2000 }
    },
    nitrogen: {
      color: '#16A34A',
      name: 'Nitrogen',
      unit: 'ppm',
      icon: 'Leaf',
      optimal: { min: 30, max: 50 },
      critical: { min: 15, max: 100 }
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry) => {
            const config = metricConfigs?.[entry?.dataKey];
            const value = entry?.value;
            const isOptimal = value >= config?.optimal?.min && value <= config?.optimal?.max;
            const isCritical = value < config?.critical?.min || value > config?.critical?.max;
            
            return (
              <div key={entry?.dataKey} className="flex items-center justify-between gap-3">
                <p className="text-sm" style={{ color: entry?.color }}>
                  {`${config?.name}: ${value?.toFixed(1)}${config?.unit}`}
                </p>
                <div className="flex items-center gap-1">
                  {isCritical && <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />}
                  {!isCritical && isOptimal && <div className="w-2 h-2 bg-success rounded-full" />}
                  {!isCritical && !isOptimal && <div className="w-2 h-2 bg-warning rounded-full" />}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const renderChart = (metrics, height = 300) => {
    const chartData = data?.slice(-100); // Show last 100 points for performance
    
    if (chartType === 'area') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              {metrics?.map(metric => (
                <linearGradient key={`gradient-${metric}`} id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metricConfigs?.[metric]?.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={metricConfigs?.[metric]?.color} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {metrics?.map(metric => (
              <Area
                key={metric}
                type="monotone"
                dataKey={metric}
                stroke={metricConfigs?.[metric]?.color}
                strokeWidth={2}
                fill={`url(#gradient-${metric})`}
                name={metricConfigs?.[metric]?.name}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'composed') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {metrics?.slice(0, 2)?.map(metric => (
              <Line
                key={metric}
                type="monotone"
                dataKey={metric}
                stroke={metricConfigs?.[metric]?.color}
                strokeWidth={2}
                dot={false}
                name={metricConfigs?.[metric]?.name}
              />
            ))}
            
            {metrics?.slice(2)?.map(metric => (
              <Bar
                key={metric}
                dataKey={metric}
                fill={metricConfigs?.[metric]?.color}
                opacity={0.6}
                name={metricConfigs?.[metric]?.name}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      );
    }

    // Default line chart
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {metrics?.map(metric => (
            <Line
              key={metric}
              type="monotone"
              dataKey={metric}
              stroke={metricConfigs?.[metric]?.color}
              strokeWidth={2}
              dot={{ fill: metricConfigs?.[metric]?.color, strokeWidth: 0, r: 2 }}
              activeDot={{ 
                r: 6, 
                stroke: metricConfigs?.[metric]?.color, 
                strokeWidth: 2,
                className: 'animate-pulse'
              }}
              name={metricConfigs?.[metric]?.name}
            />
          ))}
          
          {/* Real-time data indicator */}
          {realTimeData?.timestamp && (
            <Line
              dataKey="realtime"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4, className: 'animate-bounce' }}
              strokeDasharray="5,5"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Sensor Data Visualization</h3>
            {realTimeData?.timestamp && (
              <div className="flex items-center gap-1 ml-2">
                <Zap className="w-4 h-4 text-success animate-pulse" />
                <span className="text-xs text-success font-medium">Live</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Chart Type Toggle */}
            <div className="flex rounded-lg border border-border">
              {[
                { type: 'line', icon: TrendingUp, label: 'Line' },
                { type: 'area', icon: Activity, label: 'Area' },
                { type: 'composed', icon: BarChart3, label: 'Mixed' }
              ]?.map(({ type, icon: ChartIcon, label }) => (
                <Button
                  key={type}
                  variant={chartType === type ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType(type)}
                  className="rounded-none first:rounded-l-lg last:rounded-r-lg border-r border-border last:border-r-0"
                >
                  <ChartIcon className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{label}</span>
                </Button>
              ))}
            </div>

            {/* View Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChartViewChange(chartView === 'combined' ? 'individual' : 'combined')}
              className="ml-2"
            >
              {chartView === 'combined' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              <span className="hidden sm:inline ml-1">
                {chartView === 'combined' ? 'Split View' : 'Combined'}
              </span>
            </Button>
          </div>
        </div>

        {/* Metric Toggle Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(metricConfigs)?.map(([key, config]) => (
            <Button
              key={key}
              variant={selectedMetrics?.includes(key) ? 'default' : 'outline'}
              size="sm"
              onClick={() => onMetricToggle(key)}
              className="flex items-center gap-2"
              style={{
                backgroundColor: selectedMetrics?.includes(key) ? config?.color : undefined,
                borderColor: selectedMetrics?.includes(key) ? config?.color : undefined,
                color: selectedMetrics?.includes(key) ? 'white' : undefined
              }}
            >
              <Icon name={config?.icon} size={14} />
              <span className="hidden sm:inline">{config?.name}</span>
              <span className="sm:hidden">{key?.replace('_', ' ')}</span>
            </Button>
          ))}
        </div>

        {/* Charts Display */}
        {chartView === 'combined' ? (
          <div className="space-y-4">
            <div className={zoomedChart ? 'h-96' : 'h-80'}>
              {renderChart(selectedMetrics, zoomedChart ? 384 : 320)}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedMetrics?.map(metric => (
              <div key={metric} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    <Icon name={metricConfigs?.[metric]?.icon} size={16} />
                    {metricConfigs?.[metric]?.name}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setZoomedChart(zoomedChart === metric ? null : metric)}
                  >
                    {zoomedChart === metric ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </Button>
                </div>
                <div className={zoomedChart === metric ? 'h-96' : 'h-64'}>
                  {renderChart([metric], zoomedChart === metric ? 384 : 256)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Chart Legend and Info */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Optimal Range</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>Warning Level</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
              <span>Critical Alert</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Live Data</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span>Touch/drag to zoom • Double-click to reset</span>
            <span>Showing last {data?.slice(-100)?.length || 0} readings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorCharts;