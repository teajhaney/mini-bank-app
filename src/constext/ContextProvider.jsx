import { useState, useEffect } from "react";
import { StateContext } from "./useStateContext";

export const ContextProvider = ({ children }) => {
  const balance=100000
  //load cart from local storage if available or set empty cart
  const [transactions, setTransactions] = useState(() => {
    const storedTransaction = localStorage.getItem("transactions");
    return storedTransaction ? JSON.parse(storedTransaction) : [];
  });
  const [accountBalance, setAccountBalance] = useState(() => {
    const storedAccountBalance = localStorage.getItem("accountBalance");
    return storedAccountBalance ? Number(storedAccountBalance) : balance;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("accountBalance", accountBalance.toString());
  }, [transactions, accountBalance]);

  //   transaction count
  const transactionsCount = transactions.length;

  const addTotransaction = ({ amount, label, to, from }) => {
    const newTransaction = {
      id: new Date().getTime().toString(),
      amount,
      label,
      to,
      from,
      date: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Use false for 24-hour format
      }),
    };

    //add a delay
    setTimeout(() => {
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
      // Update account balance based on transaction type
      switch (label) {
        case "Withdraw":
          setAccountBalance((prev) => prev - Number(amount));
          break;
        case "Deposit":
          setAccountBalance((prev) => prev + Number(amount));
          break;
        case "Transfer":
          setAccountBalance((prev) => prev - Number(amount));
          break;
        case "Loan":
          setAccountBalance((prev) => prev + Number(amount));
          break;
        default:
          break;
      }
    }, 2000);
  };

  // reset localStorge
  const resetAccount = () => {
    localStorage.clear();
    setTransactions([]);
    setAccountBalance(balance);
  };

  const deleteTransaction = (transaction) => {
    setTransactions((prevTransaction) =>
      prevTransaction.filter((item) => item.id !== transaction.id)
    );
  };

  return (
    <StateContext.Provider
      value={{
        addTotransaction,
        transactions,
        setTransactions,
        transactionsCount,
        accountBalance,
        setAccountBalance,
        resetAccount,
        deleteTransaction,
      }}>
      {children}
    </StateContext.Provider>
  );
};
