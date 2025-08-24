import React from 'react';
import { Filter } from 'lucide-react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { format } from 'date-fns';

const SensorFilters = ({
  selectedSensor,
  dateRange,
  sensorOptions,
  onSensorChange,
  onDateRangeChange,
  onFilterChange,
  filters
}) => {
  const handleDateChange = (field, value) => {
    onDateRangeChange({
      ...dateRange,
      [field]: new Date(value)
    });
  };

  const handleQuickDateRange = (days) => {
    const endDate = new Date();
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    onDateRangeChange({ startDate, endDate });
  };

  const metricRanges = {
    soil_moisture: { min: 0, max: 100, unit: '%' },
    temperature: { min: -10, max: 120, unit: '°F' },
    humidity: { min: 0, max: 100, unit: '%' },
    ph_level: { min: 4, max: 10, unit: 'pH' },
    light_intensity: { min: 0, max: 2000, unit: 'lux' },
    nitrogen: { min: 0, max: 100, unit: 'ppm' }
  };

  return (
    <div className="space-y-4">
      {/* Primary Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Sensor Selection */}
        <div className="flex-1 min-w-0">
          <Select
            label="Sensor"
            placeholder="Select sensor"
            value={selectedSensor}
            onChange={onSensorChange}
            options={sensorOptions}
            className="w-full"
          />
        </div>

        {/* Date Range Inputs */}
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Start Date
            </label>
            <Input
              type="datetime-local"
              value={format(dateRange?.startDate, "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => handleDateChange('startDate', e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground mb-2 block">
              End Date
            </label>
            <Input
              type="datetime-local"
              value={format(dateRange?.endDate, "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => handleDateChange('endDate', e?.target?.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
      {/* Quick Date Range Buttons */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-foreground">Quick select:</span>
        {[
          { label: '1 Hour', days: 1/24 },
          { label: '6 Hours', days: 1/4 },
          { label: '24 Hours', days: 1 },
          { label: '3 Days', days: 3 },
          { label: '1 Week', days: 7 },
          { label: '1 Month', days: 30 }
        ]?.map((range) => (
          <Button
            key={range?.label}
            variant="outline"
            size="sm"
            onClick={() => handleQuickDateRange(range?.days)}
            className="text-xs"
          >
            {range?.label}
          </Button>
        ))}
      </div>
      {/* Advanced Filters - Collapsible */}
      <div className="border-t border-border pt-4">
        <details className="group">
          <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground hover:text-primary">
            <Filter className="w-4 h-4" />
            Advanced Filters
            <div className="ml-auto transition-transform group-open:rotate-180">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </summary>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Sensor Type Filter */}
            <Select
              label="Sensor Type"
              placeholder="All sensors"
              value={filters?.sensorType || 'all'}
              onChange={(value) => onFilterChange({ sensorType: value })}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'field', label: 'Field Sensors' },
                { value: 'greenhouse', label: 'Greenhouse Sensors' },
                { value: 'orchard', label: 'Orchard Sensors' },
                { value: 'storage', label: 'Storage Sensors' }
              ]}
            />

            {/* Value Range Filters */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Value Range</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={filters?.valueRange?.min || ''}
                  onChange={(e) => onFilterChange({
                    valueRange: { ...filters?.valueRange, min: e?.target?.value }
                  })}
                  className="flex-1"
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={filters?.valueRange?.max || ''}
                  onChange={(e) => onFilterChange({
                    valueRange: { ...filters?.valueRange, max: e?.target?.value }
                  })}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Alert Conditions */}
            <Select
              label="Alert Conditions"
              placeholder="All readings"
              multiple
              value={filters?.alertConditions || []}
              onChange={(value) => onFilterChange({ alertConditions: value })}
              options={[
                { value: 'normal', label: 'Normal Readings' },
                { value: 'warning', label: 'Warning Levels' },
                { value: 'critical', label: 'Critical Alerts' },
                { value: 'anomaly', label: 'Anomalies' }
              ]}
            />
          </div>
        </details>
      </div>
    </div>
  );
};

export default SensorFilters;