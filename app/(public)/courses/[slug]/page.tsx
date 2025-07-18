import { getIndividualCourse } from "@/app/data/course/get-course";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  IconBook,
  IconCategory,
  IconChevronDown,
  IconPlayerPlay,
  IconStar,
  IconDownload,
  IconCertificate,
  IconInfinity,
} from "@tabler/icons-react";
import { PlayCircle, Clock, BarChart3, BookOpen } from "lucide-react";
import Image from "next/image";
import { checkIfCourseBought } from "@/app/data/user/user-is-enrolled";
import Link from "next/link";
import { EnrollmentButton } from "./_components/EnrollmentButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { constructUrl } from "@/hooks/use-construct-url";

type PageParams = Promise<{ slug: string }>;

type MetadataParams = {
  params: PageParams;
};

export async function generateMetadata({
  params,
}: MetadataParams): Promise<Metadata> {
  const resolvedParams = await params;
  const course = await getIndividualCourse(resolvedParams.slug);

  return {
    title: course.title,
    description: course.smallDescription,
  };
}

export default async function SlugPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const course = await getIndividualCourse(slug);
  const isEnrolled = await checkIfCourseBought(course.id);

  const totalLessons = course.chapter.reduce(
    (total, chapter) => total + chapter.lessons.length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Content */}
            <div className="order-2 lg:order-1 lg:col-span-8">
              {/* Course Image */}
              <div className="group relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl shadow-primary/10 border border-border/50">
                <Image
                  src={constructUrl(course.fileKey!)}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="rounded-full bg-white/20 backdrop-blur-sm p-6 border border-white/30">
                    <PlayCircle className="size-16 text-white" />
                  </div>
                </div>
              </div>

              {/* Course Header */}
              <div className="mt-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      <IconStar className="size-3 mr-1" />
                      Featured Course
                    </Badge>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {course.title}
                  </h1>

                  <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                    {course.smallDescription}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="group p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        <BarChart3 className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Level
                        </p>
                        <p className="font-semibold">{course.level}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        <Clock className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Duration
                        </p>
                        <p className="font-semibold">{course.duration}h</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        <BookOpen className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Lessons
                        </p>
                        <p className="font-semibold">{totalLessons}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        <IconCategory className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Category
                        </p>
                        <p className="font-semibold">{course.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-12" />

              {/* Course Description */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <IconBook className="size-6" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    What You&apos;ll Learn
                  </h2>
                </div>

                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <RenderDescription json={JSON.parse(course.description)} />
                </Card>
              </div>

              {/* Course Content */}
              <div className="mt-16 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <IconPlayerPlay className="size-6" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">
                        Course Content
                      </h2>
                      <p className="text-muted-foreground">
                        {course.chapter.length} chapters • {totalLessons}{" "}
                        lessons
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {course.chapter.map((chapter, index) => (
                    <Collapsible key={chapter.id} defaultOpen={index === 0}>
                      <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                        <CollapsibleTrigger className="w-full">
                          <CardContent className="p-6 hover:bg-muted/30 transition-all duration-300">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-bold text-lg border-2 border-primary/20">
                                  {index + 1}
                                </div>
                                <div className="text-left">
                                  <h3 className="text-xl font-bold mb-1">
                                    {chapter.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {chapter.lessons.length} lesson
                                    {chapter.lessons.length !== 1 ? "s" : ""}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <Badge
                                  variant="secondary"
                                  className="bg-primary/10 text-primary"
                                >
                                  {chapter.lessons.length} lesson
                                  {chapter.lessons.length !== 1 ? "s" : ""}
                                </Badge>
                                <IconChevronDown className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                            </div>
                          </CardContent>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <div className="border-t bg-muted/10 backdrop-blur-sm">
                            <div className="p-6 pt-4 space-y-2">
                              {chapter.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lesson.id}
                                  className="group/lesson flex items-center gap-4 rounded-lg p-4 hover:bg-accent/50 transition-all duration-200 border border-transparent hover:border-border/50"
                                >
                                  <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary/20 group-hover/lesson:border-primary/40 transition-all duration-200">
                                    <IconPlayerPlay className="size-4 text-primary" />
                                  </div>

                                  <div className="flex-1">
                                    <p className="font-medium text-sm group-hover/lesson:text-primary transition-colors">
                                      {lesson.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Lesson {lessonIndex + 1} • 5 min
                                    </p>
                                  </div>

                                  <div className="opacity-0 group-hover/lesson:opacity-100 transition-opacity">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Preview
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Enrollment Card */}
            <div className="order-1 lg:order-2 lg:col-span-4">
              <div className="sticky top-8">
                <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/10">
                  <CardContent className="p-0">
                    {/* Price Header */}
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border/50">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Course Price
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-4xl font-bold text-primary">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(course.price)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Course Features */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">
                          This course includes:
                        </h4>
                        <div className="grid gap-3">
                          {[
                            {
                              icon: IconInfinity,
                              text: "Full lifetime access",
                              highlight: true,
                            },
                            {
                              icon: IconDownload,
                              text: "Downloadable resources",
                            },
                            {
                              icon: IconCertificate,
                              text: "Certificate of completion",
                            },
                          ].map((feature, index) => (
                            <div
                              key={index}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                                feature.highlight
                                  ? "bg-primary/5 border border-primary/20"
                                  : "hover:bg-muted/50"
                              )}
                            >
                              <div
                                className={cn(
                                  "p-2 rounded-lg",
                                  feature.highlight
                                    ? "bg-primary/10 text-primary"
                                    : "bg-muted text-muted-foreground"
                                )}
                              >
                                <feature.icon className="size-4" />
                              </div>
                              <span className="text-sm font-medium">
                                {feature.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Course Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                          <div className="text-2xl font-bold text-primary">
                            {course.duration}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Hours
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                          <div className="text-2xl font-bold text-primary">
                            {totalLessons}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Lessons
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="space-y-3">
                        {isEnrolled ? (
                          <Link
                            className={buttonVariants({
                              className:
                                "w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg shadow-primary/25",
                            })}
                            href="/dashboard"
                          >
                            <IconPlayerPlay className="size-5 mr-2" />
                            Continue Learning
                          </Link>
                        ) : (
                          <EnrollmentButton courseId={course.id} />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
