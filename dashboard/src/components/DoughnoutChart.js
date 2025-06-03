import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography, CircularProgress } from '@mui/material';
import { useCharts } from '../context/ChartContext';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      align: "center",
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return `${context.label}: ${context.formattedValue}%`;
        }
      }
    }
  }
};

export function DoughnutChart({ title, type = 'portfolio', height = 300 }) {
  const { portfolioDistribution, sectorDistribution } = useCharts();
  
  const data = type === 'portfolio' ? portfolioDistribution : sectorDistribution;
  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      title: {
        display: true,
        text: title || (type === 'portfolio' ? 'Portfolio Distribution' : 'Sector Distribution'),
      }
    }
  };

  if (!data) {
    return (
      <Box 
        height={height} 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box height={height}>
      <Doughnut options={options} data={data} />
    </Box>
  );
}
