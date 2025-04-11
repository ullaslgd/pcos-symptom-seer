
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { MessageSquare, Search, Users, BookOpen } from 'lucide-react';

// Sample expert data
const experts = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Gynecologist, MD",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "Dr. Johnson is a board-certified gynecologist with over 15 years of experience specializing in PCOS and hormonal disorders."
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Endocrinologist, MD",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    bio: "Dr. Chen is an endocrinologist specializing in hormonal imbalances and has published extensive research on PCOS management."
  },
  {
    id: 3,
    name: "Dr. Lisa Patel",
    title: "Reproductive Specialist, MD",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb",
    bio: "Dr. Patel focuses on fertility issues related to PCOS and has helped hundreds of women conceive despite their PCOS diagnosis."
  },
  {
    id: 4,
    name: "Emma Rodriguez, RD",
    title: "Registered Dietitian",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    bio: "Emma specializes in nutrition for hormonal health and helps women manage PCOS through evidence-based dietary approaches."
  }
];

// Sample Q&A data
const sampleQuestions = [
  {
    id: 1,
    user: "Anonymous",
    category: "Symptoms",
    question: "Is hair loss on the scalp common with PCOS? What treatments are most effective?",
    answer: "Yes, hair loss (androgenic alopecia) is a common symptom of PCOS due to excess androgens. Effective treatments include anti-androgen medications like spironolactone, minoxidil, and addressing underlying insulin resistance through diet and medications like metformin. Some women also benefit from low-dose birth control pills that contain anti-androgenic progestins.",
    expert: experts[0],
    date: "2024-04-02"
  },
  {
    id: 2,
    user: "Sarah T.",
    category: "Nutrition",
    question: "What diet is best for managing PCOS? Should I be completely avoiding carbs?",
    answer: "There's no one-size-fits-all diet for PCOS, but many women benefit from a lower glycemic index diet that focuses on complex carbohydrates rather than eliminating carbs completely. Prioritize whole foods, lean proteins, healthy fats, and plenty of vegetables. Aim for balanced meals that include moderate amounts of fiber-rich carbohydrates paired with protein and fat to minimize blood sugar spikes.",
    expert: experts[3],
    date: "2024-03-28"
  },
  {
    id: 3,
    user: "Michelle L.",
    category: "Fertility",
    question: "Can women with PCOS have successful pregnancies without medical intervention?",
    answer: "Yes, many women with PCOS can conceive naturally and have successful pregnancies without intervention. Lifestyle modifications like weight management (if needed), regular exercise, and a balanced diet can help regulate cycles and improve fertility. However, if you've been trying to conceive for over 6-12 months without success, I recommend seeking a fertility specialist who can provide appropriate treatment options.",
    expert: experts[2],
    date: "2024-03-15"
  }
];

// Form schema
const questionFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).optional(),
  email: z.string().email({ message: "Please enter a valid email" }),
  category: z.string().min(1, { message: "Please select a category" }),
  question: z.string().min(10, { message: "Your question must be at least 10 characters" }),
  isPrivate: z.boolean().default(false)
});

type QuestionFormValues = z.infer<typeof questionFormSchema>;

const ExpertQA = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "",
      question: "",
      isPrivate: false
    }
  });

  const onSubmit = (values: QuestionFormValues) => {
    toast({
      title: "Question submitted!",
      description: "Our experts will review your question and respond soon.",
    });
    form.reset();
  };

  // Filter questions based on search term and category
  const filteredQuestions = sampleQuestions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filter === "all" || q.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container px-4 py-8 sm:px-6 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold gradient-text mb-4">Expert Q&A</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get advice and answers from healthcare professionals who specialize in PCOS.
            </p>
          </div>

          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="browse">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Q&A
              </TabsTrigger>
              <TabsTrigger value="ask">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask a Question
              </TabsTrigger>
              <TabsTrigger value="experts">
                <Users className="h-4 w-4 mr-2" />
                Meet Our Experts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse" className="border-none p-0">
              <Card>
                <CardHeader>
                  <CardTitle>Previously Answered Questions</CardTitle>
                  <CardDescription>
                    Browse through common questions about PCOS answered by our experts
                  </CardDescription>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search questions and answers..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="symptoms">Symptoms</SelectItem>
                        <SelectItem value="treatment">Treatment</SelectItem>
                        <SelectItem value="nutrition">Nutrition</SelectItem>
                        <SelectItem value="fertility">Fertility</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {filteredQuestions.length > 0 ? (
                      filteredQuestions.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="font-medium text-lg">{item.question}</div>
                              <div className="text-sm text-muted-foreground">
                                Asked by {item.user} • {item.category} • {item.date}
                              </div>
                            </div>
                          </div>
                          <div className="mb-4 text-foreground/90">
                            {item.answer}
                          </div>
                          <div className="flex items-center gap-3 pt-2 border-t">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={item.expert.avatar} alt={item.expert.name} />
                              <AvatarFallback>{item.expert.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{item.expert.name}</div>
                              <div className="text-xs text-muted-foreground">{item.expert.title}</div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No questions found matching your criteria.</p>
                        <Button variant="link" onClick={() => { setSearchTerm(""); setFilter("all"); }}>
                          Reset search
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ask" className="border-none p-0">
              <Card>
                <CardHeader>
                  <CardTitle>Ask Our Experts</CardTitle>
                  <CardDescription>
                    Submit your question about PCOS and our healthcare professionals will respond.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="symptoms">Symptoms</SelectItem>
                                <SelectItem value="treatment">Treatment</SelectItem>
                                <SelectItem value="nutrition">Nutrition</SelectItem>
                                <SelectItem value="fertility">Fertility</SelectItem>
                                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Question</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please describe your question in detail..."
                                className="min-h-[150px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-between items-center pt-2">
                        <div className="text-sm text-muted-foreground">
                          Questions are typically answered within 48 hours.
                        </div>
                        <Button type="submit">Submit Question</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="experts" className="border-none p-0">
              <Card>
                <CardHeader>
                  <CardTitle>Our PCOS Experts</CardTitle>
                  <CardDescription>
                    Meet the healthcare professionals who answer your questions and provide guidance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {experts.map(expert => (
                      <div key={expert.id} className="border rounded-lg p-6 flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src={expert.avatar} alt={expert.name} />
                          <AvatarFallback>{expert.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-medium">{expert.name}</h3>
                        <p className="text-sm text-pcos-500 mb-4">{expert.title}</p>
                        <p className="text-sm text-muted-foreground">{expert.bio}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExpertQA;
