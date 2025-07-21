import { adminGetEnrollmentStats } from "@/app/data/admin/admin-get-enrollment-stats";
import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";

export async function EnrollmentChart() {
  const enrollmentData = await adminGetEnrollmentStats();
  return <ChartAreaInteractive data={enrollmentData} />;
}