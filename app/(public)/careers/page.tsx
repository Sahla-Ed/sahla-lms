import { PlaceholderPage } from "@/components/general/PlaceholderPage";
import { Briefcase } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Join the Sahla Team",
  description: "Explore career opportunities at Sahla. Join our mission to revolutionize online education and empower learners worldwide.",
};

export default function CareersPage() {
  return (
    <PlaceholderPage
      title="Join Our Team"
      description="This page is under construction. We're always looking for passionate people to join our mission. Our careers page with open positions will be available soon."
      badgeText="Coming Soon"
      icon={<Briefcase className="h-4 w-4 mr-2" />}
    />
  );
}
