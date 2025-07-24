import { getKpiStats } from '@/app/s/[subdomain]/data/admin/admin-get-analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, DollarSign, ShoppingCart, Users } from 'lucide-react';

export async function KpiCards() {
  const { totalUsers, totalCourses, totalEnrollments, totalRevenue } =
    await getKpiStats();
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      <KpiCard
        title='Total Revenue'
        value={`$${totalRevenue.toFixed(2)}`}
        icon={DollarSign}
      />
      <KpiCard
        title='Total Enrollments'
        value={totalEnrollments.toString()}
        icon={ShoppingCart}
      />
      <KpiCard title='Total Users' value={totalUsers.toString()} icon={Users} />
      <KpiCard
        title='Total Courses'
        value={totalCourses.toString()}
        icon={BookOpen}
      />
    </div>
  );
}

function KpiCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='text-muted-foreground h-4 w-4' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
      </CardContent>
    </Card>
  );
}

export function KpiSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className='bg-muted h-[108px] animate-pulse rounded-lg' />
        </Card>
      ))}
    </div>
  );
}
