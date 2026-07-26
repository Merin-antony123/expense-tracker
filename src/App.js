import { useState, useEffect } from "react";
import AddTransaction from "./components/AddTransaction";
import ChartComponent from "./components/ChartComponent";

function App() {

  const [transactions, setTransactions] = useState([]);

  const deleteTransaction = (indexToDelete) => {
  setTransactions((prev) =>
    prev.filter((_, index) => index !== indexToDelete)
  );
};

  const amounts = transactions.map((t) => t.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0);

  const income = amounts
  .filter((item) => item > 0)
  .reduce((acc, item) => acc + item, 0);

   const expense = amounts
  .filter((item) => item < 0)
  .reduce((acc, item) => acc + item, 0);

   useEffect(() => {
   const savedData = localStorage.getItem("transactions");

   if (savedData) {
     setTransactions(JSON.parse(savedData));
   }
   }, []);

   useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

  return (
    <div>
      <h1>Expense Tracker</h1>

      <AddTransaction setTransactions={setTransactions} />
      <h3>Transactions</h3>

      <h3>Balance: ₹{total}</h3>
      <p>Income: ₹{income}</p>
      <p>Expense: ₹{Math.abs(expense)}</p>
      <ChartComponent transactions={transactions} />

      <ul>
        {transactions.map((t, index) => (
          <li key={index}>
            {t.text} - ₹{t.amount}
            <button onClick={() => deleteTransaction(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;