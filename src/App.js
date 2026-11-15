import { useState, useEffect } from "react";
import "./App.css";
import AddTransaction from "./components/AddTransaction";
import ChartComponent from "./components/ChartComponent";

function App() {
  
  const [transactions, setTransactions] = useState([]);
  const [categoryFilter,setCategoryFilter]=useState("All");
  const [searchTerm,setSearchTerm]=useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("transactions");
    if (savedData) {
      setTransactions(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const deleteTransaction = (indexToDelete) => {
    setTransactions((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  const amounts = transactions.map((t) => Number(t.amount));

  const total = amounts.reduce((acc, item) => acc + item, 0);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => acc + item, 0);
    const filteredTransactions = transactions
    .map((transaction, index) => ({...transaction,originalIndex: index,}))
    .filter((transaction) => {const matchesCategory = categoryFilter === "All" ||(transaction.category || "Other") === categoryFilter;

    const matchesSearch = transaction.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <p>Manage your money smartly!</p>

      <div className="dashboard">
        <div className="card balance">
          <h3>Total Balance</h3>
          <h2>₹{total.toLocaleString("en-IN")}</h2>
        </div>

        <div className="card income">
          <h3>Total Income</h3>
          <h2>₹{income.toLocaleString("en-IN")}</h2>
        </div>

        <div className="card expense">
          <h3>Total Expense</h3>
          <h2>₹{Math.abs(expense).toLocaleString("en-IN")}</h2>
        </div>
      </div>

      <AddTransaction setTransactions={setTransactions} />
  <div className="transaction-history">
  <h3>Transaction History</h3>
  <input type="text"className="search-input"placeholder="search transactions..."value={searchTerm}onChange={(e)=>setSearchTerm(e.target.value)}
  />
  <select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
>
  <option value="All">All Categories</option>
  <option value="Food">Food</option>
  <option value="Travel">Travel</option>
  <option value="Shopping">Shopping</option>
  <option value="Education">Education</option>
  <option value="Salary">Salary</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Other">Other</option>
</select>

  {transactions.length === 0 ? (
    <p className="empty-message">No transactions yet.</p>
  ) : (
    <div className="transaction-list">
      {filteredTransactions.map((t) => (
        <div className="transaction-item" key={t.id || t.originalIndex}>
          <div className="transaction-info">
            <h4>{t.text}</h4>
            <p>
              {t.category || "Other"} • {t.date || "Date unavailable"}
            </p>
          </div>

          <div className="transaction-action">
            <span className={t.amount > 0 ? "positive" : "negative"}>
              {t.amount > 0 ? "+" : "-"}₹
              {Math.abs(t.amount).toLocaleString("en-IN")}
            </span>

            <button
              className="delete-btn"
              onClick={() => deleteTransaction(t.originalIndex)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

      <ChartComponent transactions={transactions} />
    </div>
  );
}

export default App;