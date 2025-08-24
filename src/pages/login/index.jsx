import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginForm from './components/LoginForm';
import HeroSection from './components/HeroSection';
import TrustSignals from './components/TrustSignals';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Hero Section (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 lg:p-12">
          <div className="w-full max-w-lg mx-auto my-auto">
            <HeroSection />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 lg:w-1/2 flex flex-col">
          {/* Mobile Hero Section */}
          <div className="lg:hidden bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-soft">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                Smart Farm Guardian
              </h1>
              <p className="text-sm text-muted-foreground">
                Empowering Agriculture with Smart Technology
              </p>
            </motion.div>
          </div>

          {/* Login Form Container */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Welcome Back
                </h2>
                <p className="text-muted-foreground">
                  Sign in to access your smart farming dashboard
                </p>
              </motion.div>

              <LoginForm />
            </div>
          </div>

          {/* Trust Signals - Desktop Only */}
          <div className="hidden lg:block p-6 lg:p-12 border-t border-border">
            <TrustSignals />
          </div>
        </div>
      </div>
      {/* Mobile Trust Signals */}
      <div className="lg:hidden bg-muted/30 p-6">
        <TrustSignals />
      </div>
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-card border-t border-border p-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Smart Farm Guardian. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Support
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LoginPage;