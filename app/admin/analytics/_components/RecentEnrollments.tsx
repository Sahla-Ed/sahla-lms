import { getRecentEnrollments } from "@/app/data/admin/admin-get-analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

export async function RecentEnrollments() {
  const enrollments = await getRecentEnrollments();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Enrollments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map((e) => (
              <TableRow key={e.id}>
                <TableCell>
                  <div className="font-medium">{e.User.name}</div>
                  <div className="text-xs text-muted-foreground">{e.User.email}</div>
                </TableCell>
                <TableCell>{e.Course.title}</TableCell>
                <TableCell>{format(new Date(e.createdAt), "PPP")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}