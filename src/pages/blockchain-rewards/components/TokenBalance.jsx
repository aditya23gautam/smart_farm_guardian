import React from 'react';
import Icon from '../../../components/AppIcon';

const TokenBalance = ({ balance, usdValue, change24h }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(num);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(num);
  };

  const isPositiveChange = change24h >= 0;

  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Token Balance</h2>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Icon name="Coins" size={20} color="white" />
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-3xl font-bold">{formatNumber(balance)}</span>
          <span className="text-lg opacity-80">SFG</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">{formatCurrency(usdValue)}</span>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositiveChange ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'
          }`}>
            <Icon 
              name={isPositiveChange ? "TrendingUp" : "TrendingDown"} 
              size={12} 
            />
            <span>{Math.abs(change24h)?.toFixed(2)}%</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm opacity-80">Today's Earned</p>
          <p className="text-lg font-semibold">+{formatNumber(45.2)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-80">This Week</p>
          <p className="text-lg font-semibold">+{formatNumber(312.8)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-80">Total Earned</p>
          <p className="text-lg font-semibold">{formatNumber(balance)}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenBalance;