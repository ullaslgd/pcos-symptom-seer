
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-8 mt-auto">
      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PCOS Symptom Seer</h3>
            <p className="text-muted-foreground">
              A tool to help you understand your symptoms and assess your risk for Polycystic Ovary Syndrome.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/80 hover:text-pcos-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-foreground/80 hover:text-pcos-500 transition-colors">
                  Take Assessment
                </Link>
              </li>
              <li>
                <Link to="/information" className="text-foreground/80 hover:text-pcos-500 transition-colors">
                  PCOS Information
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-foreground/80 hover:text-pcos-500 transition-colors">
                  Doctor Appointments
                </Link>
              </li>
              <li>
                <Link to="/expert-qa" className="text-foreground/80 hover:text-pcos-500 transition-colors">
                  Expert Q&A
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Disclaimer</h3>
            <p className="text-muted-foreground text-sm">
              This tool is for informational purposes only and does not provide medical advice, diagnosis, or treatment.
              Always consult with a healthcare professional about your health concerns.
            </p>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} PCOS Symptom Seer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
