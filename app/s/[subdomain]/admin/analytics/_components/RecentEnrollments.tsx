import { getRecentEnrollments } from '@/app/s/[subdomain]/data/admin/admin-get-analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

export async function RecentEnrollments() {
  const enrollments = await getRecentEnrollments();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Enrollments</CardTitle>
      </CardHeader>
      <CardContent>
        {enrollments.length === 0 ? ( // <-- START: EMPTY STATE LOGIC
          <div className='text-muted-foreground py-8 text-center'>
            <p>No enrollments in the last 30 days.</p>
          </div>
        ) : (
          // <-- END: EMPTY STATE LOGIC
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
                    <div className='font-medium'>{e.User.name}</div>
                    <div className='text-muted-foreground text-xs'>
                      {e.User.email}
                    </div>
                  </TableCell>
                  <TableCell>{e.Course.title}</TableCell>
                  <TableCell>{format(new Date(e.createdAt), 'PPP')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
