import { useState } from "react";

function AddTransaction({ setTransactions }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "" || amount === "") {
      alert("Please enter all fields");
      return;
    }

    const newTransaction = {
      text,
      amount: Number(amount),
    };

    setTransactions((prev) => [...prev, newTransaction]);
    setText("");
    setAmount("");
  };

  return (
    <div>
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTransaction;
