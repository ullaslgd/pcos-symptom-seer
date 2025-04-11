
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, Info, Home, Calendar, MessageSquare } from "lucide-react";
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
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
          <Link to="/assessment" className="text-foreground/80 hover:text-foreground transition-colors">
            Assessment
          </Link>
          <Link to="/information" className="text-foreground/80 hover:text-foreground transition-colors">
            Information
          </Link>
          <Link to="/appointments" className="text-foreground/80 hover:text-foreground transition-colors">
            Appointments
          </Link>
          <Link to="/expert-qa" className="text-foreground/80 hover:text-foreground transition-colors">
            Expert Q&A
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="outline" className="hidden sm:flex">
            <Link to="/information">
              <Info className="mr-2 h-4 w-4" />
              Learn About PCOS
            </Link>
          </Button>
          <Button asChild>
            <Link to="/assessment">Take Assessment</Link>
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <div className="container flex items-center justify-between px-4">
          <Link to="/" className="flex flex-1 flex-col items-center justify-center py-2">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/assessment" className="flex flex-1 flex-col items-center justify-center py-2">
            <Activity className="h-5 w-5" />
            <span className="text-xs">Assessment</span>
          </Link>
          <Link to="/appointments" className="flex flex-1 flex-col items-center justify-center py-2">
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Appts</span>
          </Link>
          <Link to="/expert-qa" className="flex flex-1 flex-col items-center justify-center py-2">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Q&A</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
