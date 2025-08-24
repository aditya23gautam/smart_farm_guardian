import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';

const Header = ({ isCollapsed = false, onToggleSidebar }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState('main-farm');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'Soil moisture low in Field A', time: '5 min ago' },
    { id: 2, type: 'success', message: 'Irrigation system activated', time: '15 min ago' },
    { id: 3, type: 'info', message: 'Weather alert: Rain expected', time: '1 hour ago' }
  ]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const farmOptions = [
    { value: 'main-farm', label: 'Main Farm (120 acres)' },
    { value: 'north-field', label: 'North Field (85 acres)' },
    { value: 'greenhouse', label: 'Greenhouse Complex' },
    { value: 'orchard', label: 'Apple Orchard (45 acres)' }
  ];

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Farm Management', path: '/farm-management', icon: 'Tractor' },
    { label: 'IoT Sensors', path: '/io-t-sensor-data', icon: 'Sensors' },
    { label: 'AI Insights', path: '/ai-insights', icon: 'Brain' },
    { label: 'Blockchain Rewards', path: '/blockchain-rewards', icon: 'Coins' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };

  const handleFarmChange = (value) => {
    setSelectedFarm(value);
  };

  const clearNotification = (id) => {
    setNotifications(notifications?.filter(notif => notif?.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      default: return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      default: return 'text-secondary';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.notification-dropdown') && !event?.target?.closest('.notification-trigger')) {
        setIsNotificationOpen(false);
      }
      if (!event?.target?.closest('.profile-dropdown') && !event?.target?.closest('.profile-trigger')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Sprout" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-foreground">Smart Farm Guardian</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <Button
                  key={item?.path}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={18}
                  className="px-4 py-2"
                >
                  {item?.label}
                </Button>
              );
            })}
          </nav>
        </div>

        {/* Right Section - Farm Selector, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Farm Selector */}
          <div className="hidden md:block min-w-[200px]">
            <Select
              options={farmOptions}
              value={selectedFarm}
              onChange={handleFarmChange}
              placeholder="Select farm"
              className="text-sm"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="notification-trigger relative"
            >
              <Icon name="Bell" size={20} />
              {notifications?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-warning text-warning-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications?.length}
                </span>
              )}
            </Button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="notification-dropdown absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-elevated z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-foreground">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications?.length > 0 ? (
                    notifications?.map((notification) => (
                      <div key={notification?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted transition-smooth">
                        <div className="flex items-start space-x-3">
                          <Icon 
                            name={getNotificationIcon(notification?.type)} 
                            size={18} 
                            className={getNotificationColor(notification?.type)}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground">{notification?.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => clearNotification(notification?.id)}
                            className="w-6 h-6"
                          >
                            <Icon name="X" size={14} />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No new notifications</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={handleProfileClick}
              className="profile-trigger flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium">John Farmer</span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="profile-dropdown absolute right-0 top-12 w-56 bg-popover border border-border rounded-lg shadow-elevated z-50">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-foreground">John Farmer</p>
                  <p className="text-sm text-muted-foreground">john@smartfarm.com</p>
                </div>
                <div className="py-2">
                  <Button variant="ghost" className="w-full justify-start px-4 py-2" iconName="User" iconPosition="left">
                    Profile Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start px-4 py-2" iconName="Settings" iconPosition="left">
                    Account Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start px-4 py-2" iconName="HelpCircle" iconPosition="left">
                    Help & Support
                  </Button>
                  <div className="border-t border-border mt-2 pt-2">
                    <Button variant="ghost" className="w-full justify-start px-4 py-2 text-error" iconName="LogOut" iconPosition="left">
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-elevated">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Farm Selector */}
            <div className="mb-4">
              <Select
                options={farmOptions}
                value={selectedFarm}
                onChange={handleFarmChange}
                placeholder="Select farm"
                className="text-sm"
              />
            </div>
            
            {/* Mobile Navigation Items */}
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <Button
                  key={item?.path}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={18}
                  className="w-full justify-start px-4 py-3"
                >
                  {item?.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;