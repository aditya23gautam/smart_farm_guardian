import React from 'react';
import Icon from '../../../components/AppIcon';

const InsightStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Active Insights',
      value: stats?.activeInsights,
      icon: 'Brain',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'High Priority',
      value: stats?.highPriority,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      label: 'Implemented Today',
      value: stats?.implementedToday,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Avg Confidence',
      value: `${stats?.avgConfidence}%`,
      icon: 'Target',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems?.map((item, index) => (
        <div key={index} className={`${item?.bgColor} rounded-lg p-4 border border-border/50`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{item?.label}</p>
              <p className={`text-2xl font-semibold ${item?.color}`}>{item?.value}</p>
            </div>
            <div className={`p-3 rounded-full ${item?.bgColor} border border-border/20`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InsightStats;