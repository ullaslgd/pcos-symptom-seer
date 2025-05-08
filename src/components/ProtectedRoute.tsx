
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-pcos-500 border-t-transparent rounded-full"></div>
        <span className="ml-3">Loading authentication...</span>
      </div>
    );
  }
  
  console.log("Protected route - User:", user?.email || "Not logged in");
  
  if (!user) {
    console.log("Redirecting to login from protected route");
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
