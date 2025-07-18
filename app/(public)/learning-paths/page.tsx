import { PlaceholderPage } from "@/components/general/PlaceholderPage";
import { GitFork } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Paths | Sahla",
  description: "Follow curated learning paths designed by experts to master a skill from start to finish. Achieve your career goals with a structured curriculum.",
};

export default function LearningPathsPage() {
  return (
    <PlaceholderPage
      title="Learning Paths"
      description="This feature is under construction. Soon, you will be able to follow expert-curated learning paths that guide you from beginner to expert in your chosen field."
      badgeText="Coming Soon"
      icon={<GitFork className="h-4 w-4 mr-2" />}
    />
  );
}
