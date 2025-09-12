import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate login - in real app, you'd call an API
      setIsAuthenticated(true);
      alert('Login successful!');
      navigate('/alumni');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}>
        </div>
      </div>
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center relative z-10">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <GraduationCap className="h-16 w-16 text-purple-400" />
              <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
            Welcome back to NEXUS
          </h2>
          <p className="text-purple-300">
            Sign in to your alumni network
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-purple-500/20">
          <CardHeader>
            <CardTitle className="text-center text-white">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-white/10 border-white/20 text-white placeholder-purple-300 rounded-xl ${errors.email ? 'border-red-400' : 'focus:border-purple-400'}`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-300">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-white/10 border-white/20 text-white placeholder-purple-300 rounded-xl ${errors.password ? 'border-red-400' : 'focus:border-purple-400'}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-purple-300" />
                    ) : (
                      <Eye className="h-4 w-4 text-purple-300" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-300">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link 
                  to="#" 
                  className="text-sm text-purple-300 hover:text-purple-200"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl py-3 shadow-lg shadow-purple-500/25"
              >
                Sign In
              </Button>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-purple-300">
                  Don't have an account?{' '}
                  <Link 
                    to="/signup" 
                    className="font-medium text-white hover:text-purple-200"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;