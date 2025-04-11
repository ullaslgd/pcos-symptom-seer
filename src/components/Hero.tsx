
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Activity } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-pcos-100/50 to-white">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(155, 135, 245, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(56, 178, 172, 0.1) 0%, transparent 50%)'
        }}
      ></div>
      
      <div className="container px-4 py-16 sm:px-6 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-pcos-100 text-pcos-700 mb-2">
              <Activity className="h-4 w-4 mr-1" />
              <span>PCOS Symptom Assessment</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight gradient-text leading-tight">
              Understand Your PCOS Symptoms
            </h1>
            
            <p className="text-lg text-foreground/80">
              Our symptom assessment tool helps identify potential signs of Polycystic Ovary Syndrome, providing personalized insights into your health concerns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate('/assessment')}>
                Start Assessment
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              
              <Button size="lg" variant="outline" onClick={() => navigate('/information')}>
                Learn About PCOS
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Not a diagnostic tool. Always consult with healthcare professionals for medical advice.
            </p>
          </div>
          
          <div className="relative animate-fadeIn">
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pcos-300 to-teal-300 opacity-30 blur-xl"></div>
            <div className="relative bg-white rounded-lg shadow-md p-6 sm:p-8 border border-pcos-200/50">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                alt="PCOS Health Awareness" 
                className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"
              />
              <h3 className="font-semibold text-lg mb-4">Common Signs of PCOS</h3>
              
              <ul className="space-y-3">
                {[
                  'Irregular periods or no periods',
                  'Weight gain, especially around the abdomen',
                  'Excess hair growth on face and body',
                  'Acne or oily skin',
                  'Thinning hair or hair loss',
                  'Difficulty getting pregnant'
                ].map((symptom, index) => (
                  <li key={index} className="flex items-start">
                    <div className="rounded-full bg-pcos-100 p-1 mr-3 mt-0.5">
                      <div className="rounded-full bg-pcos-500 w-1.5 h-1.5"></div>
                    </div>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-foreground/80">
                  PCOS affects approximately 1 in 10 women of childbearing age. Early identification can help manage symptoms effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
