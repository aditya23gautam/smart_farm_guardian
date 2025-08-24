import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

import Select from '../../../components/ui/Select';

const AnalyticsCharts = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedChart, setSelectedChart] = useState('earnings');

  const periodOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  const chartOptions = [
    { value: 'earnings', label: 'Token Earnings' },
    { value: 'activities', label: 'Activity Distribution' },
    { value: 'impact', label: 'Sustainability Impact' }
  ];

  // Mock data for earnings over time
  const earningsData = [
    { date: '2025-08-17', tokens: 12.5, usdValue: 62.50, activities: 3 },
    { date: '2025-08-18', tokens: 25.0, usdValue: 125.00, activities: 5 },
    { date: '2025-08-19', tokens: 18.3, usdValue: 91.50, activities: 4 },
    { date: '2025-08-20', tokens: 45.2, usdValue: 226.00, activities: 7 },
    { date: '2025-08-21', tokens: 15.0, usdValue: 75.00, activities: 2 },
    { date: '2025-08-22', tokens: 75.0, usdValue: 375.00, activities: 6 },
    { date: '2025-08-23', tokens: 125.5, usdValue: 627.50, activities: 8 }
  ];

  // Mock data for activity distribution
  const activityData = [
    { name: 'Water Conservation', value: 35, tokens: 245.5, color: '#3B82F6' },
    { name: 'Organic Certification', value: 25, tokens: 175.0, color: '#10B981' },
    { name: 'Carbon Reduction', value: 20, tokens: 140.0, color: '#F59E0B' },
    { name: 'Knowledge Sharing', value: 12, tokens: 84.0, color: '#8B5CF6' },
    { name: 'Soil Health', value: 8, tokens: 56.0, color: '#EF4444' }
  ];

  // Mock data for sustainability impact
  const impactData = [
    { metric: 'Water Saved', value: 1250, unit: 'gallons', change: 15.2 },
    { metric: 'CO2 Reduced', value: 2.8, unit: 'tons', change: 22.5 },
    { metric: 'Organic Area', value: 45, unit: 'acres', change: 8.7 },
    { metric: 'Energy Saved', value: 340, unit: 'kWh', change: 12.3 },
    { metric: 'Biodiversity Score', value: 87, unit: 'points', change: 5.4 }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground mb-2">{formatDate(label)}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-muted-foreground">{entry?.dataKey}:</span>
              <span className="text-sm font-medium text-foreground">
                {entry?.dataKey === 'usdValue' ? formatCurrency(entry?.value) : 
                 entry?.dataKey === 'tokens' ? `${formatNumber(entry?.value)} SFG` : 
                 entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderEarningsChart = () => (
    <div className="space-y-6">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={earningsData}>
            <defs>
              <linearGradient id="tokensGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D5A27" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2D5A27" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="usdGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4A90A4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4A90A4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="tokens"
              stroke="#2D5A27"
              fillOpacity={1}
              fill="url(#tokensGradient)"
              name="Tokens Earned"
            />
            <Area
              type="monotone"
              dataKey="usdValue"
              stroke="#4A90A4"
              fillOpacity={1}
              fill="url(#usdGradient)"
              name="USD Value"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">Total Earned</p>
          <p className="text-2xl font-bold text-foreground">316.5 SFG</p>
          <p className="text-sm text-success">+12.5% this period</p>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">USD Value</p>
          <p className="text-2xl font-bold text-foreground">$1,582.50</p>
          <p className="text-sm text-success">+8.3% this period</p>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">Activities</p>
          <p className="text-2xl font-bold text-foreground">35</p>
          <p className="text-sm text-success">+15.2% this period</p>
        </div>
      </div>
    </div>
  );

  const renderActivityChart = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {activityData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {activityData?.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: activity?.color }}
                ></div>
                <span className="font-medium text-foreground">{activity?.name}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{formatNumber(activity?.tokens)} SFG</p>
                <p className="text-sm text-muted-foreground">{activity?.value}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderImpactChart = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {impactData?.map((impact, index) => (
          <div key={index} className="bg-muted rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-foreground">{impact?.metric}</h4>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                impact?.change >= 0 ? 'text-success bg-success/10' : 'text-error bg-error/10'
              }`}>
                <Icon name={impact?.change >= 0 ? "TrendingUp" : "TrendingDown"} size={12} />
                <span>{Math.abs(impact?.change)}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{formatNumber(impact?.value)}</p>
              <p className="text-sm text-muted-foreground">{impact?.unit}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={impactData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="metric" 
              stroke="#6B7280"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip 
              formatter={(value, name) => [formatNumber(value), name]}
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="value" fill="#2D5A27" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Analytics & Insights</h3>
            <p className="text-sm text-muted-foreground">Track your earning patterns and sustainability impact</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select
              options={chartOptions}
              value={selectedChart}
              onChange={setSelectedChart}
              className="min-w-[180px]"
            />
            <Select
              options={periodOptions}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              className="min-w-[140px]"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        {selectedChart === 'earnings' && renderEarningsChart()}
        {selectedChart === 'activities' && renderActivityChart()}
        {selectedChart === 'impact' && renderImpactChart()}
      </div>
    </div>
  );
};

export default AnalyticsCharts;