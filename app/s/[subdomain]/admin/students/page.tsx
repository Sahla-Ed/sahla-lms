import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { adminGetStudents } from '../../data/admin/admin-get-students';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye, Lock, Users } from 'lucide-react';
import { EmptyState } from '@/components/general/EmptyState'; // <-- ADD IMPORT
import { checkPlanStatus } from '@/lib/subscription'; // <-- IMPORT

// Helper component for the upgrade notice
const UpgradeNotice = () => (
  <Card className='flex flex-col items-center justify-center p-8 text-center'>
    <div className='bg-muted mb-4 rounded-full p-3'>
      <Lock className='text-muted-foreground h-8 w-8' />
    </div>
    <h3 className='text-xl font-bold'>Unlock Student Analytics</h3>
    <p className='text-muted-foreground mt-2 max-w-md'>
      View detailed progress and analytics for each of your students by
      upgrading to the Pro plan.
    </p>
    <Button asChild className='mt-6'>
      <Link href='/admin/settings/billing'>Upgrade to Pro</Link>
    </Button>
  </Card>
);

export default async function StudentsPage() {
  const plan = await checkPlanStatus();

  // --- START: THE FIX ---
  if (plan.planName !== 'PRO') {
    return (
      <div className='space-y-6'>
        <h1 className='text-2xl font-bold'>Students</h1>
        <UpgradeNotice />
      </div>
    );
  }
  // --- END: THE FIX ---
  const students = await adminGetStudents();

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Students</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Students ({students.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? ( // <-- START: EMPTY STATE LOGIC
            <div className='py-8'>
              <EmptyState
                title='No Students Yet'
                description='Your students will appear here once they sign up and enroll in a course.'
                icon={<Users className='text-primary size-10' />}
                // buttonText="Invite a Student" // You can add a button if you wish
                // href="/admin/teams" // The button links to the teams page
              />
            </div>
          ) : (
            // <-- END: EMPTY STATE LOGIC
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead>Enrollments</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className='font-medium'>
                      {student.name}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      {format(new Date(student.createdAt), 'PPP')}
                    </TableCell>
                    <TableCell>{student._count.enrollment}</TableCell>
                    <TableCell>
                      <Button asChild variant='ghost' size='icon'>
                        <Link href={`/admin/students/${student.id}`}>
                          <Eye className='h-4 w-4' />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
