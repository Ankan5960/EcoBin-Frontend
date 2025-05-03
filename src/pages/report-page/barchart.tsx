import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export type Props = {
  wet: number[];
  dry: number[];
};

export function BarChart(props: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Wet waste",
        data: props.wet,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dry waste",
        data: props.dry,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
