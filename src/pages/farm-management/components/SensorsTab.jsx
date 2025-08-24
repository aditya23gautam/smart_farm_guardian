import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SensorsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSensors, setSelectedSensors] = useState([]);

  const sensors = [
    {
      id: 'SOIL001',
      name: 'Soil Moisture Sensor A1',
      type: 'Soil Moisture',
      location: 'Field A - North Section',
      status: 'online',
      batteryLevel: 85,
      lastReading: '2 minutes ago',
      value: '65%',
      coordinates: { lat: 36.7783, lng: -119.4179 },
      installDate: '2024-03-15',
      calibrationDue: '2024-09-15'
    },
    {
      id: 'TEMP002',
      name: 'Temperature Sensor B2',
      type: 'Temperature',
      location: 'Field B - Central',
      status: 'online',
      batteryLevel: 72,
      lastReading: '1 minute ago',
      value: '24°C',
      coordinates: { lat: 36.7785, lng: -119.4181 },
      installDate: '2024-03-20',
      calibrationDue: '2024-09-20'
    },
    {
      id: 'HUM003',
      name: 'Humidity Sensor C3',
      type: 'Humidity',
      location: 'Greenhouse Section 1',
      status: 'maintenance',
      batteryLevel: 45,
      lastReading: '2 hours ago',
      value: '78%',
      coordinates: { lat: 36.7787, lng: -119.4183 },
      installDate: '2024-02-10',
      calibrationDue: '2024-08-10'
    },
    {
      id: 'PH004',
      name: 'pH Sensor D4',
      type: 'pH Level',
      location: 'Field C - South Section',
      status: 'offline',
      batteryLevel: 12,
      lastReading: '6 hours ago',
      value: '6.8',
      coordinates: { lat: 36.7789, lng: -119.4185 },
      installDate: '2024-01-25',
      calibrationDue: '2024-07-25'
    },
    {
      id: 'LIGHT005',
      name: 'Light Sensor E5',
      type: 'Light Intensity',
      location: 'Field A - East Section',
      status: 'online',
      batteryLevel: 91,
      lastReading: '30 seconds ago',
      value: '45,000 lux',
      coordinates: { lat: 36.7791, lng: -119.4187 },
      installDate: '2024-04-01',
      calibrationDue: '2024-10-01'
    },
    {
      id: 'WIND006',
      name: 'Wind Speed Sensor F6',
      type: 'Wind Speed',
      location: 'Weather Station',
      status: 'online',
      batteryLevel: 68,
      lastReading: '45 seconds ago',
      value: '12 km/h',
      coordinates: { lat: 36.7793, lng: -119.4189 },
      installDate: '2024-03-05',
      calibrationDue: '2024-09-05'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-success bg-success/10 border-success/20';
      case 'offline': return 'text-error bg-error/10 border-error/20';
      case 'maintenance': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return 'CheckCircle';
      case 'offline': return 'XCircle';
      case 'maintenance': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const getBatteryColor = (level) => {
    if (level > 60) return 'text-success';
    if (level > 30) return 'text-warning';
    return 'text-error';
  };

  const getBatteryIcon = (level) => {
    if (level > 75) return 'Battery';
    if (level > 50) return 'Battery';
    if (level > 25) return 'Battery';
    return 'BatteryLow';
  };

  const filteredSensors = sensors?.filter(sensor => {
    const matchesSearch = sensor?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         sensor?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         sensor?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sensor?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSensorSelect = (sensorId) => {
    setSelectedSensors(prev => 
      prev?.includes(sensorId) 
        ? prev?.filter(id => id !== sensorId)
        : [...prev, sensorId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSensors?.length === filteredSensors?.length) {
      setSelectedSensors([]);
    } else {
      setSelectedSensors(filteredSensors?.map(sensor => sensor?.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on sensors:`, selectedSensors);
    // Implement bulk actions here
    setSelectedSensors([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">IoT Sensors</h2>
          <p className="text-muted-foreground mt-1">Monitor and manage your connected sensors</p>
        </div>
        <Button iconName="Plus" iconPosition="left">
          Add New Sensor
        </Button>
      </div>
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search sensors by name, type, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="sm:w-48">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedSensors?.length > 0 && (
        <div className="bg-muted border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedSensors?.length} sensor{selectedSensors?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleBulkAction('calibrate')}>
                Calibrate
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleBulkAction('export')}>
                Export Data
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleBulkAction('maintenance')}>
                Schedule Maintenance
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Sensors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSensors?.map((sensor) => (
          <div key={sensor?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
            {/* Sensor Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={selectedSensors?.includes(sensor?.id)}
                  onChange={() => handleSensorSelect(sensor?.id)}
                  className="mt-1 rounded border-border"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{sensor?.name}</h3>
                  <p className="text-sm text-muted-foreground">{sensor?.type}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(sensor?.status)}`}>
                <Icon name={getStatusIcon(sensor?.status)} size={12} className="mr-1" />
                {sensor?.status}
              </span>
            </div>

            {/* Sensor Details */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{sensor?.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name={getBatteryIcon(sensor?.batteryLevel)} size={16} className={getBatteryColor(sensor?.batteryLevel)} />
                  <span className="text-sm text-foreground">{sensor?.batteryLevel}%</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {sensor?.lastReading}
                </div>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Reading</span>
                  <span className="text-lg font-semibold text-foreground">{sensor?.value}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <span className="block">Installed</span>
                  <span className="text-foreground">{new Date(sensor.installDate)?.toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="block">Calibration Due</span>
                  <span className="text-foreground">{new Date(sensor.calibrationDue)?.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Sensor Actions */}
            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
              <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
                Configure
              </Button>
              <Button variant="outline" size="sm" iconName="BarChart3" iconPosition="left">
                View Data
              </Button>
              <Button variant="ghost" size="sm" iconName="Download">
                Export
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredSensors?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Sensors" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No sensors found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== 'all' ?'Try adjusting your search or filter criteria' :'Get started by adding your first IoT sensor'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Button iconName="Plus" iconPosition="left">
              Add Your First Sensor
            </Button>
          )}
        </div>
      )}
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">{sensors?.filter(s => s?.status === 'online')?.length}</div>
          <div className="text-sm text-muted-foreground">Online</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-error">{sensors?.filter(s => s?.status === 'offline')?.length}</div>
          <div className="text-sm text-muted-foreground">Offline</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning">{sensors?.filter(s => s?.status === 'maintenance')?.length}</div>
          <div className="text-sm text-muted-foreground">Maintenance</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">{sensors?.filter(s => s?.batteryLevel < 30)?.length}</div>
          <div className="text-sm text-muted-foreground">Low Battery</div>
        </div>
      </div>
    </div>
  );
};

export default SensorsTab;