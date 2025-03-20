/* eslint-disable no-unused-vars */
import { useState } from "react";

import { useStateContext } from "../constext/useStateContext.jsx";
import { motion } from "motion/react";
import { PiTrashThin } from "react-icons/pi";
///
const TransactionList = () => {
  const { transactions, deleteTransaction } = useStateContext();
  const [showConfirm, setShowConfirm] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  // Animation variants for transaction items
  const transactionVariants = {
    hidden: { opacity: 0, y: -20 }, // Start above and invisible
    visible: { opacity: 1, y: 0 }, // Fade in and slide down
  };

  // Handle delete with custom confirmation
  const handleDelete = (transaction) => {
    setTransactionToDelete(transaction);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete);
      setShowConfirm(false);
      setTransactionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setTransactionToDelete(null);
  };
  return (
    <div className="w-full h-62 lg:h-[900px]   rounded overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      {transactions.length > 0 ? (
        transactions
          .map((transaction) => (
            <motion.div
              variants={transactionVariants}
              initial="hidden"
              animate="visible"
              layout
              transition={{ duration: 0.5 }}
              key={transaction.id}
              className="mb-2 p-2 bg-gray-100  flex flex-col gap-2 rounded h-fit">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <p
                    className={`${
                      transaction.label === "Withdraw" ||
                      transaction.label === "Transfer"
                        ? "bg-red"
                        : "bg-green"
                    } w-fit px-1 rounded`}>
                    {transaction.label}
                  </p>
                  <PiTrashThin
                    onClick={() => handleDelete(transaction)}
                    className="text-red"
                  />
                </div>
                <div className="flex justify-between w-full">
                  <div>
                    {!transaction.to && !transaction.from && <p>You</p>}
                    {transaction.to && <p>To: {transaction.to}</p>}
                    {transaction.from && <p>From: {transaction.from}</p>}
                  </div>
                  <p className="text-2xl font-bold  max-w-50 break-all">
                    ${Number(transaction.amount).toFixed(2)}
                  </p>
                </div>

                <p className="text-xs">{transaction.date}</p>
              </div>
            </motion.div>
          ))
          .reverse()
      ) : (
        <p>No transactions yet</p>
      )}
      {showConfirm && (
        <div className="fixed inset-0  flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">
              Are you sure you want to delete this{" "}
              <span className="font-bold">{transactionToDelete?.label}</span>{" "}
              transaction of ${Number(transactionToDelete?.amount).toFixed(2)}?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
