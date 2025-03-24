'use client';

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';

export default function RatingChart({ vote_average, vote_count }: { vote_average: number; vote_count: number }) {
  const maxValue = 10;
  const chartData = [
    { browser: 'safari', rating: vote_average, fill: 'hsl(var(--chart-2))' }, // Misal 75%
  ];

  const chartConfig: ChartConfig = {
    rating: {
      label: 'Rating',
    },
    safari: {
      label: 'Safari',
      color: 'hsl(var(--chart-2))',
    },
  };
  const endAngle = (chartData[0].rating / maxValue) * 360;

  return (
    <ChartContainer config={chartConfig} className="p-0 relative -left-[100px] -top-[15px] -mb-[50px]">
      <RadialBarChart data={chartData} startAngle={90} endAngle={90 - endAngle} innerRadius='50%' outerRadius='70%' className='w-full'>
        <PolarGrid gridType='circle' radialLines={false} stroke='none' className='first:fill-muted last:fill-background w-full' />
        <RadialBar dataKey='rating' data={[chartData[0]]} fill={chartData[0].fill} background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} className='w-full'>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                    <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-xs sm:text-xl md:text-2xl font-bold'>
                      {chartData[0].rating.toFixed(1)}
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground text-xs'>
                      {vote_count} votes
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
