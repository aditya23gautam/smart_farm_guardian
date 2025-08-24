import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FarmDetailsTab from './components/FarmDetailsTab';
import SensorsTab from './components/SensorsTab';
import LocationsTab from './components/LocationsTab';

const FarmManagement = () => {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    {
      id: 'details',
      label: 'Farm Details',
      icon: 'Home',
      component: FarmDetailsTab
    },
    {
      id: 'sensors',
      label: 'Sensors',
      icon: 'Sensors',
      component: SensorsTab
    },
    {
      id: 'locations',
      label: 'Locations',
      icon: 'MapPin',
      component: LocationsTab
    }
  ];

  const ActiveComponent = tabs?.find(tab => tab?.id === activeTab)?.component;

  return (
    <>
      <Helmet>
        <title>Farm Management - Smart Farm Guardian</title>
        <meta name="description" content="Comprehensive farm profile administration, sensor configuration, and location mapping for optimal agricultural monitoring" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
              <Icon name="Home" size={16} />
              <span>Dashboard</span>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground font-medium">Farm Management</span>
            </nav>

            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                  <Icon name="Tractor" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Farm Management</h1>
                  <p className="text-muted-foreground">
                    Comprehensive farm administration and monitoring dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-border mb-8">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <Button
                    key={tab?.id}
                    variant="ghost"
                    onClick={() => setActiveTab(tab?.id)}
                    iconName={tab?.icon}
                    iconPosition="left"
                    iconSize={18}
                    className={`px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    {tab?.label}
                  </Button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in-50 duration-200">
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default FarmManagement;