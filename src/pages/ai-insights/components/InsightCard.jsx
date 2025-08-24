import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsightCard = ({ insight, onMarkImplemented, onRemindLater, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error text-error-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'irrigation': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pest-management': return 'bg-red-100 text-red-800 border-red-200';
      case 'harvesting': return 'bg-green-100 text-green-800 border-green-200';
      case 'sustainability': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'irrigation': return 'Droplets';
      case 'pest-management': return 'Bug';
      case 'harvesting': return 'Scissors';
      case 'sustainability': return 'Leaf';
      default: return 'Info';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-elevated transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(insight?.severity)}`}>
            {insight?.severity?.toUpperCase()}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(insight?.category)}`}>
            <Icon name={getCategoryIcon(insight?.category)} size={12} className="inline mr-1" />
            {insight?.category?.replace('-', ' ')?.toUpperCase()}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {insight?.timestamp}
        </div>
      </div>
      {/* Title and Description */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">{insight?.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {insight?.description}
        </p>
      </div>
      {/* Confidence Score */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Confidence:</span>
          <span className={`text-sm font-medium ${getConfidenceColor(insight?.confidence)}`}>
            {insight?.confidence}%
          </span>
          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                insight?.confidence >= 80 ? 'bg-success' : 
                insight?.confidence >= 60 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${insight?.confidence}%` }}
            />
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Impact: <span className="font-medium text-foreground">{insight?.impact}</span>
        </div>
      </div>
      {/* Suggested Actions */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Suggested Actions:</h4>
        <ul className="space-y-1">
          {insight?.actions?.slice(0, isExpanded ? insight?.actions?.length : 2)?.map((action, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
              <Icon name="CheckCircle2" size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>{action?.description}</span>
              {action?.timeline && (
                <span className="text-xs bg-muted px-2 py-0.5 rounded ml-auto">
                  {action?.timeline}
                </span>
              )}
            </li>
          ))}
        </ul>
        {insight?.actions?.length > 2 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 p-0 h-auto text-xs"
          >
            {isExpanded ? 'Show Less' : `Show ${insight?.actions?.length - 2} More Actions`}
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={14} className="ml-1" />
          </Button>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
        <Button
          variant="default"
          size="sm"
          onClick={() => onMarkImplemented(insight?.id)}
          iconName="Check"
          iconPosition="left"
          iconSize={14}
        >
          Mark as Implemented
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRemindLater(insight?.id)}
          iconName="Clock"
          iconPosition="left"
          iconSize={14}
        >
          Remind Later
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails(insight?.id)}
          iconName="ExternalLink"
          iconPosition="left"
          iconSize={14}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default InsightCard;