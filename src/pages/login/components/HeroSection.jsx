import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const features = [
    {
      icon: 'Smartphone',
      title: 'IoT Monitoring',
      description: 'Real-time sensor data'
    },
    {
      icon: 'Brain',
      title: 'AI Insights',
      description: 'Smart recommendations'
    },
    {
      icon: 'Coins',
      title: 'Blockchain Rewards',
      description: 'Earn sustainability tokens'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Logo and Brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-elevated">
            <Icon name="Sprout" size={32} color="white" />
          </div>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
          Smart Farm Guardian
        </h1>
        <p className="text-lg text-muted-foreground">
          Empowering Agriculture with Smart Technology
        </p>
      </motion.div>
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl shadow-elevated"
      >
        <Image
          src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=400&fit=crop"
          alt="Smart farming technology with IoT sensors in agricultural field"
          className="w-full h-64 lg:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-xl lg:text-2xl font-semibold text-white mb-2">
            Start Smart Farming Today
          </h2>
          <p className="text-white/90 text-sm lg:text-base">
            Join thousands of farmers using IoT and AI to optimize their operations
          </p>
        </div>
      </motion.div>
      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {features?.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-card border border-border rounded-lg p-4 text-center"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
              <Icon name={feature?.icon} size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{feature?.title}</h3>
            <p className="text-sm text-muted-foreground">{feature?.description}</p>
          </motion.div>
        ))}
      </motion.div>
      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6"
      >
        <Icon name="Zap" size={32} className="text-accent mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Ready to Transform Your Farm?
        </h3>
        <p className="text-muted-foreground text-sm">
          Access real-time insights, AI recommendations, and blockchain rewards
        </p>
      </motion.div>
    </div>
  );
};

export default HeroSection;