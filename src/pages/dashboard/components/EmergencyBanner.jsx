import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyBanner = ({ emergencyAlerts, onDismiss, onViewDetails }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!emergencyAlerts || emergencyAlerts?.length === 0 || !isVisible) {
    return null;
  }

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  const criticalAlert = emergencyAlerts?.find(alert => alert?.severity === 'critical') || emergencyAlerts?.[0];

  return (
    <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Icon name="AlertTriangle" size={24} className="text-error animate-pulse" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-error">Emergency Alert</h3>
            <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
              {emergencyAlerts?.length}
            </span>
          </div>
          
          <p className="text-foreground font-medium mb-1">{criticalAlert?.title}</p>
          <p className="text-muted-foreground text-sm mb-3">{criticalAlert?.message}</p>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="destructive"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onViewDetails && onViewDetails(criticalAlert?.id)}
            >
              View Details
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              className="border-error text-error hover:bg-error hover:text-error-foreground"
            >
              Contact Support
            </Button>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="Clock" size={14} className="mr-1" />
              <span>{criticalAlert?.timestamp}</span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="flex-shrink-0 text-muted-foreground hover:text-foreground"
        >
          <Icon name="X" size={20} />
        </Button>
      </div>
      {emergencyAlerts?.length > 1 && (
        <div className="mt-3 pt-3 border-t border-error/20">
          <p className="text-sm text-muted-foreground">
            +{emergencyAlerts?.length - 1} more critical alert{emergencyAlerts?.length > 2 ? 's' : ''} require attention
          </p>
        </div>
      )}
    </div>
  );
};

export default EmergencyBanner;