import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EarnRewards = () => {
  const rewardOpportunities = [
    {
      id: 1,
      category: 'Water Conservation',
      title: 'Smart Irrigation Usage',
      description: 'Use IoT sensors to optimize water usage and reduce consumption by 10%',
      estimatedReward: '15-30',
      difficulty: 'Easy',
      timeframe: '1 week',
      icon: 'Droplets',
      color: 'bg-blue-500',
      requirements: [
        'Install soil moisture sensors',
        'Reduce water usage by 10%',
        'Submit usage reports'
      ]
    },
    {
      id: 2,
      category: 'Organic Farming',
      title: 'Pesticide-Free Certification',
      description: 'Complete organic farming practices and get certified for pesticide-free produce',
      estimatedReward: '80-120',
      difficulty: 'Medium',
      timeframe: '3 months',
      icon: 'Leaf',
      color: 'bg-green-500',
      requirements: [
        'No synthetic pesticides for 90 days',
        'Soil testing verification',
        'Third-party inspection'
      ]
    },
    {
      id: 3,
      category: 'Carbon Reduction',
      title: 'Renewable Energy Adoption',
      description: 'Install solar panels or wind turbines to power farm operations',
      estimatedReward: '100-200',
      difficulty: 'Hard',
      timeframe: '6 months',
      icon: 'Zap',
      color: 'bg-yellow-500',
      requirements: [
        'Install renewable energy system',
        'Reduce grid dependency by 50%',
        'Energy audit verification'
      ]
    },
    {
      id: 4,
      category: 'Knowledge Sharing',
      title: 'Community Education',
      description: 'Share sustainable farming techniques with other farmers in the community',
      estimatedReward: '10-25',
      difficulty: 'Easy',
      timeframe: '1 month',
      icon: 'Users',
      color: 'bg-purple-500',
      requirements: [
        'Host 2 educational sessions',
        'Share best practices online',
        'Mentor new farmers'
      ]
    },
    {
      id: 5,
      category: 'Soil Health',
      title: 'Cover Crop Implementation',
      description: 'Plant cover crops to improve soil health and prevent erosion',
      estimatedReward: '40-60',
      difficulty: 'Medium',
      timeframe: '4 months',
      icon: 'Mountain',
      color: 'bg-amber-500',
      requirements: [
        'Plant cover crops on 25% of land',
        'Soil health testing',
        'Document improvement metrics'
      ]
    },
    {
      id: 6,
      category: 'Biodiversity',
      title: 'Pollinator Habitat Creation',
      description: 'Create habitats for bees and other pollinators to support ecosystem health',
      estimatedReward: '30-50',
      difficulty: 'Easy',
      timeframe: '2 months',
      icon: 'Flower',
      color: 'bg-pink-500',
      requirements: [
        'Plant native flowering plants',
        'Install bee houses',
        'Document pollinator activity'
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Earn Rewards</h3>
            <p className="text-sm text-muted-foreground">Complete sustainable farming activities to earn SFG tokens</p>
          </div>
          <Button variant="outline" size="sm" iconName="TrendingUp" iconPosition="left">
            View All
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {rewardOpportunities?.map((opportunity) => (
          <div key={opportunity?.id} className="border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
            <div className="flex items-start space-x-4 mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${opportunity?.color}`}>
                <Icon name={opportunity?.icon} size={24} color="white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {opportunity?.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(opportunity?.difficulty)}`}>
                    {opportunity?.difficulty}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">{opportunity?.title}</h4>
                <p className="text-sm text-muted-foreground">{opportunity?.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Estimated Reward</p>
                <p className="font-semibold text-foreground">{opportunity?.estimatedReward} SFG</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Timeframe</p>
                <p className="font-semibold text-foreground">{opportunity?.timeframe}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-foreground mb-2">Requirements:</p>
              <ul className="space-y-1">
                {opportunity?.requirements?.map((requirement, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Check" size={14} className="text-success" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="default" className="w-full" iconName="ArrowRight" iconPosition="right">
              Start Activity
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarnRewards;