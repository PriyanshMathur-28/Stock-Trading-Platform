import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Typography, CircularProgress } from '@mui/material';
import { useCharts } from '../context/ChartContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return `$${context.formattedValue}`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return '$' + value;
        }
      }
    }
  }
};

export function VerticalGraph({ title, type = 'holdings', height = 300 }) {
  const { holdingsData, performanceData } = useCharts();
  
  const data = type === 'holdings' ? holdingsData : performanceData;
  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      title: {
        display: true,
        text: title || (type === 'holdings' ? 'Holdings Distribution' : 'Performance Trend'),
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
      <Bar options={options} data={data} />
    </Box>
  );
}
