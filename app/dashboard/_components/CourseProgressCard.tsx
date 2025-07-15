/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

//todo: implement this component
// import { EnrolledCourseType } from "@/app/data/user/get-enrolled-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { useCourseProgress } from "@/hooks/use-course-progress";

import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  //todo uncomment when EnrolledCourseType is implemented, replace (any) type
  // data: EnrolledCourseType;
  data: any;
}

export function CourseProgressCard({ data }: any) {
  //todo: uncomment when useConstructUrl is implemented, replace dummy_url
  // const thumbnailUrl = useConstructUrl(data.Course.fileKey);
  const thumbnailUrl =
    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp";

  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({ courseData: data.Course as any });

  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10">{data.Course.level}</Badge>

      <Image
        width={600}
        height={400}
        className="w-full rounded-t-xl aspect-video h-full object-cover"
        src={thumbnailUrl}
        alt="Thumbail Image of Course"
      />

      <CardContent className="p-4">
        <Link
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
          href={`/dashboard/${data.Course.slug}`}
        >
          {data.Course.title}
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {data.Course.smallDescription}
        </p>

        <div className="space-y-4 mt-5">
          <div className="flex justify-between mb-1 text-sm">
            <p>Progress:</p>
            <p className="font-medium">{progressPercentage}%</p>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />

          <p className="text-xs text-muted-foreground mt-1">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        <Link
          href={`/dashboard/${data.Course.slug}`}
          className={buttonVariants({ className: "w-full mt-4" })}
        >
          Learn More
        </Link>
      </CardContent>
    </Card>
  );
}
