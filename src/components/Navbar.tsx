
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, Info, Home, Calendar, MessageSquare, LayoutDashboard, BookOpen, LogOut, LogIn, UserPlus } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    navigate('/');
  };

  return (
    <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-pcos-500" />
          <span className="font-bold text-lg sm:text-xl">PCOS Symptom Seer</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          {user && (
            <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
              Dashboard
            </Link>
          )}
          <Link to="/assessment" className="text-foreground/80 hover:text-foreground transition-colors">
            Assessment
          </Link>
          <Link to="/information" className="text-foreground/80 hover:text-foreground transition-colors">
            Information
          </Link>
          <Link to="/education" className="text-foreground/80 hover:text-foreground transition-colors">
            Education Hub
          </Link>
          {user && (
            <>
              <Link to="/appointments" className="text-foreground/80 hover:text-foreground transition-colors">
                Appointments
              </Link>
              <Link to="/expert-qa" className="text-foreground/80 hover:text-foreground transition-colors">
                Expert Q&A
              </Link>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm mr-2">
                {user.email}
              </span>
              <Button asChild variant="outline" className="hidden sm:flex">
                <Link to="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-1" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline" className="hidden sm:flex">
                <Link to="/education">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Learn About PCOS
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-1" />
                  <span>Login</span>
                </Link>
              </Button>
              <Button asChild>
                <Link to="/signup">
                  <UserPlus className="mr-1 h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">Sign Up</span>
                  <span className="sm:hidden">Sign Up</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <div className="container flex items-center justify-between px-4">
          <Link to="/" className="flex flex-1 flex-col items-center justify-center py-2">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          {user && (
            <Link to="/dashboard" className="flex flex-1 flex-col items-center justify-center py-2">
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-xs">Dashboard</span>
            </Link>
          )}
          <Link to="/assessment" className="flex flex-1 flex-col items-center justify-center py-2">
            <Activity className="h-5 w-5" />
            <span className="text-xs">Assessment</span>
          </Link>
          <Link to="/education" className="flex flex-1 flex-col items-center justify-center py-2">
            <BookOpen className="h-5 w-5" />
            <span className="text-xs">Learn</span>
          </Link>
          {user ? (
            <Link to="/expert-qa" className="flex flex-1 flex-col items-center justify-center py-2">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Q&A</span>
            </Link>
          ) : (
            <Link to="/login" className="flex flex-1 flex-col items-center justify-center py-2">
              <LogIn className="h-5 w-5" />
              <span className="text-xs">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
