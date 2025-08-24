import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RewardActivities = () => {
  const activities = [
    {
      id: 1,
      type: 'water_conservation',
      title: 'Water Conservation Achievement',
      description: 'Reduced water usage by 15% this month',
      reward: 25.5,
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      txHash: '0x1234...5678',
      icon: 'Droplets',
      color: 'text-blue-500'
    },
    {
      id: 2,
      type: 'organic_certification',
      title: 'Organic Farming Certification',
      description: 'Completed organic farming practices verification',
      reward: 100.0,
      status: 'pending',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      txHash: '0x9876...4321',
      icon: 'Leaf',
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'carbon_reduction',
      title: 'Carbon Footprint Reduction',
      description: 'Achieved 20% reduction in carbon emissions',
      reward: 75.0,
      status: 'completed',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      txHash: '0xabcd...efgh',
      icon: 'TreePine',
      color: 'text-green-600'
    },
    {
      id: 4,
      type: 'knowledge_sharing',
      title: 'Community Knowledge Sharing',
      description: 'Shared sustainable farming techniques with community',
      reward: 15.0,
      status: 'completed',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      txHash: '0x5555...9999',
      icon: 'Users',
      color: 'text-purple-500'
    },
    {
      id: 5,
      type: 'soil_health',
      title: 'Soil Health Improvement',
      description: 'Implemented soil conservation practices',
      reward: 50.0,
      status: 'failed',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      txHash: '0x7777...3333',
      icon: 'Mountain',
      color: 'text-amber-500'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const formatReward = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
          <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
            Filter
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-6 hover:bg-muted/50 transition-smooth">
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-muted ${activity?.color}`}>
                <Icon name={activity?.icon} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{activity?.title}</h4>
                    <p className="text-sm text-muted-foreground">{activity?.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-foreground">+{formatReward(activity?.reward)} SFG</p>
                    <p className="text-sm text-muted-foreground">{formatTime(activity?.timestamp)}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity?.status)}`}>
                      <Icon name={getStatusIcon(activity?.status)} size={12} />
                      <span className="capitalize">{activity?.status}</span>
                    </div>
                    
                    {activity?.txHash && (
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Icon name="Hash" size={12} />
                        <span className="font-mono">{activity?.txHash}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 border-t border-border">
        <Button variant="outline" className="w-full" iconName="MoreHorizontal" iconPosition="left">
          View All Activities
        </Button>
      </div>
    </div>
  );
};

export default RewardActivities;