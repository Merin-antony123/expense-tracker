import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ChartComponent({ transactions }) {
  const data = {
    labels: transactions.map((t) => t.text),
    datasets: [
      {
        label: "Amount (₹)",
        data: transactions.map((t) => t.amount),
        backgroundColor: transactions.map((t) =>
         t.amount > 0 ? "green" : "red"
         ),
      },
    ],
  };

  return (
    <div>
      <h3>Transaction Chart</h3>
      <Bar data={data} />
    </div>
  );
}

export default ChartComponent;