import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import WeatherCard from './components/WeatherCard';
import SensorCard from './components/SensorCard';
import AlertCard from './components/AlertCard';
import MetricsCard from './components/MetricsCard';
import SensorChart from './components/SensorChart';
import QuickActions from './components/QuickActions';
import EmergencyBanner from './components/EmergencyBanner';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSensors, setSelectedSensors] = useState(['Soil Moisture', 'Temperature', 'pH Level']);
  const [refreshing, setRefreshing] = useState(false);

  // Mock weather data
  const weatherData = {
    temperature: 72,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 8,
    pressure: 30.15,
    feelsLike: 75,
    uvIndex: 6
  };

  // Mock sensor data
  const sensorData = [
    {
      id: 1,
      type: 'Soil Moisture',
      value: 45,
      unit: '%',
      status: 'Warning',
      optimalRange: '40-60%',
      lastUpdated: '2 min ago',
      trend: 'down'
    },
    {
      id: 2,
      type: 'Temperature',
      value: 72,
      unit: '°F',
      status: 'Optimal',
      optimalRange: '65-75°F',
      lastUpdated: '1 min ago',
      trend: 'up'
    },
    {
      id: 3,
      type: 'pH Level',
      value: 6.8,
      unit: '',
      status: 'Optimal',
      optimalRange: '6.0-7.0',
      lastUpdated: '3 min ago',
      trend: 'stable'
    },
    {
      id: 4,
      type: 'Light Intensity',
      value: 850,
      unit: 'lux',
      status: 'Optimal',
      optimalRange: '800-1000 lux',
      lastUpdated: '1 min ago',
      trend: 'up'
    },
    {
      id: 5,
      type: 'Nitrogen',
      value: 25,
      unit: 'ppm',
      status: 'Critical',
      optimalRange: '30-50 ppm',
      lastUpdated: '5 min ago',
      trend: 'down'
    }
  ];

  // Mock alerts data
  const alertsData = [
    {
      id: 1,
      type: 'critical',
      title: 'Low Nitrogen Levels Detected',
      message: 'Nitrogen levels in Field A have dropped below optimal range. Consider applying fertilizer within 24 hours.',
      timestamp: '5 minutes ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Soil Moisture Declining',
      message: 'Soil moisture in greenhouse section is approaching lower threshold. Irrigation may be needed soon.',
      timestamp: '15 minutes ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'Weather Update',
      message: 'Rain expected tomorrow afternoon. Consider adjusting irrigation schedule accordingly.',
      timestamp: '1 hour ago'
    }
  ];

  // Mock emergency alerts
  const emergencyAlerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'Irrigation System Failure',
      message: 'Main irrigation pump has stopped working. Immediate attention required to prevent crop damage.',
      timestamp: '10 minutes ago'
    }
  ];

  // Mock metrics data
  const metricsData = [
    {
      id: 1,
      type: 'Total Sensors',
      value: 24,
      change: 8
    },
    {
      id: 2,
      type: 'Active Alerts',
      value: 3,
      change: -2
    },
    {
      id: 3,
      type: 'Farm Area',
      value: 120,
      unit: 'acres'
    },
    {
      id: 4,
      type: 'Crop Yield',
      value: 95,
      unit: '%',
      change: 12
    },
    {
      id: 5,
      type: 'Water Usage',
      value: 2.4,
      unit: 'k gal',
      change: -15
    },
    {
      id: 6,
      type: 'Energy Saved',
      value: 18,
      unit: '%',
      change: 5
    }
  ];

  // Mock chart data
  const chartData = [
    { time: '00:00', 'Soil Moisture': 48, 'Temperature': 68, 'pH Level': 6.5, 'Light Intensity': 0, 'Nitrogen': 28 },
    { time: '04:00', 'Soil Moisture': 46, 'Temperature': 65, 'pH Level': 6.6, 'Light Intensity': 50, 'Nitrogen': 27 },
    { time: '08:00', 'Soil Moisture': 44, 'Temperature': 70, 'pH Level': 6.7, 'Light Intensity': 400, 'Nitrogen': 26 },
    { time: '12:00', 'Soil Moisture': 42, 'Temperature': 75, 'pH Level': 6.8, 'Light Intensity': 850, 'Nitrogen': 25 },
    { time: '16:00', 'Soil Moisture': 45, 'Temperature': 72, 'pH Level': 6.8, 'Light Intensity': 600, 'Nitrogen': 25 },
    { time: '20:00', 'Soil Moisture': 47, 'Temperature': 69, 'pH Level': 6.7, 'Light Intensity': 200, 'Nitrogen': 24 },
    { time: '24:00', 'Soil Moisture': 45, 'Temperature': 67, 'pH Level': 6.8, 'Light Intensity': 0, 'Nitrogen': 25 }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSensorToggle = (sensor) => {
    setSelectedSensors(prev => 
      prev?.includes(sensor) 
        ? prev?.filter(s => s !== sensor)
        : [...prev, sensor]
    );
  };

  const handleDismissAlert = (alertId) => {
    // Handle alert dismissal
    console.log('Dismissing alert:', alertId);
  };

  const handleViewAlertDetails = (alertId) => {
    // Handle viewing alert details
    console.log('Viewing alert details:', alertId);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleEmergencyDismiss = () => {
    console.log('Emergency banner dismissed');
  };

  const handleEmergencyDetails = (alertId) => {
    console.log('Viewing emergency details:', alertId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Loading skeleton */}
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[...Array(6)]?.map((_, i) => (
                  <div key={i} className="h-48 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="h-96 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard - Smart Farm Guardian</title>
        <meta name="description" content="Monitor your farm's real-time IoT sensor data, AI insights, and performance metrics in one comprehensive dashboard." />
      </Helmet>
      <Header onToggleSidebar={() => {}} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Farm Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Real-time monitoring and insights for your smart farm operations
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth disabled:opacity-50"
              >
                <div className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M3 21v-5h5"/>
                  </svg>
                </div>
                <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>

          {/* Emergency Banner */}
          <EmergencyBanner 
            emergencyAlerts={emergencyAlerts}
            onDismiss={handleEmergencyDismiss}
            onViewDetails={handleEmergencyDetails}
          />

          {/* Top Row - Weather and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <WeatherCard weatherData={weatherData} />
            <QuickActions />
          </div>

          {/* Metrics Row */}
          <div className="mb-8">
            <MetricsCard metrics={metricsData} />
          </div>

          {/* Sensor Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {sensorData?.map((sensor) => (
              <SensorCard key={sensor?.id} sensor={sensor} />
            ))}
          </div>

          {/* Chart and Alerts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="lg:col-span-1">
              <SensorChart 
                chartData={chartData}
                selectedSensors={selectedSensors}
                onSensorToggle={handleSensorToggle}
              />
            </div>
            <div className="lg:col-span-1">
              <AlertCard 
                alerts={alertsData}
                onDismissAlert={handleDismissAlert}
                onViewDetails={handleViewAlertDetails}
              />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>System Online</span>
                </div>
                <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>© {new Date()?.getFullYear()} Smart Farm Guardian</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;