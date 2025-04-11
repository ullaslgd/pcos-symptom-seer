
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  buttonText: string;
  imageUrl: string;
}

const ResourceCard = ({ title, description, url, buttonText, imageUrl }: ResourceCardProps) => (
  <Card className="hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <CardTitle className="text-lg mt-2">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="outline" onClick={() => window.open(url, '_blank')} className="w-full">
        {buttonText}
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
);

const ResourcesSection = () => {
  const resources = [
    {
      title: "PCOS Awareness Association",
      description: "Non-profit organization dedicated to PCOS awareness, support, and education.",
      url: "https://www.pcosaa.org/",
      buttonText: "Visit Website",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    {
      title: "Mayo Clinic - PCOS Guide",
      description: "Comprehensive medical information about PCOS from a trusted source.",
      url: "https://www.mayoclinic.org/diseases-conditions/pcos/symptoms-causes/syc-20353439",
      buttonText: "Learn More",
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
    },
    {
      title: "PCOS Challenge",
      description: "The National Polycystic Ovary Syndrome Association provides support and resources.",
      url: "https://pcoschallenge.org/",
      buttonText: "Visit Website",
      imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    },
    {
      title: "Office on Women's Health",
      description: "US Department of Health & Human Services resource on PCOS.",
      url: "https://www.womenshealth.gov/a-z-topics/polycystic-ovary-syndrome",
      buttonText: "View Resources",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    }
  ];

  return (
    <section className="py-12 bg-secondary/50">
      <div className="container px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold gradient-text mb-4">Additional Resources</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find additional information, support communities, and professional resources about PCOS from trusted organizations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard 
              key={index}
              title={resource.title}
              description={resource.description}
              url={resource.url}
              buttonText={resource.buttonText}
              imageUrl={resource.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
