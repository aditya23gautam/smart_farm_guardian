import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InsightFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onSearch,
  searchQuery,
  setSearchQuery 
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'irrigation', label: 'Irrigation' },
    { value: 'pest-management', label: 'Pest Management' },
    { value: 'harvesting', label: 'Harvesting' },
    { value: 'sustainability', label: 'Sustainability' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'implemented', label: 'Implemented' },
    { value: 'dismissed', label: 'Dismissed' },
    { value: 'pending', label: 'Pending' }
  ];

  const timeRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'all', label: 'All Time' }
  ];

  const cropOptions = [
    { value: 'all', label: 'All Crops' },
    { value: 'corn', label: 'Corn' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'soybeans', label: 'Soybeans' },
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'apples', label: 'Apples' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== 'all') || searchQuery;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filter Insights
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear All
          </Button>
        )}
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search insights by keyword, crop, or recommendation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
            >
              <Icon name="X" size={14} />
            </Button>
          )}
        </div>
      </div>
      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
        />

        <Select
          label="Severity"
          options={severityOptions}
          value={filters?.severity}
          onChange={(value) => onFilterChange('severity', value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          label="Time Range"
          options={timeRangeOptions}
          value={filters?.timeRange}
          onChange={(value) => onFilterChange('timeRange', value)}
        />

        <Select
          label="Crop Type"
          options={cropOptions}
          value={filters?.cropType}
          onChange={(value) => onFilterChange('cropType', value)}
        />
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {Object.entries(filters)?.map(([key, value]) => {
              if (value === 'all') return null;
              return (
                <div key={key} className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                  <span className="capitalize">{key}: {value}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFilterChange(key, 'all')}
                    className="ml-1 p-0 h-4 w-4"
                  >
                    <Icon name="X" size={10} />
                  </Button>
                </div>
              );
            })}
            {searchQuery && (
              <div className="flex items-center bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs">
                <span>Search: "{searchQuery}"</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="ml-1 p-0 h-4 w-4"
                >
                  <Icon name="X" size={10} />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightFilters;