import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LocationsTab = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: '',
    type: 'field',
    coordinates: { lat: '', lng: '' },
    area: '',
    description: ''
  });

  const locations = [
    {
      id: 'field-a',
      name: 'Field A - North Section',
      type: 'field',
      coordinates: { lat: 36.7783, lng: -119.4179 },
      area: '25 acres',
      cropType: 'Tomatoes',
      sensors: ['SOIL001', 'LIGHT005'],
      description: 'Primary tomato cultivation area with drip irrigation system',
      status: 'active'
    },
    {
      id: 'field-b',
      name: 'Field B - Central',
      type: 'field',
      coordinates: { lat: 36.7785, lng: -119.4181 },
      area: '30 acres',
      cropType: 'Corn',
      sensors: ['TEMP002'],
      description: 'Main corn production field with center pivot irrigation',
      status: 'active'
    },
    {
      id: 'field-c',
      name: 'Field C - South Section',
      type: 'field',
      coordinates: { lat: 36.7789, lng: -119.4185 },
      area: '20 acres',
      cropType: 'Soybeans',
      sensors: ['PH004'],
      description: 'Soybean rotation field with organic certification',
      status: 'fallow'
    },
    {
      id: 'greenhouse-1',
      name: 'Greenhouse Section 1',
      type: 'greenhouse',
      coordinates: { lat: 36.7787, lng: -119.4183 },
      area: '5,000 sq ft',
      cropType: 'Mixed Vegetables',
      sensors: ['HUM003'],
      description: 'Climate-controlled greenhouse for year-round production',
      status: 'active'
    },
    {
      id: 'weather-station',
      name: 'Weather Station',
      type: 'infrastructure',
      coordinates: { lat: 36.7793, lng: -119.4189 },
      area: '100 sq ft',
      cropType: 'N/A',
      sensors: ['WIND006'],
      description: 'Central weather monitoring station',
      status: 'active'
    }
  ];

  const locationTypeOptions = [
    { value: 'field', label: 'Field' },
    { value: 'greenhouse', label: 'Greenhouse' },
    { value: 'orchard', label: 'Orchard' },
    { value: 'pasture', label: 'Pasture' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'storage', label: 'Storage' }
  ];

  const getLocationIcon = (type) => {
    switch (type) {
      case 'field': return 'Wheat';
      case 'greenhouse': return 'Home';
      case 'orchard': return 'TreePine';
      case 'pasture': return 'Grass';
      case 'infrastructure': return 'Building';
      case 'storage': return 'Warehouse';
      default: return 'MapPin';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10 border-success/20';
      case 'fallow': return 'text-warning bg-warning/10 border-warning/20';
      case 'maintenance': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleAddLocation = () => {
    setIsAddingLocation(true);
    setNewLocation({
      name: '',
      type: 'field',
      coordinates: { lat: '', lng: '' },
      area: '',
      description: ''
    });
  };

  const handleSaveLocation = () => {
    // Add location logic here
    console.log('Adding new location:', newLocation);
    setIsAddingLocation(false);
    setNewLocation({
      name: '',
      type: 'field',
      coordinates: { lat: '', lng: '' },
      area: '',
      description: ''
    });
  };

  const handleCancelAdd = () => {
    setIsAddingLocation(false);
    setNewLocation({
      name: '',
      type: 'field',
      coordinates: { lat: '', lng: '' },
      area: '',
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Farm Locations</h2>
          <p className="text-muted-foreground mt-1">Manage field boundaries, sensor placement, and crop zones</p>
        </div>
        <Button onClick={handleAddLocation} iconName="Plus" iconPosition="left">
          Add New Location
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Locations List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-medium text-foreground">Locations</h3>
          
          {/* Add New Location Form */}
          {isAddingLocation && (
            <div className="bg-card border border-border rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-foreground">Add New Location</h4>
              
              <Input
                label="Location Name"
                value={newLocation?.name}
                onChange={(e) => setNewLocation(prev => ({ ...prev, name: e?.target?.value }))}
                placeholder="Enter location name"
                required
              />
              
              <Select
                label="Location Type"
                options={locationTypeOptions}
                value={newLocation?.type}
                onChange={(value) => setNewLocation(prev => ({ ...prev, type: value }))}
              />
              
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Latitude"
                  type="number"
                  step="any"
                  value={newLocation?.coordinates?.lat}
                  onChange={(e) => setNewLocation(prev => ({ 
                    ...prev, 
                    coordinates: { ...prev?.coordinates, lat: e?.target?.value }
                  }))}
                  placeholder="36.7783"
                />
                <Input
                  label="Longitude"
                  type="number"
                  step="any"
                  value={newLocation?.coordinates?.lng}
                  onChange={(e) => setNewLocation(prev => ({ 
                    ...prev, 
                    coordinates: { ...prev?.coordinates, lng: e?.target?.value }
                  }))}
                  placeholder="-119.4179"
                />
              </div>
              
              <Input
                label="Area"
                value={newLocation?.area}
                onChange={(e) => setNewLocation(prev => ({ ...prev, area: e?.target?.value }))}
                placeholder="e.g., 25 acres"
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground resize-none"
                  rows={3}
                  value={newLocation?.description}
                  onChange={(e) => setNewLocation(prev => ({ ...prev, description: e?.target?.value }))}
                  placeholder="Describe this location..."
                />
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleSaveLocation} size="sm">Save</Button>
                <Button variant="outline" onClick={handleCancelAdd} size="sm">Cancel</Button>
              </div>
            </div>
          )}
          
          {/* Existing Locations */}
          <div className="space-y-2">
            {locations?.map((location) => (
              <div
                key={location?.id}
                onClick={() => handleLocationSelect(location)}
                className={`p-4 border rounded-lg cursor-pointer transition-smooth hover:shadow-soft ${
                  selectedLocation?.id === location?.id 
                    ? 'border-primary bg-primary/5' :'border-border bg-card'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getLocationIcon(location?.type)} 
                    size={20} 
                    className={selectedLocation?.id === location?.id ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{location?.name}</h4>
                    <p className="text-sm text-muted-foreground">{location?.area}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(location?.status)}`}>
                        {location?.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {location?.sensors?.length} sensor{location?.sensors?.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Interactive Map */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-medium text-foreground">Farm Map</h3>
              <p className="text-sm text-muted-foreground">Click on locations to view details and manage sensors</p>
            </div>
            
            <div className="relative h-96">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Farm Location Map"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${selectedLocation?.coordinates?.lat || 36.7785},${selectedLocation?.coordinates?.lng || -119.4181}&z=16&output=embed`}
                className="border-0"
              />
              
              {/* Map Overlay Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Button variant="outline" size="sm" iconName="ZoomIn">
                  Zoom In
                </Button>
                <Button variant="outline" size="sm" iconName="ZoomOut">
                  Zoom Out
                </Button>
                <Button variant="outline" size="sm" iconName="Maximize">
                  Fullscreen
                </Button>
              </div>
            </div>
          </div>

          {/* Location Details */}
          {selectedLocation && (
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <Icon name={getLocationIcon(selectedLocation?.type)} size={24} className="text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{selectedLocation?.name}</h3>
                    <p className="text-muted-foreground">{selectedLocation?.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" iconName="Edit">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" iconName="Settings">
                    Configure
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location Info */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Location Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="text-foreground capitalize">{selectedLocation?.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Area:</span>
                        <span className="text-foreground">{selectedLocation?.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Crop Type:</span>
                        <span className="text-foreground">{selectedLocation?.cropType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedLocation?.status)}`}>
                          {selectedLocation?.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Coordinates:</span>
                        <span className="text-foreground text-xs">
                          {selectedLocation?.coordinates?.lat}, {selectedLocation?.coordinates?.lng}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sensors */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Connected Sensors</h4>
                    <Button variant="outline" size="sm" iconName="Plus">
                      Add Sensor
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {selectedLocation?.sensors?.map((sensorId) => (
                      <div key={sensorId} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Icon name="Sensors" size={16} className="text-primary" />
                          <span className="text-sm font-medium text-foreground">{sensorId}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-success rounded-full"></span>
                          <span className="text-xs text-muted-foreground">Online</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No Location Selected */}
          {!selectedLocation && (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Select a Location</h3>
              <p className="text-muted-foreground">
                Choose a location from the list to view details and manage sensors
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Farm Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">{locations?.length}</div>
          <div className="text-sm text-muted-foreground">Total Locations</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">
            {locations?.reduce((sum, loc) => sum + loc?.sensors?.length, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Active Sensors</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-secondary">
            {locations?.filter(loc => loc?.status === 'active')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Active Fields</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent">120</div>
          <div className="text-sm text-muted-foreground">Total Acres</div>
        </div>
      </div>
    </div>
  );
};

export default LocationsTab;