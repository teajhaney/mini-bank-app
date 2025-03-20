/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useStateContext } from "../constext/useStateContext";
import { motion } from "framer-motion";
const RequestLoanCard = () => {
  const [loanValue, setLoanValue] = useState("");
  const [fromValue, setFromValue] = useState("");

  const { addTotransaction } = useStateContext();
  const [showConfirm, setShowConfirm] = useState(false);

  // Handle delete with custom confirmation

  const handleButtonClick = () => {
    if (loanValue && !isNaN(loanValue) && fromValue) {
      // Ensure inputs are valid
      setShowConfirm(true);
    } else {
      alert("Please enter a valid loan amount and lender name.");
    }
  };

  const confirmApprove = () => {
    addTotransaction({
      amount: loanValue,
      label: "Loan",
      to: "",
      from: fromValue,
    });
    setLoanValue("");
    setFromValue("");
    setShowConfirm(false);
  };

  const dismissApprove = () => {
    setShowConfirm(false);
  };

  return (
    <div className="h-fit w-full border   rounded flex flex-col items-start gap-2 p-2">
      <h1 className="text-2xl">Request a Loan</h1>
      <div className="flex justify-between w-full">
        <input
          value={loanValue}
          onChange={(e) => setLoanValue(e.target.value)}
          type="text"
          className="bg-white rounded border "
        />
        <div className="flex gap-2">
          {" "}
          <h1>from:</h1>
          <input
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            type="text"
            className="bg-white rounded border"
          />
        </div>
      </div>
      <button
        onClick={handleButtonClick}
        className=" px-3 py-2  bg-green rounded cursor-pointer">
        Loan
      </button>
      {showConfirm && (
        <div className="fixed inset-0  flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">
              A loan of{" "}
              <span className="font-bold">${Number(loanValue).toFixed(2)}</span>{" "}
              was requested, do you wanna approve the laon?{" "}
              <span className="font-bold">{fromValue}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={dismissApprove}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button
                onClick={confirmApprove}
                className="px-4 py-2 bg-green text-white rounded hover:bg-green-600">
                Approve
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RequestLoanCard;
