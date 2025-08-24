import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertCard = ({ alerts, onDismissAlert, onViewDetails }) => {
  const getAlertIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      case 'success':
        return 'CheckCircle';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'info':
        return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  if (!alerts || alerts?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">AI Alerts</h3>
          <Icon name="Brain" size={20} className="text-primary" />
        </div>
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
          <p className="text-muted-foreground">All systems running optimally</p>
          <p className="text-sm text-muted-foreground mt-1">No alerts at this time</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">AI Alerts</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} className="text-primary" />
          <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
            {alerts?.length}
          </span>
        </div>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts?.map((alert) => (
          <div 
            key={alert?.id} 
            className={`p-4 rounded-lg border ${getAlertColor(alert?.type)}`}
          >
            <div className="flex items-start space-x-3">
              <Icon 
                name={getAlertIcon(alert?.type)} 
                size={20} 
                className={alert?.type === 'critical' ? 'text-error' : 
                          alert?.type === 'warning' ? 'text-warning' : 
                          alert?.type === 'success' ? 'text-success' : 'text-secondary'} 
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">{alert?.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{alert?.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{alert?.timestamp}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onViewDetails(alert?.id)}
                      className="text-xs"
                    >
                      Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onDismissAlert(alert?.id)}
                      className="text-xs"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full" 
          iconName="Eye" 
          iconPosition="left"
          onClick={() => onViewDetails('all')}
        >
          View All Alerts
        </Button>
      </div>
    </div>
  );
};

export default AlertCard;