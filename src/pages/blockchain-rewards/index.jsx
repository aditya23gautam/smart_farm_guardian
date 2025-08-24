import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import WalletConnection from './components/WalletConnection';
import TokenBalance from './components/TokenBalance';
import RewardActivities from './components/RewardActivities';
import EarnRewards from './components/EarnRewards';
import TransactionHistory from './components/TransactionHistory';
import SmartContractPanel from './components/SmartContractPanel';
import AnalyticsCharts from './components/AnalyticsCharts';
import Icon from '../../components/AppIcon';


const BlockchainRewards = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [usdValue, setUsdValue] = useState(0);
  const [change24h, setChange24h] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data initialization
  useEffect(() => {
    // Simulate loading wallet data if connected
    if (isWalletConnected && walletAddress) {
      setTokenBalance(1247.5);
      setUsdValue(6237.50);
      setChange24h(8.3);
    } else {
      setTokenBalance(0);
      setUsdValue(0);
      setChange24h(0);
    }
  }, [isWalletConnected, walletAddress]);

  const handleWalletConnect = (address) => {
    setWalletAddress(address);
    setIsWalletConnected(!!address);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'earn', label: 'Earn Rewards', icon: 'Gift' },
    { id: 'transactions', label: 'Transactions', icon: 'Receipt' },
    { id: 'contract', label: 'Smart Contract', icon: 'Code' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {isWalletConnected ? (
                  <TokenBalance 
                    balance={tokenBalance}
                    usdValue={usdValue}
                    change24h={change24h}
                  />
                ) : (
                  <div className="bg-gradient-to-br from-muted to-muted/50 rounded-xl p-8 text-center">
                    <Icon name="Wallet" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Connect Your Wallet</h3>
                    <p className="text-muted-foreground mb-4">
                      Connect your Web3 wallet to view your token balance and start earning rewards
                    </p>
                  </div>
                )}
              </div>
              <div>
                <WalletConnection
                  onWalletConnect={handleWalletConnect}
                  isConnected={isWalletConnected}
                  walletAddress={walletAddress}
                />
              </div>
            </div>
            
            {isWalletConnected && <RewardActivities />}
          </div>
        );
      case 'earn':
        return <EarnRewards />;
      case 'transactions':
        return <TransactionHistory />;
      case 'contract':
        return <SmartContractPanel />;
      case 'analytics':
        return <AnalyticsCharts />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={handleToggleSidebar} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Coins" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Blockchain Rewards</h1>
                <p className="text-muted-foreground">
                  Earn sustainability tokens and track your environmental impact through blockchain technology
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            {isWalletConnected && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Coins" size={20} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Token Balance</span>
                  </div>
                  <p className="text-xl font-bold text-foreground mt-1">{tokenBalance?.toLocaleString()} SFG</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="DollarSign" size={20} className="text-secondary" />
                    <span className="text-sm text-muted-foreground">USD Value</span>
                  </div>
                  <p className="text-xl font-bold text-foreground mt-1">${usdValue?.toLocaleString()}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={20} className="text-success" />
                    <span className="text-sm text-muted-foreground">24h Change</span>
                  </div>
                  <p className="text-xl font-bold text-success mt-1">+{change24h}%</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Activity" size={20} className="text-accent" />
                    <span className="text-sm text-muted-foreground">Activities</span>
                  </div>
                  <p className="text-xl font-bold text-foreground mt-1">35</p>
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {renderTabContent()}
          </div>

          {/* Educational Section */}
          {!isWalletConnected && (
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="text-center mb-8">
                <Icon name="GraduationCap" size={48} className="text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Learn About Web3 Rewards</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Understand how blockchain technology rewards sustainable farming practices and builds trust in agricultural supply chains
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Secure & Transparent</h3>
                  <p className="text-sm text-muted-foreground">
                    All transactions are recorded on the blockchain, ensuring transparency and preventing fraud
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Leaf" size={24} className="text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Sustainability Rewards</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn tokens for implementing eco-friendly farming practices and reducing environmental impact
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Users" size={24} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Community Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    Join a community of farmers working together towards sustainable agriculture goals
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlockchainRewards;