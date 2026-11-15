import { useState } from "react";

function AddTransaction({ setTransactions }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() || !amount || Number(amount) <= 0) {
      alert("Please enter a valid description and amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      text: text.trim(),
      amount:type === "income"
          ? Number(amount)
          : -Number(amount),
      type,
      category,
      date,
    };

    setTransactions((prev) => [...prev, newTransaction]);

    setText("");
    setAmount("");
    setType("expense");
    setCategory("Food");
    setDate(new Date().toLocaleDateString("en-CA"));
  };

  return (
    <div className="add-transaction">
      <h3>Add NewTransaction</h3>

      <form className="transaction-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter amount"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Education</option>
          <option>Salary</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;