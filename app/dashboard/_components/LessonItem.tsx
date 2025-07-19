import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, HelpCircle, Play } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  lesson: {
    id: string;
    title: string;
    type: "VIDEO" | "QUIZ";
    position: number;
    description: string | null;
  };
  slug: string;
  isActive?: boolean;
  completed: boolean;
  quizFailed?: boolean;
}

export function LessonItem({
  lesson,
  slug,
  isActive,
  completed,
  quizFailed,
}: iAppProps) {
  return (
    <Link
      href={`/dashboard/${slug}/${lesson.id}`}
      className={buttonVariants({
        variant: completed && !quizFailed ? "secondary" : "outline",
        className: cn(
          "w-full p-2.5 h-auto justify-start transition-all",
          completed &&
            !quizFailed &&
            "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-800 dark:text-green-200",
          quizFailed &&
            "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-800 dark:text-red-200",
          isActive &&
            !completed &&
            !quizFailed &&
            "bg-primary/10 dark:bg-primary/20 border-primary/50 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary"
        ),
      })}
    >
      <div className="flex items-center gap-2.5 w-full min-w-0">
        <div className="shrink-0">
          {completed && !quizFailed ? (
            <div className="size-5 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center">
              <Check className="size-3 text-white" />
            </div>
          ) : quizFailed ? (
            <div className="size-5 rounded-full bg-red-600 dark:bg-red-500 flex items-center justify-center">
              
              <svg
                className="size-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          ) : lesson.type === "QUIZ" ? (
            <HelpCircle
              className={cn(
                "size-5",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            />
          ) : (
            <div
              className={cn(
                "size-5 rounded-full border-2 bg-background flex justify-center items-center",
                isActive
                  ? "border-primary bg-primary/10 dark:bg-primary/20"
                  : "border-muted-foreground/60"
              )}
            >
              <Play
                className={cn(
                  "size-2.5 fill-current",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
            </div>
          )}
        </div>

        <div className="flex-1 text-left min-w-0">
          <p
            className={cn(
              "test-xs font-medium truncate",
              completed && !quizFailed
                ? "text-green-800 dark:text-green-200"
                : quizFailed
                  ? "text-red-800 dark:text-red-200"
                  : isActive
                    ? "text-primary font-semibold"
                    : "text-foreground"
            )}
          >
            {lesson.position}. {lesson.title}
          </p>
          {completed && !quizFailed && (
            <p className="text-[10px] text-green-700 dark:text-green-300 font-medium">
              Completed
            </p>
          )}
          {quizFailed && (
            <p className="text-[10px] text-red-700 dark:text-red-300 font-medium">
              Try again?
            </p>
          )}
          {isActive && !completed && !quizFailed && (
            <p className="text-[10px] text-primary font-mediums">
              Currently Watching
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
