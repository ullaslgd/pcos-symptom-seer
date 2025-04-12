
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { ChevronDown, BookOpen, FileText, Video, BookType, GraduationCap } from 'lucide-react';

const Education = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3 gradient-text">PCOS Educational Hub</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive library of educational materials about Polycystic Ovary Syndrome.
            </p>
          </div>

          <Tabs defaultValue="all" className="max-w-4xl mx-auto mb-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <div className="bg-secondary/40 rounded-lg p-4 mb-6">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-secondary">Categories</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {[
                            { title: "Symptoms & Diagnosis", icon: <FileText className="mr-2 h-4 w-4" /> },
                            { title: "Treatment Options", icon: <BookOpen className="mr-2 h-4 w-4" /> },
                            { title: "Lifestyle Management", icon: <BookType className="mr-2 h-4 w-4" /> },
                            { title: "Mental Health", icon: <GraduationCap className="mr-2 h-4 w-4" /> },
                            { title: "Fertility & PCOS", icon: <Video className="mr-2 h-4 w-4" /> }
                          ].map((category) => (
                            <li key={category.title}>
                              <NavigationMenuLink asChild>
                                <a
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  <div className="flex items-center text-sm font-medium leading-none">
                                    {category.icon}
                                    {category.title}
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <TabsContent value="all" className="space-y-8">
                <section id="symptoms-diagnosis">
                  <Collapsible
                    open={openCategory === 'symptoms-diagnosis'}
                    onOpenChange={() => toggleCategory('symptoms-diagnosis')}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Symptoms & Diagnosis</h2>
                      <CollapsibleTrigger className="p-2">
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openCategory === 'symptoms-diagnosis' ? "transform rotate-180" : ""
                          )}
                        />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          {
                            title: "Common PCOS Symptoms",
                            type: "Article",
                            description: "Learn about the most common symptoms of PCOS and how they manifest.",
                            imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
                          },
                          {
                            title: "PCOS Diagnosis Criteria",
                            type: "Guide",
                            description: "Understanding the Rotterdam criteria and other diagnostic methods.",
                            imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370"
                          },
                          {
                            title: "Medical Tests for PCOS",
                            type: "Video",
                            description: "A doctor explains the different tests used to diagnose PCOS.",
                            imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67"
                          }
                        ].map((resource, index) => (
                          <Card key={index}>
                            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                              <img
                                src={resource.imageUrl}
                                alt={resource.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <CardContent className="p-4">
                              <div className="mb-2">
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary">
                                  {resource.type}
                                </span>
                              </div>
                              <h3 className="font-medium text-lg mb-1">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </section>

                <section id="treatment-options">
                  <Collapsible
                    open={openCategory === 'treatment-options'}
                    onOpenChange={() => toggleCategory('treatment-options')}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Treatment Options</h2>
                      <CollapsibleTrigger className="p-2">
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openCategory === 'treatment-options' ? "transform rotate-180" : ""
                          )}
                        />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          {
                            title: "Medication Options for PCOS",
                            type: "Article",
                            description: "Detailed overview of medications used to treat various PCOS symptoms.",
                            imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae"
                          },
                          {
                            title: "Lifestyle Changes as Treatment",
                            type: "Guide",
                            description: "How diet, exercise, and other lifestyle factors can help manage PCOS.",
                            imageUrl: "https://images.unsplash.com/photo-1574144125986-8cabe7828785"
                          },
                          {
                            title: "Surgical Options Explained",
                            type: "Video",
                            description: "When surgery might be recommended and what procedures are available.",
                            imageUrl: "https://images.unsplash.com/photo-1571772996211-2f02c9727629"
                          }
                        ].map((resource, index) => (
                          <Card key={index}>
                            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                              <img
                                src={resource.imageUrl}
                                alt={resource.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <CardContent className="p-4">
                              <div className="mb-2">
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary">
                                  {resource.type}
                                </span>
                              </div>
                              <h3 className="font-medium text-lg mb-1">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </section>

                <section id="lifestyle-management">
                  <Collapsible
                    open={openCategory === 'lifestyle-management'}
                    onOpenChange={() => toggleCategory('lifestyle-management')}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Lifestyle Management</h2>
                      <CollapsibleTrigger className="p-2">
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openCategory === 'lifestyle-management' ? "transform rotate-180" : ""
                          )}
                        />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          {
                            title: "PCOS Diet Fundamentals",
                            type: "Guide",
                            description: "Nutritional approaches specifically designed for PCOS management.",
                            imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
                          },
                          {
                            title: "Exercise for PCOS",
                            type: "Video",
                            description: "The best types of exercise for managing PCOS symptoms effectively.",
                            imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a"
                          },
                          {
                            title: "Stress Management Techniques",
                            type: "Article",
                            description: "How stress affects PCOS and techniques to manage it.",
                            imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61"
                          }
                        ].map((resource, index) => (
                          <Card key={index}>
                            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                              <img
                                src={resource.imageUrl}
                                alt={resource.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <CardContent className="p-4">
                              <div className="mb-2">
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary">
                                  {resource.type}
                                </span>
                              </div>
                              <h3 className="font-medium text-lg mb-1">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </section>
              </TabsContent>

              <TabsContent value="articles" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Common PCOS Symptoms",
                      category: "Symptoms & Diagnosis",
                      description: "Learn about the most common symptoms of PCOS and how they manifest.",
                      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
                    },
                    {
                      title: "Medication Options for PCOS",
                      category: "Treatment Options",
                      description: "Detailed overview of medications used to treat various PCOS symptoms.",
                      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae"
                    },
                    {
                      title: "Stress Management Techniques",
                      category: "Lifestyle Management",
                      description: "How stress affects PCOS and techniques to manage it.",
                      imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61"
                    }
                  ].map((article, index) => (
                    <Card key={index}>
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary">
                            {article.category}
                          </span>
                        </div>
                        <h3 className="font-medium text-lg mb-1">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">{article.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="videos" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Medical Tests for PCOS",
                      category: "Symptoms & Diagnosis",
                      description: "A doctor explains the different tests used to diagnose PCOS.",
                      imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67"
                    },
                    {
                      title: "Surgical Options Explained",
                      category: "Treatment Options",
                      description: "When surgery might be recommended and what procedures are available.",
                      imageUrl: "https://images.unsplash.com/photo-1571772996211-2f02c9727629"
                    },
                    {
                      title: "Exercise for PCOS",
                      category: "Lifestyle Management",
                      description: "The best types of exercise for managing PCOS symptoms effectively.",
                      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a"
                    }
                  ].map((video, index) => (
                    <Card key={index}>
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg relative">
                        <img
                          src={video.imageUrl}
                          alt={video.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="rounded-full bg-black/50 p-3">
                            <Video className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary">
                            {video.category}
                          </span>
                        </div>
                        <h3 className="font-medium text-lg mb-1">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">{video.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="guides" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "PCOS Diagnosis Criteria",
                      category: "Symptoms & Diagnosis",
                      description: "Understanding the Rotterdam criteria and other diagnostic methods.",
                      imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370"
                    },
                    {
                      title: "Lifestyle Changes as Treatment",
                      category: "Treatment Options",
                      description: "How diet, exercise, and other lifestyle factors can help manage PCOS.",
                      imageUrl: "https://images.unsplash.com/photo-1574144125986-8cabe7828785"
                    },
                    {
                      title: "PCOS Diet Fundamentals",
                      category: "Lifestyle Management",
                      description: "Nutritional approaches specifically designed for PCOS management.",
                      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
                    }
                  ].map((guide, index) => (
                    <Card key={index}>
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img
                          src={guide.imageUrl}
                          alt={guide.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary">
                            {guide.category}
                          </span>
                        </div>
                        <h3 className="font-medium text-lg mb-1">{guide.title}</h3>
                        <p className="text-sm text-muted-foreground">{guide.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="research" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Recent Advances in PCOS Research",
                      category: "Research",
                      description: "Latest scientific findings on PCOS causes and treatments.",
                      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d"
                    },
                    {
                      title: "Genetic Factors in PCOS",
                      category: "Research",
                      description: "How genetics contribute to PCOS development and manifestation.",
                      imageUrl: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8"
                    },
                    {
                      title: "PCOS Clinical Trials Overview",
                      category: "Research",
                      description: "Current clinical trials and how to participate in PCOS research.",
                      imageUrl: "https://images.unsplash.com/photo-1576671394550-41d42a9af062"
                    }
                  ].map((research, index) => (
                    <Card key={index}>
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img
                          src={research.imageUrl}
                          alt={research.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary">
                            {research.category}
                          </span>
                        </div>
                        <h3 className="font-medium text-lg mb-1">{research.title}</h3>
                        <p className="text-sm text-muted-foreground">{research.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Education;
