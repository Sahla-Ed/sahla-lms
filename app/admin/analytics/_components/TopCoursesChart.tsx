'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface TopCoursesChartProps {
  data: {
    name: string;
    enrollments: number;
  }[];
}

export function TopCoursesChart({ data }: TopCoursesChartProps) {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data} layout='vertical'>
        <XAxis type='number' hide />
        <YAxis
          dataKey='name'
          type='category'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={100}
        />
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Bar
          dataKey='enrollments'
          fill='var(--chart-2)'
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
