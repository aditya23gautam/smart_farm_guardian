import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: 'USDA Certified',
      icon: 'Shield',
      description: 'Agricultural compliance verified'
    },
    {
      id: 2,
      name: 'ISO 27001',
      icon: 'Lock',
      description: 'Information security certified'
    },
    {
      id: 3,
      name: 'SOC 2 Type II',
      icon: 'CheckCircle',
      description: 'Security controls audited'
    },
    {
      id: 4,
      name: 'GDPR Compliant',
      icon: 'UserCheck',
      description: 'Data privacy protected'
    }
  ];

  const stats = [
    { label: 'Active Farms', value: '15,000+' },
    { label: 'IoT Sensors', value: '250K+' },
    { label: 'Data Points Daily', value: '50M+' },
    { label: 'Uptime', value: '99.9%' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-8"
    >
      {/* Security Certifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Award" size={20} className="text-primary mr-2" />
          Trusted & Certified
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {certifications?.map((cert) => (
            <motion.div
              key={cert?.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex-shrink-0">
                <Icon name={cert?.icon} size={18} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{cert?.name}</p>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Platform Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="TrendingUp" size={20} className="text-success mr-2" />
          Platform Statistics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {stats?.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="text-center p-3 bg-primary/5 rounded-lg"
            >
              <p className="text-2xl font-bold text-primary">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={20} className="text-secondary mr-2" />
          Security Features
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="Lock" size={16} className="text-success" />
            <span className="text-sm text-foreground">256-bit SSL encryption</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Eye" size={16} className="text-success" />
            <span className="text-sm text-foreground">Two-factor authentication</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Database" size={16} className="text-success" />
            <span className="text-sm text-foreground">Encrypted data storage</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={16} className="text-success" />
            <span className="text-sm text-foreground">24/7 security monitoring</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrustSignals;