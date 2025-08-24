import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriorityAlerts = ({ alerts, onDismissAlert, onViewAlert }) => {
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Bell';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-l-error bg-error/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  const getIconColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  if (alerts?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">All Clear!</h3>
        <p className="text-muted-foreground">No priority alerts at this time. Your farm is operating optimally.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="AlertTriangle" size={24} className="text-warning mr-2" />
          Priority Alerts ({alerts?.length})
        </h2>
        <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
          Refresh
        </Button>
      </div>
      <div className="grid gap-4">
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`border-l-4 rounded-lg p-4 ${getSeverityColor(alert?.severity)} transition-smooth hover:shadow-soft`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <Icon 
                  name={getSeverityIcon(alert?.severity)} 
                  size={20} 
                  className={`mt-0.5 ${getIconColor(alert?.severity)}`} 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">{alert?.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{alert?.message}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {alert?.location}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Clock" size={12} className="mr-1" />
                      {alert?.timestamp}
                    </span>
                    <span className="flex items-center">
                      <Icon name="TrendingDown" size={12} className="mr-1" />
                      Impact: {alert?.estimatedImpact}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewAlert(alert?.id)}
                  iconName="Eye"
                  iconPosition="left"
                  iconSize={14}
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismissAlert(alert?.id)}
                  iconName="X"
                  iconSize={14}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityAlerts;