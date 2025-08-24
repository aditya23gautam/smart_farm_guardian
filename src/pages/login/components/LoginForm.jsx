import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for authentication
  const mockCredentials = {
    email: 'farmer@smartfarm.com',
    password: 'SmartFarm2024!'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        navigate('/dashboard');
      } else {
        // Failed login
        setErrors({
          general: 'Invalid credentials. Use farmer@smartfarm.com / SmartFarm2024!'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleOAuthLogin = (provider) => {
    setIsLoading(true);
    // Simulate OAuth login
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-error/10 border border-error/20 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={18} className="text-error" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </motion.div>
        )}

        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="w-full"
        />

        {/* Password Input */}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          className="w-full"
        />

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
          />
          
          <Button
            variant="link"
            className="text-sm text-primary hover:text-primary/80 p-0"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </Button>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          className="h-12"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            fullWidth
            iconName="Chrome"
            iconPosition="left"
            onClick={() => handleOAuthLogin('google')}
            disabled={isLoading}
            className="h-12"
          >
            Continue with Google
          </Button>
          
          <Button
            type="button"
            variant="outline"
            fullWidth
            iconName="Facebook"
            iconPosition="left"
            onClick={() => handleOAuthLogin('facebook')}
            disabled={isLoading}
            className="h-12"
          >
            Continue with Facebook
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            New to Smart Farm Guardian?{' '}
            <Button
              variant="link"
              className="text-primary hover:text-primary/80 p-0 font-medium"
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;