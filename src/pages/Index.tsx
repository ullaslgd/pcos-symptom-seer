
import React from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResourcesSection from '@/components/ResourcesSection';
import DailyTracker from '@/components/DailyTracker';
import ReviewSection from '@/components/ReviewSection';
import EducationPreview from '@/components/EducationPreview';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <section className="py-12 bg-white">
          <div className="container px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">Daily Tracking</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Monitor your diet and exercise to help manage PCOS symptoms effectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DailyTracker type="diet" />
              <DailyTracker type="exercise" />
            </div>
          </div>
        </section>
        
        <EducationPreview />
        
        <ReviewSection />
        
        <section className="py-16 bg-white">
          <div className="container px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our assessment tool helps you identify potential PCOS symptoms and understand your risk factors.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Take the Assessment",
                  description: "Answer questions about your symptoms and health history to create your profile."
                },
                {
                  step: "2",
                  title: "Get Your Results",
                  description: "Receive a personalized risk assessment based on your symptom patterns."
                },
                {
                  step: "3",
                  title: "Next Steps",
                  description: "Learn about recommended actions and resources based on your results."
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-background/80 shadow-sm animate-slideUp" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="w-12 h-12 rounded-full bg-pcos-100 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-pcos-700">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-b from-white to-pcos-50">
          <div className="container px-4 sm:px-6">
            <div className="bg-white border border-pcos-200/50 rounded-lg shadow-md p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">About PCOS Symptom Seer</h2>
              <p className="mb-4">
                PCOS Symptom Seer is a tool designed to help women identify potential symptoms of Polycystic Ovary Syndrome.
                By recognizing patterns in your symptoms and health history, we aim to provide information that can guide your healthcare decisions.
              </p>
              <p className="mb-4">
                PCOS affects approximately 1 in 10 women of reproductive age, yet many remain undiagnosed. Early identification
                and treatment can help prevent long-term complications and improve quality of life.
              </p>
              <div className="bg-secondary/50 p-4 rounded-md mt-4">
                <p className="text-sm font-medium">
                  Important: This tool is not a substitute for professional medical advice, diagnosis, or treatment.
                  Always consult with a healthcare provider about your specific health concerns.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

