import React, { useState } from "react";

const ExpenseTracker = () => {
  // Initilize useState using transactions, title, amount, type, showForm and search

  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState("income");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');


  const filteredTransactions = transactions.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  const displayedTransactions = search
    ? filteredTransactions
    : transactions;

  const totalIncome = transactions.filter((t) => t.type == 'income').reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      console.log(typeof acc, typeof curr?.amount);
      return acc + curr.amount;
    }, 0);

  const balance = totalIncome - totalExpense;

  //Calculate balance using totalIncome and totalExpense

  const handleAddTransaction = () => {
    // complete logic to create a new transaction object
    // update the state and reset form fields
    if (!amount || title.trim().length == 0) return;
    setTransactions(prev => [
      ...prev,
      {
        title: title,
        amount: Number(amount),
        type: type,
        id: Date.now()
      }
    ])
    setTitle('');
    setAmount('');
    setType('income');
    setShowForm(!showForm);
  };

  const handleDelete = (id) => {
    const updated = transactions.filter((t) => t.id != id);
    setTransactions(updated);
  };

  return (
    <div className="tracker-container">
      <h2>Expense Tracker</h2>

      <div className="header-container">
        <div className="balance">
          <h3 data-testid="balance-amount">Balance: ₹{balance}</h3>
        </div>

        <button
          className="toggle-form-button"
          data-testid="toggle-form-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Close Form' : 'Open Form'}
        </button>
      </div>

      {showForm && <div className="form">
        <input
          type="text"
          data-testid="title-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          data-testid="amount-input"
          placeholder="Amount"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          data-testid="type-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button data-testid="add-button" onClick={handleAddTransaction}>
          Add Transaction
        </button>
      </div>}

      <div className="summary">
        <div data-testid="income-amount">Income: ₹{totalIncome}</div>
        <div data-testid="expenses-amount">Expense: ₹{totalExpense}</div>
      </div>

      <input
        type="text"
        data-testid="search-input"
        placeholder="Search..."
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {displayedTransactions.length ? displayedTransactions.map((t) =>
        <ul key={t.id} className='transactions li' >
          <li data-testid="transaction-item" className={t.type}>{t.title}: ₹{t.amount}</li>
          <button data-testid="delete-button" onClick={() => handleDelete(t.id)}>Remove</button>
        </ul>) : (<div className='no-transactions' data-testid="no-transactions">No transactions found</div>)
      }
    </div>
  );
};

export default ExpenseTracker;
