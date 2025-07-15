import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
// import { useConstructUrl } from "@/hooks/use-construct-url";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import courseImage from '@/public/course.jpg'


interface iAppProps {
  data: PublicCourseType;
}

export function PublicCourseCard({ data }: iAppProps) {
  // const thumbnailUrl = useConstructUrl(data.fileKey);
  return (
    <Card className="group relative overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:bg-white/80 dark:hover:bg-white/10">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Image
          width={600}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          // src={thumbnailUrl}
          src={courseImage}
          alt={data.title}
        />
        

        <Badge className="absolute top-3 right-3 bg-background text-primary border-0 shadow-lg backdrop-blur-sm">
          {data.level}
        </Badge>
      </div>

      <CardContent className="p-6 space-y-4">
 
        <Link
          className="block font-bold text-lg line-clamp-2 hover:text-primary transition-colors duration-200"
          href={`/courses/${data.slug}`}
        >
          {data.title}
        </Link>

       
        <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
          {data.smallDescription}
        </p>

   
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{data.duration}h</span>
          </div>
          
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span className="font-medium">{data.category}</span>
          </div>
        </div>

        
        <Link
          href={`/courses/${data.slug}`}
          className={buttonVariants({ 
            className: "w-full group/btn relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-xl py-3" 
          })}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
            Start Learning
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur-sm border-0 shadow-lg">
      {/* Image Skeleton */}
      <div className="relative">
        <Skeleton className="w-full h-48" />
        <div className="absolute top-3 right-3">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Course Info Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Button Skeleton */}
        <Skeleton className="w-full h-10 rounded-lg" />
      </CardContent>
    </Card>
  );
}