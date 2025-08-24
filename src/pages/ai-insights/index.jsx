import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import InsightCard from './components/InsightCard';
import PriorityAlerts from './components/PriorityAlerts';
import InsightFilters from './components/InsightFilters';
import HistoricalInsights from './components/HistoricalInsights';
import InsightStats from './components/InsightStats';

const AIInsights = () => {
  const [insights, setInsights] = useState([]);
  const [priorityAlerts, setPriorityAlerts] = useState([]);
  const [filteredInsights, setFilteredInsights] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    severity: 'all',
    status: 'all',
    timeRange: 'week',
    cropType: 'all'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for insights
  const mockInsights = [
    {
      id: 1,
      title: "Optimize Irrigation Schedule for Corn Field A",
      description: "Based on soil moisture sensors and weather forecast, reduce irrigation frequency by 20% to prevent overwatering and improve root development.",
      category: "irrigation",
      severity: "medium",
      confidence: 87,
      impact: "15% water savings",
      timestamp: "2 hours ago",
      status: "new",
      actions: [
        { description: "Reduce irrigation cycles from daily to every 2 days", timeline: "Immediate" },
        { description: "Monitor soil moisture levels for next 7 days", timeline: "1 week" },
        { description: "Adjust sprinkler pressure to 15 PSI", timeline: "Today" },
        { description: "Install additional moisture sensors in dry spots", timeline: "3 days" }
      ]
    },
    {
      id: 2,
      title: "Early Pest Detection: Aphids in Tomato Greenhouse",
      description: "Computer vision analysis detected early signs of aphid infestation in greenhouse section B. Immediate action recommended to prevent spread.",
      category: "pest-management",
      severity: "high",
      confidence: 94,
      impact: "Prevent 30% yield loss",
      timestamp: "30 minutes ago",
      status: "new",
      actions: [
        { description: "Apply organic neem oil spray to affected plants", timeline: "Within 2 hours" },
        { description: "Increase beneficial insect population", timeline: "Tomorrow" },
        { description: "Isolate affected greenhouse section", timeline: "Immediate" }
      ]
    },
    {
      id: 3,
      title: "Optimal Harvest Window for Wheat Field C",
      description: "Weather patterns and grain moisture analysis indicate optimal harvest conditions in 3-5 days. Prepare equipment and schedule labor accordingly.",
      category: "harvesting",
      severity: "medium",
      confidence: 91,
      impact: "12% quality improvement",
      timestamp: "1 hour ago",
      status: "new",
      actions: [
        { description: "Schedule combine harvester maintenance", timeline: "2 days" },
        { description: "Arrange additional storage capacity", timeline: "3 days" },
        { description: "Coordinate with grain elevator for delivery", timeline: "1 week" }
      ]
    },
    {
      id: 4,
      title: "Carbon Sequestration Opportunity in North Field",
      description: "Soil analysis suggests implementing cover crops could increase carbon sequestration by 25% and qualify for carbon credit rewards.",
      category: "sustainability",
      severity: "low",
      confidence: 78,
      impact: "$2,400 annual credits",
      timestamp: "4 hours ago",
      status: "pending",
      actions: [
        { description: "Plant winter rye cover crop after harvest", timeline: "2 weeks" },
        { description: "Register for carbon credit program", timeline: "1 month" }
      ]
    },
    {
      id: 5,
      title: "Nutrient Deficiency Alert: Nitrogen in Soybean Field",
      description: "Leaf color analysis and soil tests indicate nitrogen deficiency in the eastern section. Side-dress application recommended.",
      category: "irrigation",
      severity: "medium",
      confidence: 85,
      impact: "8% yield recovery",
      timestamp: "6 hours ago",
      status: "implemented",
      actions: [
        { description: "Apply 40 lbs/acre nitrogen fertilizer", timeline: "Completed" },
        { description: "Retest soil in 2 weeks", timeline: "2 weeks" }
      ]
    }
  ];

  // Mock priority alerts
  const mockPriorityAlerts = [
    {
      id: 1,
      title: "Critical Soil Moisture Drop",
      message: "Soil moisture in Field A has dropped below 20%. Immediate irrigation required to prevent crop stress.",
      severity: "high",
      location: "Field A - Section 3",
      timestamp: "15 minutes ago",
      estimatedImpact: "25% yield loss risk"
    },
    {
      id: 2,
      title: "Weather Alert: Severe Storm Approaching",
      message: "Severe thunderstorm with hail expected in 4 hours. Secure equipment and consider early harvest if crops are ready.",
      severity: "high",
      location: "All Fields",
      timestamp: "45 minutes ago",
      estimatedImpact: "Potential crop damage"
    },
    {
      id: 3,
      title: "Equipment Maintenance Due",
      message: "Irrigation system pump #2 requires scheduled maintenance. Performance has decreased by 15%.",
      severity: "medium",
      location: "Irrigation Hub B",
      timestamp: "2 hours ago",
      estimatedImpact: "Reduced irrigation efficiency"
    }
  ];

  // Mock historical data
  const mockHistoricalData = {
    totalInsights: 247,
    implemented: 189,
    implementationRate: 76,
    successRate: 84,
    yieldImpact: 12.5,
    recentInsights: [
      {
        id: 101,
        title: "Precision Fertilizer Application",
        category: "Nutrition",
        date: "Dec 20, 2024",
        status: "implemented",
        confidence: 92,
        outcome: {
          yieldChange: 8.5,
          costSavings: 340
        }
      },
      {
        id: 102,
        title: "Pest Prevention Strategy",
        category: "Pest Management",
        date: "Dec 18, 2024",
        status: "implemented",
        confidence: 88,
        outcome: {
          yieldChange: 15.2,
          costSavings: 1200
        }
      },
      {
        id: 103,
        title: "Water Conservation Plan",
        category: "Irrigation",
        date: "Dec 15, 2024",
        status: "dismissed",
        confidence: 71,
        outcome: null
      }
    ]
  };

  // Mock stats
  const mockStats = {
    activeInsights: 12,
    highPriority: 3,
    implementedToday: 5,
    avgConfidence: 86
  };

  useEffect(() => {
    setInsights(mockInsights);
    setPriorityAlerts(mockPriorityAlerts);
    setFilteredInsights(mockInsights);
  }, []);

  useEffect(() => {
    filterInsights();
  }, [insights, filters, searchQuery]);

  const filterInsights = () => {
    let filtered = [...insights];

    // Apply category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(insight => insight?.category === filters?.category);
    }

    // Apply severity filter
    if (filters?.severity !== 'all') {
      filtered = filtered?.filter(insight => insight?.severity === filters?.severity);
    }

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(insight => insight?.status === filters?.status);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(insight =>
        insight?.title?.toLowerCase()?.includes(query) ||
        insight?.description?.toLowerCase()?.includes(query) ||
        insight?.category?.toLowerCase()?.includes(query)
      );
    }

    setFilteredInsights(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      severity: 'all',
      status: 'all',
      timeRange: 'week',
      cropType: 'all'
    });
    setSearchQuery('');
  };

  const handleMarkImplemented = (insightId) => {
    setInsights(prev =>
      prev?.map(insight =>
        insight?.id === insightId
          ? { ...insight, status: 'implemented' }
          : insight
      )
    );
  };

  const handleRemindLater = (insightId) => {
    // In a real app, this would set a reminder
    console.log(`Reminder set for insight ${insightId}`);
  };

  const handleViewDetails = (insightId) => {
    // In a real app, this would navigate to detailed view
    console.log(`Viewing details for insight ${insightId}`);
  };

  const handleDismissAlert = (alertId) => {
    setPriorityAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleViewAlert = (alertId) => {
    console.log(`Viewing alert ${alertId}`);
  };

  const handleRefreshInsights = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleToggleSidebar = () => {
    // Handle sidebar toggle functionality
    console.log('Toggle sidebar');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={handleToggleSidebar} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center">
                <Icon name="Brain" size={32} className="text-primary mr-3" />
                AI Insights
              </h1>
              <p className="text-muted-foreground mt-2">
                Personalized agricultural recommendations powered by AI and IoT data
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleRefreshInsights}
                loading={isLoading}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh Data
              </Button>
              <Button variant="default" iconName="Settings" iconPosition="left">
                AI Settings
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-8">
            <InsightStats stats={mockStats} />
          </div>

          {/* Priority Alerts */}
          <div className="mb-8">
            <PriorityAlerts
              alerts={priorityAlerts}
              onDismissAlert={handleDismissAlert}
              onViewAlert={handleViewAlert}
            />
          </div>

          {/* Filters */}
          <div className="mb-8">
            <InsightFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={handleSearch}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Insights List */}
            <div className="xl:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Current Insights ({filteredInsights?.length})
                </h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>Last updated: 5 minutes ago</span>
                </div>
              </div>

              {filteredInsights?.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Insights Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms to find relevant insights.
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredInsights?.map((insight) => (
                    <InsightCard
                      key={insight?.id}
                      insight={insight}
                      onMarkImplemented={handleMarkImplemented}
                      onRemindLater={handleRemindLater}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Historical Insights Sidebar */}
            <div className="xl:col-span-1">
              <HistoricalInsights
                historicalData={mockHistoricalData}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIInsights;