
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AssessmentForm from '@/components/AssessmentForm';

const Assessment = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10 bg-gradient-to-b from-pcos-50 to-white">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">PCOS Symptom Assessment</h1>
              <p className="text-muted-foreground">
                Answer the following questions to help evaluate your PCOS symptoms. 
                This assessment takes approximately 3-5 minutes to complete.
              </p>
            </div>
            
            <AssessmentForm />
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                This assessment is for informational purposes only and is not a substitute for professional medical advice, 
                diagnosis, or treatment.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
