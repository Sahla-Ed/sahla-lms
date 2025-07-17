import { PlaceholderPage } from "@/components/general/PlaceholderPage";
import { MessagesSquare } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discussion Forums | Sahla",
  description: "Engage in conversations, ask questions, and share your knowledge in the Sahla discussion forums. Connect with instructors and peers.",
};

export default function ForumsPage() {
  return (
    <PlaceholderPage
      title="Discussion Forums"
      description="This feature is under construction. Our community forums will soon be a place for lively discussions, Q&A with instructors, and peer-to-peer support."
      badgeText="Coming Soon"
      icon={<MessagesSquare className="h-4 w-4 mr-2" />}
    />
  );
}
