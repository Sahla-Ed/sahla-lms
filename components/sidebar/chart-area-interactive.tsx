'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { useLocale, useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface ChartAreaInteractiveProps {
  data: { date: string; enrollments: number }[];
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const t = useTranslations('AdminDashboard.enrollmentChart');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const totalEnrollmentsNumber = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.enrollments, 0),
    [data],
  );

  const chartConfig = {
    enrollments: {
      label: t('tooltipLabel'),
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;
  
  const formatDate = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
      month: 'short',
      day: 'numeric',
    });
  };


  const chartData = isRTL ? [...data].reverse() : data;

  return (
    <Card className='@container/card' style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <CardHeader>
        <CardTitle style={{ textAlign: isRTL ? 'right' : 'left' }}>
          {t('title')}
        </CardTitle>
        <CardDescription style={{ textAlign: isRTL ? 'right' : 'left' }}>
          <span className='hidden @[540px]/card:block'>
            {t('description', { total: totalEnrollmentsNumber })}
          </span>
          <span className='@[540px]/card:hidden'>
            {t('descriptionMobile', { total: totalEnrollmentsNumber })}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStart"
              tickFormatter={formatDate}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--color-fill)' }}
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  labelFormatter={formatDate}
                />
              }
            />
            <Bar dataKey={'enrollments'} fill='var(--color-enrollments)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}