import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function ChartComponent({ transactions }) {
  const data = {
    labels: transactions.map((t) => t.text),

    datasets: [
      {
        label: "Income",
        data: transactions.map((t) =>
          t.amount > 0 ? t.amount : 0
        ),
        backgroundColor: "#22c55e",
        borderRadius: 6,
      },
      {
        label: "Expense",
        data: transactions.map((t) =>
          t.amount < 0 ? Math.abs(t.amount) : 0
        ),
        backgroundColor: "#f97316",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ₹${context.raw}`,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "₹" + value,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h3>Income & Expense Analysis</h3>

      <div className="chart-box">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default ChartComponent;