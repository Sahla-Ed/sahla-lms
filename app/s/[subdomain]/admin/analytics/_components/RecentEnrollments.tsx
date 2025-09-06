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
import { getTranslations } from 'next-intl/server';

type TFunction = Awaited<ReturnType<typeof getTranslations<'AnalyticsPage'>>>;

export async function RecentEnrollments({ t }: { t: TFunction }) {
  const enrollments = await getRecentEnrollments();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('recentEnrollments.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {enrollments.length === 0 ? (
          <div className='text-muted-foreground py-8 text-center'>
            <p>{t('recentEnrollments.emptyState')}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('recentEnrollments.table.student')}</TableHead>
                <TableHead>{t('recentEnrollments.table.course')}</TableHead>
                <TableHead>{t('recentEnrollments.table.date')}</TableHead>
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
