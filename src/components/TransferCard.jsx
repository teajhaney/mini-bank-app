/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useStateContext } from "../constext/useStateContext";
import { motion } from "framer-motion";

const TransferCard = () => {
  const [transferValue, setTransferValue] = useState("");
  const [toValue, setToValue] = useState("");
  const { addTotransaction } = useStateContext();
   const [showConfirm, setShowConfirm] = useState(false);

    const handleButtonClick = () => {
      if (transferValue && !isNaN(transferValue) && toValue) {
        // Ensure inputs are valid
        setShowConfirm(true);
      } else {
        alert("Please enter a valid tranfer amount and recepient name.");
      }
    };
    const confirmApprove = () => {
      addTotransaction({
        amount: transferValue,
        label: "Transfer",
        to: toValue,
        from: 'fromValue',
      });
      setTransferValue("");
      setToValue("");
      setShowConfirm(false);
    };

    const dismissApprove = () => {
      setShowConfirm(false);
    };
  return (
    <div className="h-fit w-full border   rounded flex flex-col items-start gap-2 p-2">
      <h1 className="text-2xl">Transfer</h1>
      <div className="flex flex-col lg:flex-row gap-2 justify-between w-full">
        <input
          value={transferValue}
          onChange={(e) => setTransferValue(e.target.value)}
          type="text"
          className="bg-white rounded border"
        />
        <div className="flex  flex-col lg:flex-row gap-2">
          {" "}
          <h1>to:</h1>
          <input
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
            type="text"
            className="bg-white rounded border "
          />
        </div>
      </div>
      <button
        onClick={handleButtonClick}
        className=" px-3 py-2  bg-red rounded cursor-pointer">
        Transfer
      </button>
      {showConfirm && (
        <div className="fixed inset-0  flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">
              Do you want to transfer{" "}
              <span className="font-bold">
                ${Number(transferValue).toFixed(2)}
              </span>{" "}
              to <span className="font-bold">{toValue}</span>?
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

export default TransferCard;
