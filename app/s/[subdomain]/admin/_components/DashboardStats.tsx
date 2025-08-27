import { getTranslations } from 'next-intl/server';
import { Users, Activity, ShoppingCart, DollarSign } from 'lucide-react';
import { adminGetDashboardStats } from '../../data/admin/admin-get-dashboard-stats';
import { StatCard } from './StatCard';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardStatsProps {
  t: Awaited<ReturnType<typeof getTranslations<'AdminDashboard'>>>;
}

export async function DashboardStats({ t }: DashboardStatsProps) {
  const stats = await adminGetDashboardStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title={t('kpi.totalStudents.title')} value={stats.totalCustomers} description={t('kpi.totalStudents.description')} Icon={Users} />
      <StatCard title={t('kpi.activeStudents.title')} value={stats.activeStudents} description={t('kpi.activeStudents.description')} Icon={Activity} />
      <StatCard title={t('kpi.newEnrollments.title')} value={stats.newEnrollments} description={t('kpi.newEnrollments.description')} Icon={ShoppingCart} />
      <StatCard title={t('kpi.revenueThisMonth.title')} value={`$${stats.totalRevenue.toFixed(2)}`} description={t('kpi.revenueThisMonth.description')} Icon={DollarSign} />
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-[105px] w-full rounded-xl" />
      <Skeleton className="h-[105px] w-full rounded-xl" />
      <Skeleton className="h-[105px] w-full rounded-xl" />
      <Skeleton className="h-[105px] w-full rounded-xl" />
    </div>
  );
}