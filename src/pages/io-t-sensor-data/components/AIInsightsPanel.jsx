import React, { useState } from 'react';
import { Brain, Calendar, Target, Zap, ChevronRight } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AIInsightsPanel = ({ sensorData, selectedSensor }) => {
  const [activeTab, setActiveTab] = useState('insights');

  // Mock AI insights based on sensor data patterns
  const generateInsights = () => {
    const insights = [
      {
        id: 1,
        type: 'optimization',
        priority: 'high',
        title: 'Irrigation Schedule Optimization',
        description: 'Soil moisture patterns suggest implementing split irrigation cycles during 6-8 AM and 6-8 PM for 15% better water efficiency.',
        confidence: 92,
        impact: 'Water savings: 240 gallons/week',
        icon: 'Droplets',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        id: 2,
        type: 'prediction',
        priority: 'medium',
        title: 'Nitrogen Depletion Forecast',
        description: 'Current nitrogen consumption rate indicates levels will drop below optimal in 4-6 days. Consider fertilizer application within 48 hours.',
        confidence: 87,
        impact: 'Yield protection: +8% estimated',
        icon: 'Leaf',
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        id: 3,
        type: 'anomaly',
        priority: 'high',
        title: 'Temperature Anomaly Detected',
        description: 'Greenhouse sensors show unusual 3°F temperature spikes every 2 hours. Ventilation system may need maintenance.',
        confidence: 95,
        impact: 'Energy savings: $45/month',
        icon: 'Thermometer',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50'
      },
      {
        id: 4,
        type: 'correlation',
        priority: 'low',
        title: 'pH-Moisture Correlation',
        description: 'Strong correlation detected between pH fluctuations and soil moisture. Consider calcium adjustment to stabilize pH levels.',
        confidence: 78,
        impact: 'Stability improvement: 12%',
        icon: 'TestTube',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50'
      }
    ];

    return insights;
  };

  const generateRecommendations = () => {
    const recommendations = [
      {
        id: 1,
        category: 'Immediate Actions',
        timeframe: 'Next 24 hours',
        actions: [
          { action: 'Check irrigation system pressure in Field A', priority: 'high' },
          { action: 'Apply nitrogen supplement to greenhouse beds', priority: 'high' },
          { action: 'Calibrate pH sensor in orchard section', priority: 'medium' }
        ]
      },
      {
        id: 2,
        category: 'This Week',
        timeframe: '1-7 days',
        actions: [
          { action: 'Schedule ventilation system maintenance', priority: 'medium' },
          { action: 'Adjust light schedule for optimal growth cycles', priority: 'low' },
          { action: 'Review fertilizer application schedule', priority: 'medium' }
        ]
      },
      {
        id: 3,
        category: 'Long-term',
        timeframe: '1-4 weeks',
        actions: [
          { action: 'Consider automated pH adjustment system', priority: 'low' },
          { action: 'Plan crop rotation based on soil metrics', priority: 'medium' },
          { action: 'Upgrade sensors in high-stress areas', priority: 'low' }
        ]
      }
    ];

    return recommendations;
  };

  const insights = generateInsights();
  const recommendations = generateRecommendations();

  const priorityColors = {
    high: 'border-l-destructive text-destructive',
    medium: 'border-l-warning text-warning',
    low: 'border-l-success text-success'
  };

  const actionPriorityColors = {
    high: 'bg-destructive/10 text-destructive border-destructive/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    low: 'bg-success/10 text-success border-success/20'
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft h-fit sticky top-32">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
          <div className="ml-auto">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex rounded-lg border border-border p-1">
          <button
            onClick={() => setActiveTab('insights')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'insights' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Insights
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'recommendations' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Actions
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'insights' ? (
          <div className="space-y-4">
            {insights?.map((insight) => (
              <div 
                key={insight?.id} 
                className={`border-l-4 ${priorityColors?.[insight?.priority]?.split(' ')?.[0]} pl-4 pb-4 border-b border-border last:border-b-0`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${insight?.bgColor} flex-shrink-0`}>
                    <Icon name={insight?.icon} size={16} className={insight?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-foreground text-sm leading-tight">{insight?.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors?.[insight?.priority]?.split(' ')?.[1]} ${priorityColors?.[insight?.priority]?.split(' ')?.[0]}/10`}>
                        {insight?.priority}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      {insight?.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Confidence:</span>
                        <span className="font-medium text-foreground">{insight?.confidence}%</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-success font-medium">{insight?.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
            >
              View Detailed Analysis
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations?.map((category) => (
              <div key={category?.id} className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <h4 className="font-medium text-foreground">{category?.category}</h4>
                  <span className="text-xs text-muted-foreground ml-auto">{category?.timeframe}</span>
                </div>
                
                <div className="space-y-2">
                  {category?.actions?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className={`w-2 h-2 rounded-full ${
                          item?.priority === 'high' ? 'bg-destructive' :
                          item?.priority === 'medium' ? 'bg-warning' : 'bg-success'
                        }`} 
                      />
                      <span className="text-xs text-foreground flex-1">{item?.action}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${actionPriorityColors?.[item?.priority]}`}>
                        {item?.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <Button
              variant="default"
              size="sm"
              className="w-full mt-4"
            >
              <Target className="w-4 h-4 mr-2" />
              Create Action Plan
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>AI Analysis</span>
          </div>
          <span>Updated 2 min ago</span>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;