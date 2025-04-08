
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InfoSection from '@/components/InfoSection';
import ResourcesSection from '@/components/ResourcesSection';

const Information = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3 gradient-text">Understanding PCOS</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn about Polycystic Ovary Syndrome, its symptoms, diagnosis, and treatment options.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <InfoSection />
            
            <div className="mt-12 bg-pcos-50 p-6 rounded-lg border border-pcos-100">
              <h2 className="text-xl font-semibold mb-4">Common Misconceptions About PCOS</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Myth: PCOS only affects overweight women</h3>
                  <p className="text-muted-foreground mt-1">
                    Fact: While PCOS is more common in women with obesity, it can affect women of any body type. 
                    Some women with PCOS are of normal weight or underweight.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Myth: You can't get pregnant if you have PCOS</h3>
                  <p className="text-muted-foreground mt-1">
                    Fact: While PCOS is a leading cause of infertility, many women with PCOS can and do become pregnant, 
                    either naturally or with medical assistance.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Myth: PCOS is rare</h3>
                  <p className="text-muted-foreground mt-1">
                    Fact: PCOS affects approximately 8-13% of women of reproductive age, making it one of the most common 
                    hormonal disorders among women of childbearing age.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Myth: There's nothing you can do about PCOS</h3>
                  <p className="text-muted-foreground mt-1">
                    Fact: While there's no cure for PCOS, symptoms can be managed effectively through lifestyle changes, 
                    medications, and other treatments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <ResourcesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Information;
