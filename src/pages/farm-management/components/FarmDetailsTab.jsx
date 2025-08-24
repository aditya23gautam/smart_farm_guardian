import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const FarmDetailsTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [farmData, setFarmData] = useState({
    name: "Green Valley Farm",
    description: "Sustainable organic farming operation specializing in mixed vegetables and fruits with integrated pest management systems.",
    size: "120",
    sizeUnit: "acres",
    location: "Fresno County, California",
    established: "2018",
    owner: "John Farmer",
    email: "john@greenvalleyfarm.com",
    phone: "+1 (555) 123-4567",
    cropTypes: ["tomatoes", "corn", "soybeans"],
    farmingMethod: "organic",
    certifications: ["organic", "sustainable"]
  });

  const [tempData, setTempData] = useState({ ...farmData });

  const sizeUnitOptions = [
    { value: 'acres', label: 'Acres' },
    { value: 'hectares', label: 'Hectares' },
    { value: 'square-feet', label: 'Square Feet' }
  ];

  const farmingMethodOptions = [
    { value: 'organic', label: 'Organic' },
    { value: 'conventional', label: 'Conventional' },
    { value: 'sustainable', label: 'Sustainable' },
    { value: 'hydroponic', label: 'Hydroponic' },
    { value: 'permaculture', label: 'Permaculture' }
  ];

  const cropTypeOptions = [
    { value: 'tomatoes', label: 'Tomatoes' },
    { value: 'corn', label: 'Corn' },
    { value: 'soybeans', label: 'Soybeans' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'potatoes', label: 'Potatoes' },
    { value: 'lettuce', label: 'Lettuce' },
    { value: 'carrots', label: 'Carrots' },
    { value: 'apples', label: 'Apples' },
    { value: 'grapes', label: 'Grapes' }
  ];

  const certificationOptions = [
    { value: 'organic', label: 'USDA Organic' },
    { value: 'sustainable', label: 'Sustainable Agriculture' },
    { value: 'fair-trade', label: 'Fair Trade' },
    { value: 'rainforest', label: 'Rainforest Alliance' },
    { value: 'non-gmo', label: 'Non-GMO Project' }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...farmData });
  };

  const handleSave = () => {
    setFarmData({ ...tempData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...farmData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, values) => {
    setTempData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Farm Details</h2>
          <p className="text-muted-foreground mt-1">Manage your farm profile and basic information</p>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} iconName="Save" iconPosition="left">
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit} iconName="Edit" iconPosition="left">
              Edit Details
            </Button>
          )}
        </div>
      </div>
      {/* Farm Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Home" size={20} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
          </div>
          
          <div className="space-y-4">
            <Input
              label="Farm Name"
              value={isEditing ? tempData?.name : farmData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              disabled={!isEditing}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Farm Size"
                type="number"
                value={isEditing ? tempData?.size : farmData?.size}
                onChange={(e) => handleInputChange('size', e?.target?.value)}
                disabled={!isEditing}
                required
              />
              <Select
                label="Unit"
                options={sizeUnitOptions}
                value={isEditing ? tempData?.sizeUnit : farmData?.sizeUnit}
                onChange={(value) => handleInputChange('sizeUnit', value)}
                disabled={!isEditing}
              />
            </div>

            <Input
              label="Location"
              value={isEditing ? tempData?.location : farmData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              disabled={!isEditing}
              required
            />

            <Input
              label="Year Established"
              type="number"
              value={isEditing ? tempData?.established : farmData?.established}
              onChange={(e) => handleInputChange('established', e?.target?.value)}
              disabled={!isEditing}
            />

            <div className="pt-2">
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                rows={4}
                value={isEditing ? tempData?.description : farmData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                disabled={!isEditing}
                placeholder="Describe your farming operation..."
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="User" size={20} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">Contact Information</h3>
          </div>
          
          <div className="space-y-4">
            <Input
              label="Owner Name"
              value={isEditing ? tempData?.owner : farmData?.owner}
              onChange={(e) => handleInputChange('owner', e?.target?.value)}
              disabled={!isEditing}
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              value={isEditing ? tempData?.email : farmData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              disabled={!isEditing}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              value={isEditing ? tempData?.phone : farmData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              disabled={!isEditing}
              required
            />
          </div>
        </div>

        {/* Farming Details */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Sprout" size={20} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">Farming Details</h3>
          </div>
          
          <div className="space-y-4">
            <Select
              label="Farming Method"
              options={farmingMethodOptions}
              value={isEditing ? tempData?.farmingMethod : farmData?.farmingMethod}
              onChange={(value) => handleInputChange('farmingMethod', value)}
              disabled={!isEditing}
            />

            <Select
              label="Crop Types"
              options={cropTypeOptions}
              value={isEditing ? tempData?.cropTypes : farmData?.cropTypes}
              onChange={(values) => handleArrayChange('cropTypes', values)}
              disabled={!isEditing}
              multiple
              searchable
              placeholder="Select crop types"
            />
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Award" size={20} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">Certifications</h3>
          </div>
          
          <div className="space-y-4">
            <Select
              label="Current Certifications"
              options={certificationOptions}
              value={isEditing ? tempData?.certifications : farmData?.certifications}
              onChange={(values) => handleArrayChange('certifications', values)}
              disabled={!isEditing}
              multiple
              searchable
              placeholder="Select certifications"
            />

            {/* Certification Status Display */}
            <div className="pt-2">
              <p className="text-sm font-medium text-foreground mb-3">Certification Status</p>
              <div className="flex flex-wrap gap-2">
                {(isEditing ? tempData?.certifications : farmData?.certifications)?.map((cert) => {
                  const certOption = certificationOptions?.find(opt => opt?.value === cert);
                  return (
                    <span
                      key={cert}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20"
                    >
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      {certOption?.label || cert}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Farm Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">Farm Statistics</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{farmData?.size}</div>
            <div className="text-sm text-muted-foreground">{farmData?.sizeUnit}</div>
            <div className="text-xs text-muted-foreground mt-1">Total Area</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-secondary">{farmData?.cropTypes?.length}</div>
            <div className="text-sm text-muted-foreground">Crop Types</div>
            <div className="text-xs text-muted-foreground mt-1">Currently Growing</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-accent">{new Date()?.getFullYear() - parseInt(farmData?.established)}</div>
            <div className="text-sm text-muted-foreground">Years</div>
            <div className="text-xs text-muted-foreground mt-1">In Operation</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-success">{farmData?.certifications?.length}</div>
            <div className="text-sm text-muted-foreground">Certifications</div>
            <div className="text-xs text-muted-foreground mt-1">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmDetailsTab;