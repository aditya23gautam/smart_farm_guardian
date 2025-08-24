import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, Filter, AlertTriangle, CheckCircle, AlertCircle, Battery, Wifi } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { format } from 'date-fns';

const DataTable = ({ data, selectedSensor, filters }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRows, setVisibleRows] = useState(25);
  const [filteredData, setFilteredData] = useState([]);

  // Column configuration
  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true, width: 'w-40' },
    { key: 'sensorName', label: 'Sensor', sortable: true, width: 'w-48' },
    { key: 'soilMoisture', label: 'Soil Moisture (%)', sortable: true, width: 'w-28' },
    { key: 'temperature', label: 'Temp (°F)', sortable: true, width: 'w-24' },
    { key: 'humidity', label: 'Humidity (%)', sortable: true, width: 'w-28' },
    { key: 'phLevel', label: 'pH Level', sortable: true, width: 'w-24' },
    { key: 'lightIntensity', label: 'Light (lux)', sortable: true, width: 'w-28' },
    { key: 'nitrogen', label: 'N (ppm)', sortable: true, width: 'w-24' },
    { key: 'status', label: 'Status', sortable: true, width: 'w-24' },
    { key: 'batteryLevel', label: 'Battery', sortable: true, width: 'w-24' },
    { key: 'signalStrength', label: 'Signal', sortable: true, width: 'w-24' }
  ];

  // Status configurations
  const statusConfig = {
    normal: { 
      color: 'text-success', 
      bgColor: 'bg-success/10', 
      icon: CheckCircle,
      label: 'Normal' 
    },
    warning: { 
      color: 'text-warning', 
      bgColor: 'bg-warning/10', 
      icon: AlertTriangle,
      label: 'Warning' 
    },
    critical: { 
      color: 'text-destructive', 
      bgColor: 'bg-destructive/10', 
      icon: AlertCircle,
      label: 'Critical' 
    }
  };

  // Filter and sort data
  useEffect(() => {
    let filtered = [...data];

    // Apply sensor filter
    if (selectedSensor !== 'all') {
      filtered = filtered?.filter(row => row?.sensorId === selectedSensor);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(row =>
        Object.values(row)?.some(value =>
          value?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        )
      );
    }

    // Apply additional filters
    if (filters?.alertConditions?.length > 0) {
      filtered = filtered?.filter(row =>
        filters?.alertConditions?.includes(row?.status)
      );
    }

    // Apply sorting
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'timestamp') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(filtered);
  }, [data, selectedSensor, filters, searchTerm, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleLoadMore = () => {
    setVisibleRows(prev => prev + 25);
  };

  const getStatusDisplay = (status) => {
    const config = statusConfig?.[status] || statusConfig?.normal;
    const IconComponent = config?.icon;
    
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color} ${config?.bgColor}`}>
        <IconComponent className="w-3 h-3" />
        {config?.label}
      </div>
    );
  };

  const getBatteryDisplay = (level) => {
    const color = level > 50 ? 'text-success' : level > 20 ? 'text-warning' : 'text-destructive';
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        <Battery className="w-3 h-3" />
        <span className="text-xs">{level}%</span>
      </div>
    );
  };

  const getSignalDisplay = (strength) => {
    const color = strength > 70 ? 'text-success' : strength > 40 ? 'text-warning' : 'text-destructive';
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        <Wifi className="w-3 h-3" />
        <span className="text-xs">{strength}%</span>
      </div>
    );
  };

  const formatCellValue = (key, value, row) => {
    switch (key) {
      case 'timestamp':
        return (
          <div className="text-xs">
            <div className="font-medium">{format(new Date(value), 'MMM dd, yyyy')}</div>
            <div className="text-muted-foreground">{format(new Date(value), 'HH:mm:ss')}</div>
          </div>
        );
      case 'sensorName':
        return (
          <div className="text-sm">
            <div className="font-medium">{value}</div>
            <div className="text-xs text-muted-foreground">{row?.sensorId}</div>
          </div>
        );
      case 'status':
        return getStatusDisplay(value);
      case 'batteryLevel':
        return getBatteryDisplay(value);
      case 'signalStrength':
        return getSignalDisplay(value);
      case 'phLevel':
        return <span className="font-mono">{value?.toFixed(1)}</span>;
      case 'soilMoisture': case'humidity':
        return <span className="font-mono">{value}%</span>;
      case 'temperature':
        return <span className="font-mono">{value}°F</span>;
      case 'lightIntensity':
        return <span className="font-mono">{value} lux</span>;
      case 'nitrogen':
        return <span className="font-mono">{value} ppm</span>;
      default:
        return value;
    }
  };

  const visibleData = filteredData?.slice(0, visibleRows);

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      {/* Table Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Raw Sensor Data</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Detailed readings from all sensors with timestamps and status indicators
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search readings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="pl-10 w-64"
              />
            </div>
            
            {/* Results Counter */}
            <div className="text-sm text-muted-foreground">
              {filteredData?.length} readings
            </div>
          </div>
        </div>
      </div>
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className={`px-4 py-3 text-left text-sm font-medium text-foreground ${column?.width} ${
                    column?.sortable ? 'cursor-pointer hover:bg-muted/70' : ''
                  }`}
                  onClick={column?.sortable ? () => handleSort(column?.key) : undefined}
                >
                  <div className="flex items-center gap-1">
                    {column?.label}
                    {column?.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={`w-3 h-3 ${
                            sortConfig?.key === column?.key && sortConfig?.direction === 'asc' ?'text-primary' :'text-muted-foreground'
                          }`} 
                        />
                        <ChevronDown 
                          className={`w-3 h-3 -mt-1 ${
                            sortConfig?.key === column?.key && sortConfig?.direction === 'desc' ?'text-primary' :'text-muted-foreground'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleData?.length === 0 ? (
              <tr>
                <td colSpan={columns?.length} className="px-4 py-12 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Filter className="w-12 h-12 text-muted-foreground/50" />
                    <p className="text-lg font-medium">No data found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              visibleData?.map((row, index) => (
                <tr 
                  key={row?.id || index}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  {columns?.map((column) => (
                    <td key={column?.key} className={`px-4 py-3 ${column?.width}`}>
                      {formatCellValue(column?.key, row?.[column?.key], row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      {visibleData?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {visibleRows} of {filteredData?.length} readings
            </div>
            
            {visibleRows < filteredData?.length && (
              <Button
                variant="outline"
                onClick={handleLoadMore}
                className="w-full sm:w-auto"
              >
                Load More ({Math.min(25, filteredData?.length - visibleRows)} more)
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;