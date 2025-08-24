import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';


const TransactionHistory = () => {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [dateRange, setDateRange] = useState('30');

  const transactions = [
    {
      id: 'tx_001',
      type: 'reward',
      category: 'water_conservation',
      description: 'Water Conservation Achievement',
      amount: 25.5,
      usdValue: 127.50,
      status: 'confirmed',
      timestamp: new Date('2025-08-23T14:30:00'),
      txHash: '0x1234567890abcdef1234567890abcdef12345678',
      gasUsed: 0.0023,
      blockNumber: 18456789
    },
    {
      id: 'tx_002',
      type: 'reward',
      category: 'organic_certification',
      description: 'Organic Farming Certification',
      amount: 100.0,
      usdValue: 500.00,
      status: 'pending',
      timestamp: new Date('2025-08-23T10:15:00'),
      txHash: '0x9876543210fedcba9876543210fedcba98765432',
      gasUsed: 0.0045,
      blockNumber: null
    },
    {
      id: 'tx_003',
      type: 'transfer',
      category: 'withdrawal',
      description: 'Token Transfer to Exchange',
      amount: -50.0,
      usdValue: -250.00,
      status: 'confirmed',
      timestamp: new Date('2025-08-22T16:45:00'),
      txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
      gasUsed: 0.0034,
      blockNumber: 18456234
    },
    {
      id: 'tx_004',
      type: 'reward',
      category: 'carbon_reduction',
      description: 'Carbon Footprint Reduction',
      amount: 75.0,
      usdValue: 375.00,
      status: 'confirmed',
      timestamp: new Date('2025-08-22T09:20:00'),
      txHash: '0xfedcba0987654321fedcba0987654321fedcba09',
      gasUsed: 0.0028,
      blockNumber: 18455890
    },
    {
      id: 'tx_005',
      type: 'reward',
      category: 'knowledge_sharing',
      description: 'Community Knowledge Sharing',
      amount: 15.0,
      usdValue: 75.00,
      status: 'failed',
      timestamp: new Date('2025-08-21T13:10:00'),
      txHash: '0x5555999955559999555599995555999955559999',
      gasUsed: 0.0019,
      blockNumber: null
    }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'reward', label: 'Rewards' },
    { value: 'transfer', label: 'Transfers' },
    { value: 'stake', label: 'Staking' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'water_conservation', label: 'Water Conservation' },
    { value: 'organic_certification', label: 'Organic Certification' },
    { value: 'carbon_reduction', label: 'Carbon Reduction' },
    { value: 'knowledge_sharing', label: 'Knowledge Sharing' },
    { value: 'withdrawal', label: 'Withdrawal' }
  ];

  const dateRangeOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '365', label: 'Last year' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'reward': return 'Gift';
      case 'transfer': return 'ArrowUpDown';
      case 'stake': return 'Lock';
      default: return 'Circle';
    }
  };

  const formatAmount = (amount) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}${new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })?.format(amount)}`;
  };

  const formatCurrency = (amount) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(Math.abs(amount))}`;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  const formatTxHash = (hash) => {
    return `${hash?.slice(0, 10)}...${hash?.slice(-8)}`;
  };

  const handleExportCSV = () => {
    // Mock CSV export functionality
    console.log('Exporting transaction history to CSV...');
  };

  const filteredTransactions = transactions?.filter(tx => {
    if (filterType !== 'all' && tx?.type !== filterType) return false;
    if (filterCategory !== 'all' && tx?.category !== filterCategory) return false;
    
    const daysDiff = (new Date() - tx?.timestamp) / (1000 * 60 * 60 * 24);
    if (daysDiff > parseInt(dateRange)) return false;
    
    return true;
  });

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Transaction History</h3>
            <p className="text-sm text-muted-foreground">Track all your reward transactions and transfers</p>
          </div>
          <Button variant="outline" onClick={handleExportCSV} iconName="Download" iconPosition="left">
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Select
            label="Transaction Type"
            options={typeOptions}
            value={filterType}
            onChange={setFilterType}
          />
          <Select
            label="Category"
            options={categoryOptions}
            value={filterCategory}
            onChange={setFilterCategory}
          />
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">Transaction</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Hash</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredTransactions?.map((tx) => (
              <tr key={tx?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Icon name={getTypeIcon(tx?.type)} size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tx?.description}</p>
                      <p className="text-sm text-muted-foreground capitalize">{tx?.category?.replace('_', ' ')}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className={`font-semibold ${tx?.amount >= 0 ? 'text-success' : 'text-error'}`}>
                      {formatAmount(tx?.amount)} SFG
                    </p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(tx?.usdValue)}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(tx?.status)}`}>
                    <Icon name={getStatusIcon(tx?.status)} size={12} />
                    <span className="capitalize">{tx?.status}</span>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{formatDate(tx?.timestamp)}</p>
                  {tx?.blockNumber && (
                    <p className="text-xs text-muted-foreground">Block #{tx?.blockNumber?.toLocaleString()}</p>
                  )}
                </td>
                <td className="p-4">
                  <p className="font-mono text-sm text-foreground">{formatTxHash(tx?.txHash)}</p>
                  <p className="text-xs text-muted-foreground">Gas: {tx?.gasUsed} ETH</p>
                </td>
                <td className="p-4">
                  <Button variant="ghost" size="sm" iconName="ExternalLink">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredTransactions?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Receipt" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No Transactions Found</h4>
          <p className="text-muted-foreground">No transactions match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;