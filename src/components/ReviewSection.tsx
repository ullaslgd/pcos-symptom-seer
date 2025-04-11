
import React from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating = ({ rating, size = 16 }: StarRatingProps) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-${i}`} className="fill-amber-400 text-amber-400" size={size} />);
  }
  
  // Add half star if applicable
  if (hasHalfStar) {
    stars.push(<StarHalf key="half-star" className="fill-amber-400 text-amber-400" size={size} />);
  }
  
  // Add empty stars to reach 5 total
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<StarOff key={`empty-${i}`} className="text-gray-300" size={size} />);
  }
  
  return <div className="flex gap-0.5">{stars}</div>;
};

interface ReviewCardProps {
  name: string;
  avatar: string;
  review: string;
  rating: number;
  date: string;
}

const ReviewCard = ({ name, avatar, review, rating, date }: ReviewCardProps) => (
  <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1 duration-300 border-pcos-200">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <Avatar className="h-12 w-12 border-2 border-pcos-200">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-pcos-100 text-pcos-700">{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h4 className="font-semibold text-foreground">{name}</h4>
          <div className="flex items-center gap-2">
            <StarRating rating={rating} />
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
        </div>
      </div>
      <p className="text-foreground/90 text-sm italic flex-grow">{review}</p>
    </CardContent>
  </Card>
);

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      review: "The symptom tracker helped me understand my PCOS patterns. I've shared it with my doctor and it has improved our conversations significantly.",
      rating: 5,
      date: "May 10, 2024"
    },
    {
      id: 2,
      name: "Michelle Lee",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      review: "I really appreciate how this tool helped me connect the dots between my symptoms. The resources section was also incredibly helpful.",
      rating: 4.5,
      date: "April 22, 2024"
    },
    {
      id: 3,
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb",
      review: "This is exactly what I needed! After years of frustrating doctor visits, this tool helped me articulate my symptoms better.",
      rating: 5,
      date: "April 15, 2024"
    },
    {
      id: 4,
      name: "Jessica Martinez",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      review: "The daily tracking feature has been a game-changer for me. I can now see patterns in my symptoms related to my diet and exercise.",
      rating: 4,
      date: "March 30, 2024"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-pcos-50">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from women who have used our tools to better understand their PCOS symptoms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <ReviewCard 
              key={review.id}
              name={review.name}
              avatar={review.avatar}
              review={review.review}
              rating={review.rating}
              date={review.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
