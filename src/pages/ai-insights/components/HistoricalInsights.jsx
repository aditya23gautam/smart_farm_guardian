import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const HistoricalInsights = ({ historicalData, onViewDetails }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('implementation-rate');

  const periodOptions = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'quarter', label: 'Last Quarter' },
    { value: 'year', label: 'Last Year' }
  ];

  const metricOptions = [
    { value: 'implementation-rate', label: 'Implementation Rate' },
    { value: 'success-rate', label: 'Success Rate' },
    { value: 'yield-impact', label: 'Yield Impact' },
    { value: 'cost-savings', label: 'Cost Savings' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'implemented': return 'text-success bg-success/10';
      case 'dismissed': return 'text-error bg-error/10';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'implemented': return 'CheckCircle';
      case 'dismissed': return 'XCircle';
      case 'pending': return 'Clock';
      default: return 'Circle';
    }
  };

  const getImpactColor = (impact) => {
    if (impact > 0) return 'text-success';
    if (impact < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const formatImpact = (impact) => {
    if (impact > 0) return `+${impact}%`;
    return `${impact}%`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-foreground flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Historical Insights & Performance
        </h3>
        <div className="flex items-center space-x-3">
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            className="min-w-[140px]"
          />
          <Select
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric}
            className="min-w-[160px]"
          />
        </div>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Insights</p>
              <p className="text-2xl font-semibold text-foreground">{historicalData?.totalInsights}</p>
            </div>
            <Icon name="Brain" size={24} className="text-primary" />
          </div>
        </div>

        <div className="bg-success/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Implemented</p>
              <p className="text-2xl font-semibold text-success">{historicalData?.implemented}</p>
              <p className="text-xs text-muted-foreground">{historicalData?.implementationRate}% rate</p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
        </div>

        <div className="bg-warning/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Success Rate</p>
              <p className="text-2xl font-semibold text-warning">{historicalData?.successRate}%</p>
            </div>
            <Icon name="Target" size={24} className="text-warning" />
          </div>
        </div>

        <div className="bg-secondary/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Yield Impact</p>
              <p className={`text-2xl font-semibold ${getImpactColor(historicalData?.yieldImpact)}`}>
                {formatImpact(historicalData?.yieldImpact)}
              </p>
            </div>
            <Icon name="TrendingUp" size={24} className="text-secondary" />
          </div>
        </div>
      </div>
      {/* Recent Insights List */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Recent Insights</h4>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {historicalData?.recentInsights?.map((insight) => (
            <div key={insight?.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-smooth">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`p-2 rounded-full ${getStatusColor(insight?.status)}`}>
                  <Icon name={getStatusIcon(insight?.status)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-foreground text-sm mb-1">{insight?.title}</h5>
                  <p className="text-xs text-muted-foreground mb-2">{insight?.category} • {insight?.date}</p>
                  {insight?.outcome && (
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="text-muted-foreground">Outcome:</span>
                      <span className={`font-medium ${getImpactColor(insight?.outcome?.yieldChange)}`}>
                        Yield: {formatImpact(insight?.outcome?.yieldChange)}
                      </span>
                      {insight?.outcome?.costSavings && (
                        <span className="text-success font-medium">
                          Saved: ${insight?.outcome?.costSavings}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {insight?.confidence && (
                  <div className="text-xs text-muted-foreground">
                    {insight?.confidence}% confidence
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(insight?.id)}
                  iconName="ExternalLink"
                  iconSize={14}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-border text-center">
        <Button variant="outline" iconName="Archive" iconPosition="left">
          View All Historical Insights
        </Button>
      </div>
    </div>
  );
};

export default HistoricalInsights;