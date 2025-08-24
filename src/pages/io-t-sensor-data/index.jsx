import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SensorFilters from './components/SensorFilters';
import SensorCharts from './components/SensorCharts';
import DataTable from './components/DataTable';
import ThresholdVisualizer from './components/ThresholdVisualizer';
import AIInsightsPanel from './components/AIInsightsPanel';
import ExportControls from './components/ExportControls';
import RealTimeUpdates from './components/RealTimeUpdates';

const IoTSensorData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSensor, setSelectedSensor] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
    endDate: new Date()
  });
  const [selectedMetrics, setSelectedMetrics] = useState(['soil_moisture', 'temperature', 'humidity']);
  const [sensorData, setSensorData] = useState([]);
  const [realTimeData, setRealTimeData] = useState({});
  const [filters, setFilters] = useState({
    sensorType: 'all',
    valueRange: { min: null, max: null },
    alertConditions: []
  });
  const [chartView, setChartView] = useState('combined'); // combined, individual
  const [tableData, setTableData] = useState([]);
  const [hasNewData, setHasNewData] = useState(false);
  const wsRef = useRef(null);

  // Mock sensor options
  const sensorOptions = [
    { value: 'all', label: 'All Sensors' },
    { value: 'field_a_01', label: 'Field A - Sensor 01', location: 'North Field' },
    { value: 'field_a_02', label: 'Field A - Sensor 02', location: 'North Field' },
    { value: 'greenhouse_01', label: 'Greenhouse - Sensor 01', location: 'Greenhouse A' },
    { value: 'orchard_01', label: 'Orchard - Sensor 01', location: 'Apple Orchard' },
    { value: 'storage_01', label: 'Storage - Sensor 01', location: 'Grain Storage' }
  ];

  // Mock chart data with historical trends
  const generateMockData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 0; i < 144; i++) { // 144 points = 24 hours at 10-minute intervals
      const timestamp = new Date(now.getTime() - (144 - i) * 10 * 60 * 1000);
      const hour = timestamp?.getHours();
      
      // Generate realistic sensor readings with daily patterns
      data?.push({
        timestamp: timestamp?.toISOString(),
        time: timestamp?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        soil_moisture: Math.max(20, Math.min(80, 45 + Math.sin(hour / 24 * Math.PI * 2) * 10 + (Math.random() - 0.5) * 8)),
        temperature: Math.max(32, Math.min(95, 65 + Math.sin((hour - 6) / 24 * Math.PI * 2) * 15 + (Math.random() - 0.5) * 5)),
        humidity: Math.max(30, Math.min(90, 60 + Math.sin((hour - 8) / 24 * Math.PI * 2) * 12 + (Math.random() - 0.5) * 6)),
        ph_level: Math.max(5.5, Math.min(8.5, 6.8 + (Math.random() - 0.5) * 0.4)),
        light_intensity: hour < 6 || hour > 20 ? Math.random() * 50 : 400 + Math.sin((hour - 6) / 12 * Math.PI) * 400 + (Math.random() - 0.5) * 100,
        nitrogen: Math.max(15, Math.min(50, 32 + (Math.random() - 0.5) * 8)),
        sensor_id: i % 5 === 0 ? 'field_a_01' : i % 4 === 0 ? 'greenhouse_01' : 'field_a_02'
      });
    }
    
    return data;
  };

  // Mock table data with detailed readings
  const generateTableData = () => {
    const data = [];
    const sensors = ['field_a_01', 'field_a_02', 'greenhouse_01', 'orchard_01'];
    
    for (let i = 0; i < 50; i++) {
      const timestamp = new Date(Date.now() - i * 15 * 60 * 1000); // Every 15 minutes
      const sensor = sensors?.[i % sensors?.length];
      const sensorLabel = sensorOptions?.find(s => s?.value === sensor)?.label || sensor;
      
      data?.push({
        id: `reading_${i}`,
        timestamp: timestamp?.toISOString(),
        sensorId: sensor,
        sensorName: sensorLabel,
        soilMoisture: Math.round(45 + (Math.random() - 0.5) * 20),
        temperature: Math.round(72 + (Math.random() - 0.5) * 15),
        humidity: Math.round(65 + (Math.random() - 0.5) * 20),
        phLevel: Number((6.8 + (Math.random() - 0.5) * 0.6)?.toFixed(1)),
        lightIntensity: Math.round(500 + (Math.random() - 0.5) * 400),
        nitrogen: Math.round(30 + (Math.random() - 0.5) * 10),
        status: Math.random() > 0.15 ? 'normal' : Math.random() > 0.5 ? 'warning' : 'critical',
        batteryLevel: Math.round(65 + Math.random() * 35),
        signalStrength: Math.round(70 + Math.random() * 30)
      });
    }
    
    return data;
  };

  // Simulated WebSocket connection
  useEffect(() => {
    const mockWebSocket = () => {
      const interval = setInterval(() => {
        // Simulate new real-time data
        const newReading = {
          timestamp: new Date()?.toISOString(),
          soil_moisture: Math.round(45 + (Math.random() - 0.5) * 20),
          temperature: Math.round(72 + (Math.random() - 0.5) * 15),
          humidity: Math.round(65 + (Math.random() - 0.5) * 20),
          sensor_id: 'field_a_01'
        };
        
        setRealTimeData(newReading);
        setHasNewData(true);
        
        // Auto-hide new data indicator after 3 seconds
        setTimeout(() => setHasNewData(false), 3000);
      }, 30000); // Update every 30 seconds
      
      return interval;
    };

    const interval = mockWebSocket();
    
    return () => {
      clearInterval(interval);
      if (wsRef?.current) {
        wsRef?.current?.close();
      }
    };
  }, []);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockChartData = generateMockData();
      const mockTableData = generateTableData();
      
      setSensorData(mockChartData);
      setTableData(mockTableData);
      setIsLoading(false);
    };

    loadData();
  }, [selectedSensor, dateRange]);

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
  };

  const handleSensorChange = (sensorId) => {
    setSelectedSensor(sensorId);
  };

  const handleMetricToggle = (metric) => {
    setSelectedMetrics(prev => 
      prev?.includes(metric) 
        ? prev?.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleExport = (format, dataType) => {
    console.log(`Exporting ${dataType} as ${format}`);
    // Implementation for actual export functionality
  };

  const filteredData = sensorData?.filter(reading => {
    if (selectedSensor !== 'all' && reading?.sensor_id !== selectedSensor) {
      return false;
    }
    
    if (filters?.sensorType !== 'all' && reading?.sensor_id !== filters?.sensorType) {
      return false;
    }
    
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div className="lg:col-span-3">
                  <div className="h-96 bg-muted rounded-lg"></div>
                </div>
                <div className="h-96 bg-muted rounded-lg"></div>
              </div>
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>IoT Sensor Data - Smart Farm Guardian</title>
        <meta name="description" content="Comprehensive visualization and analysis of real-time agricultural sensor data with historical trends and AI-powered insights." />
      </Helmet>
      
      <Header onToggleSidebar={() => {}} />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header with Real-time Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">IoT Sensor Data</h1>
              <p className="text-muted-foreground mt-2">
                Real-time sensor monitoring with historical analysis and AI insights
              </p>
            </div>
            
            <RealTimeUpdates 
              hasNewData={hasNewData}
              lastUpdate={realTimeData?.timestamp}
            />
          </div>

          {/* Filters Row - Mobile First Sticky Header */}
          <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
            <SensorFilters
              selectedSensor={selectedSensor}
              dateRange={dateRange}
              sensorOptions={sensorOptions}
              onSensorChange={handleSensorChange}
              onDateRangeChange={handleDateRangeChange}
              onFilterChange={handleFilterChange}
              filters={filters}
            />
          </div>

          {/* Main Content Grid - Desktop: Charts + Insights, Mobile: Stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Charts Section */}
            <div className="lg:col-span-3">
              <SensorCharts
                data={filteredData}
                selectedMetrics={selectedMetrics}
                onMetricToggle={handleMetricToggle}
                chartView={chartView}
                onChartViewChange={setChartView}
                realTimeData={realTimeData}
              />
            </div>

            {/* AI Insights Sidebar */}
            <div className="lg:col-span-1">
              <AIInsightsPanel 
                sensorData={filteredData}
                selectedSensor={selectedSensor}
              />
            </div>
          </div>

          {/* Threshold Visualization */}
          <div className="mb-8">
            <ThresholdVisualizer
              data={filteredData}
              selectedMetrics={selectedMetrics}
            />
          </div>

          {/* Data Table with Export Controls */}
          <div className="space-y-6">
            <ExportControls
              onExport={handleExport}
              dateRange={dateRange}
              selectedSensor={selectedSensor}
            />
            
            <DataTable
              data={tableData}
              selectedSensor={selectedSensor}
              filters={filters}
            />
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Live Data Stream Active</span>
                </div>
                <span>Data Quality: 98.7%</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>{filteredData?.length} readings displayed</span>
                <span>© 2025 Smart Farm Guardian</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTSensorData;