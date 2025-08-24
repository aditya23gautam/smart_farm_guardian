import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: 'Add Sensor Reading',
      description: 'Manually input sensor data',
      icon: 'Plus',
      color: 'bg-primary',
      action: () => navigate('/io-t-sensor-data')
    },
    {
      id: 2,
      title: 'View AI Insights',
      description: 'Check latest recommendations',
      icon: 'Brain',
      color: 'bg-secondary',
      action: () => navigate('/ai-insights')
    },
    {
      id: 3,
      title: 'Manage Farm',
      description: 'Update farm settings',
      icon: 'Settings',
      color: 'bg-accent',
      action: () => navigate('/farm-management')
    },
    {
      id: 4,
      title: 'Check Rewards',
      description: 'View blockchain rewards',
      icon: 'Coins',
      color: 'bg-warning',
      action: () => navigate('/blockchain-rewards')
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            className="group p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth cursor-pointer"
            onClick={action?.action}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${action?.color} group-hover:scale-110 transition-smooth`}>
                <Icon name={action?.icon} size={20} color="white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                  {action?.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {action?.description}
                </p>
              </div>
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary transition-smooth" 
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full" 
          iconName="MoreHorizontal" 
          iconPosition="left"
        >
          View All Actions
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;