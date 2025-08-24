import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Zap, Clock, RefreshCw } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { format } from 'date-fns';

const RealTimeUpdates = ({ hasNewData, lastUpdate }) => {
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [updateCount, setUpdateCount] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly simulate connection issues (5% chance)
      const isConnected = Math.random() > 0.05;
      setConnectionStatus(isConnected ? 'connected' : 'disconnected');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Update counter when new data arrives
  useEffect(() => {
    if (hasNewData) {
      setUpdateCount(prev => prev + 1);
      setLastUpdateTime(new Date());
    }
  }, [hasNewData]);

  const statusConfig = {
    connected: {
      icon: Wifi,
      color: 'text-success',
      bgColor: 'bg-success/10',
      label: 'Live Connection Active',
      description: 'Real-time data streaming'
    },
    disconnected: {
      icon: WifiOff,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      label: 'Connection Lost',
      description: 'Attempting to reconnect...'
    },
    reconnecting: {
      icon: RefreshCw,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      label: 'Reconnecting',
      description: 'Please wait...'
    }
  };

  const currentStatus = statusConfig?.[connectionStatus];
  const StatusIcon = currentStatus?.icon;

  const handleReconnect = () => {
    setConnectionStatus('reconnecting');
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Connection Status */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${currentStatus?.bgColor}`}>
        <StatusIcon 
          className={`w-4 h-4 ${currentStatus?.color} ${
            connectionStatus === 'reconnecting' ? 'animate-spin' : hasNewData ? 'animate-pulse' : ''
          }`} 
        />
        <div className="text-sm">
          <div className={`font-medium ${currentStatus?.color}`}>
            {currentStatus?.label}
          </div>
          <div className="text-xs text-muted-foreground">
            {currentStatus?.description}
          </div>
        </div>
      </div>

      {/* Real-time Indicators */}
      <div className="flex items-center gap-4">
        {/* New Data Pulse */}
        {hasNewData && (
          <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg animate-pulse">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">New Data Received</span>
          </div>
        )}

        {/* Last Update Time */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <div>
            <div className="text-xs">Last Update:</div>
            <div className="font-medium text-foreground">
              {lastUpdate ? format(new Date(lastUpdate), 'HH:mm:ss') : 'Never'}
            </div>
          </div>
        </div>

        {/* Update Counter */}
        <div className="text-sm text-muted-foreground">
          <div className="text-xs">Updates Today:</div>
          <div className="font-bold text-lg text-foreground">{updateCount}</div>
        </div>

        {/* Reconnect Button */}
        {connectionStatus === 'disconnected' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReconnect}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reconnect
          </Button>
        )}
      </div>
    </div>
  );
};

export default RealTimeUpdates;