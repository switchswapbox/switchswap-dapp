import { ReactNode } from 'react';
import { ApexOptions } from 'apexcharts';

import ReactApexChart from 'react-apexcharts';

// material
import { useTheme } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';

const CHART_DATA = [{ data: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26] }];

export default function StatisticsCard({
  text,
  value,
  children
}: {
  text: string;
  value: number;
  children: ReactNode;
}) {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    colors: [theme.palette.primary.main],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName: number | string) => fNumber(seriesName),
        title: {
          formatter: (seriesName: number | string) => ''
        }
      },
      marker: { show: false }
    }
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} sx={{ pb: 2 }} alignItems="center">
          {children}
          <Typography variant="subtitle2">{text}</Typography>
        </Stack>

        <Typography variant="h3">{fNumber(value)}</Typography>
      </Box>

      <ReactApexChart
        type="bar"
        series={CHART_DATA}
        options={chartOptions}
        width={60}
        height={36}
      />
    </Card>
  );
}
