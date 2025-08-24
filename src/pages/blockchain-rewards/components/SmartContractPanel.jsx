import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SmartContractPanel = () => {
  const [selectedAction, setSelectedAction] = useState('mint_reward');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('water_conservation');
  const [isProcessing, setIsProcessing] = useState(false);
  const [gasEstimate, setGasEstimate] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);

  const actionOptions = [
    { value: 'mint_reward', label: 'Mint Reward Tokens' },
    { value: 'stake_tokens', label: 'Stake Tokens' },
    { value: 'unstake_tokens', label: 'Unstake Tokens' },
    { value: 'claim_rewards', label: 'Claim Staking Rewards' }
  ];

  const categoryOptions = [
    { value: 'water_conservation', label: 'Water Conservation' },
    { value: 'organic_certification', label: 'Organic Certification' },
    { value: 'carbon_reduction', label: 'Carbon Reduction' },
    { value: 'knowledge_sharing', label: 'Knowledge Sharing' },
    { value: 'soil_health', label: 'Soil Health' },
    { value: 'biodiversity', label: 'Biodiversity' }
  ];

  const contractInfo = {
    address: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
    network: 'Ethereum Mainnet',
    version: 'v2.1.0',
    totalSupply: '1,000,000',
    circulatingSupply: '750,000'
  };

  const handleEstimateGas = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    // Mock gas estimation
    setGasEstimate({
      gasLimit: 150000,
      gasPrice: 25,
      estimatedCost: 0.00375,
      usdCost: 12.50
    });
  };

  const handleExecuteTransaction = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsProcessing(true);
    setTransactionStatus({ type: 'pending', message: 'Transaction submitted to blockchain...' });
    
    try {
      // Mock transaction execution
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setTransactionStatus({
        type: 'success',
        message: 'Transaction confirmed successfully!',
        txHash: '0x1234567890abcdef1234567890abcdef12345678'
      });
      
      // Reset form
      setAmount('');
      setGasEstimate(null);
    } catch (error) {
      setTransactionStatus({
        type: 'error',
        message: 'Transaction failed. Please try again.'
      });
    } finally {
      setIsProcessing(false);
      setTimeout(() => setTransactionStatus(null), 5000);
    }
  };

  const formatAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Code" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Smart Contract Interaction</h3>
            <p className="text-sm text-muted-foreground">Interact directly with the SFG token smart contract</p>
          </div>
        </div>

        {/* Contract Information */}
        <div className="bg-muted rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Contract Address</p>
              <p className="font-mono text-sm text-foreground">{formatAddress(contractInfo?.address)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Network</p>
              <p className="text-sm text-foreground">{contractInfo?.network}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Supply</p>
              <p className="text-sm text-foreground">{contractInfo?.totalSupply} SFG</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Version</p>
              <p className="text-sm text-foreground">{contractInfo?.version}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Action Selection */}
        <Select
          label="Contract Action"
          description="Select the smart contract function to execute"
          options={actionOptions}
          value={selectedAction}
          onChange={setSelectedAction}
        />

        {/* Amount Input */}
        <Input
          label="Amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e?.target?.value)}
          description="Amount of tokens to process"
          min="0"
          step="0.1"
        />

        {/* Category Selection (for mint_reward action) */}
        {selectedAction === 'mint_reward' && (
          <Select
            label="Reward Category"
            description="Select the category for reward minting"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
          />
        )}

        {/* Gas Estimation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Gas Estimation</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEstimateGas}
              disabled={!amount || parseFloat(amount) <= 0}
              iconName="Calculator"
              iconPosition="left"
            >
              Estimate Gas
            </Button>
          </div>

          {gasEstimate && (
            <div className="bg-muted rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Gas Limit</p>
                  <p className="text-sm font-medium text-foreground">{gasEstimate?.gasLimit?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Gas Price</p>
                  <p className="text-sm font-medium text-foreground">{gasEstimate?.gasPrice} Gwei</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Estimated Cost</p>
                  <p className="text-sm font-medium text-foreground">{gasEstimate?.estimatedCost} ETH</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">USD Value</p>
                  <p className="text-sm font-medium text-foreground">${gasEstimate?.usdCost}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transaction Status */}
        {transactionStatus && (
          <div className={`p-4 rounded-lg border ${
            transactionStatus?.type === 'success' ? 'bg-success/10 border-success text-success' :
            transactionStatus?.type === 'error'? 'bg-error/10 border-error text-error' : 'bg-warning/10 border-warning text-warning'
          }`}>
            <div className="flex items-center space-x-2">
              <Icon 
                name={
                  transactionStatus?.type === 'success' ? 'CheckCircle' :
                  transactionStatus?.type === 'error' ? 'XCircle' : 'Clock'
                } 
                size={16} 
              />
              <p className="text-sm font-medium">{transactionStatus?.message}</p>
            </div>
            {transactionStatus?.txHash && (
              <p className="text-xs font-mono mt-2">Tx: {transactionStatus?.txHash}</p>
            )}
          </div>
        )}

        {/* Execute Button */}
        <Button
          variant="default"
          onClick={handleExecuteTransaction}
          disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
          loading={isProcessing}
          iconName="Zap"
          iconPosition="left"
          className="w-full"
        >
          {isProcessing ? 'Processing Transaction...' : 'Execute Transaction'}
        </Button>

        {/* Security Notice */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-warning mt-0.5" />
            <div>
              <h5 className="font-medium text-warning mb-1">Security Notice</h5>
              <p className="text-sm text-warning/80">
                Always verify transaction details before confirming. Smart contract interactions are irreversible.
                Make sure you understand the implications of each action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartContractPanel;