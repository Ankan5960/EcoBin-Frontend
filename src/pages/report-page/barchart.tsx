import { DustbinStatusList } from "@/types/reportTypes";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const BarChart: React.FC<DustbinStatusList> = ({
  dustbinStatusList,
}) => {
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

  const data = {
    labels: dustbinStatusList.map((status) => status.statusName),
    datasets: [
      {
        label: "Number of Dustbin",
        data: dustbinStatusList.map((status) => status.statusValue),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
        ],
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
