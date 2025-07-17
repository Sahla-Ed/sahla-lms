import { PlaceholderPage } from "@/components/general/PlaceholderPage";
import { Library } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Catalog | Sahla",
  description: "Explore the complete catalog of courses available on Sahla. Find your next learning opportunity across a wide range of subjects.",
};

export default function CatalogPage() {
  return (
    <PlaceholderPage
      title="Course Catalog"
      description="This page is under construction. We are building a comprehensive, filterable catalog of all our courses to help you find the perfect learning path."
      badgeText="Coming Soon"
      icon={<Library className="h-4 w-4 mr-2" />}
    />
  );
}
