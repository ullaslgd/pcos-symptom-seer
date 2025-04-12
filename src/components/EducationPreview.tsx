
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const EducationPreview = () => {
  const featuredContent = [
    {
      title: "Understanding PCOS Symptoms",
      type: "Article",
      description: "Learn about the most common symptoms and how they manifest",
      icon: <FileText className="h-5 w-5" />,
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
    },
    {
      title: "PCOS Diet Fundamentals",
      type: "Guide",
      description: "Nutritional approaches specifically designed for PCOS management",
      icon: <BookOpen className="h-5 w-5" />,
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
    },
    {
      title: "Exercise for PCOS",
      type: "Video",
      description: "The best types of exercise for managing PCOS symptoms effectively",
      icon: <Video className="h-5 w-5" />,
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a"
    }
  ];

  return (
    <section className="py-16 bg-pcos-50/50">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold gradient-text mb-4">Educational Resources</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover expert insights, articles, and guides about PCOS management and treatment options.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredContent.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                    {item.icon}
                    <span className="ml-1.5">{item.type}</span>
                  </span>
                </div>
                <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/education">
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Education Hub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EducationPreview;
