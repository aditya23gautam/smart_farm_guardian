import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WalletConnection = ({ onWalletConnect, isConnected, walletAddress }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  const walletProviders = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: 'Wallet',
      description: 'Connect using MetaMask browser extension',
      available: true
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'Smartphone',
      description: 'Connect using mobile wallet',
      available: true
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: 'CreditCard',
      description: 'Connect using Coinbase Wallet',
      available: true
    }
  ];

  const handleWalletConnect = async (providerId) => {
    setIsConnecting(true);
    try {
      // Mock wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockAddress = '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4';
      onWalletConnect(mockAddress);
      setShowWalletOptions(false);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    onWalletConnect(null);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  if (isConnected && walletAddress) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Wallet Connected</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-success">Connected</span>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Wallet" size={20} color="white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wallet Address</p>
              <p className="font-mono text-foreground">{formatAddress(walletAddress)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Network</p>
            <p className="font-medium text-foreground">Ethereum Mainnet</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-medium text-success">Active</p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleDisconnect}
          iconName="LogOut"
          iconPosition="left"
          className="w-full"
        >
          Disconnect Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Wallet" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground">
          Connect your Web3 wallet to start earning and managing sustainability rewards
        </p>
      </div>
      {!showWalletOptions ? (
        <Button
          variant="default"
          onClick={() => setShowWalletOptions(true)}
          iconName="Wallet"
          iconPosition="left"
          className="w-full"
        >
          Connect Wallet
        </Button>
      ) : (
        <div className="space-y-3">
          {walletProviders?.map((provider) => (
            <Button
              key={provider?.id}
              variant="outline"
              onClick={() => handleWalletConnect(provider?.id)}
              loading={isConnecting}
              disabled={!provider?.available}
              className="w-full justify-start p-4 h-auto"
            >
              <div className="flex items-center space-x-3">
                <Icon name={provider?.icon} size={24} />
                <div className="text-left">
                  <p className="font-medium">{provider?.name}</p>
                  <p className="text-sm text-muted-foreground">{provider?.description}</p>
                </div>
              </div>
            </Button>
          ))}
          
          <Button
            variant="ghost"
            onClick={() => setShowWalletOptions(false)}
            className="w-full mt-4"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletConnection;