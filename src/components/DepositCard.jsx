import React, { useState } from "react";
import { useStateContext } from "../constext/useStateContext";

const DepositCard = () => {
  const [depositValue, setDepositValue] = useState("");
  const { addTotransaction } = useStateContext();

  const handleButtonClick = () => {
    if (depositValue && !isNaN(depositValue)) {
      addTotransaction({
        amount: depositValue,
        label: "Deposit",
        to: "",
        from: "",
      });
      setDepositValue("");
    } else {
      alert("Please enter a valid amount to be deposited");
    }
  };
  return (
    <div className="h-fit w-full border  rounded flex flex-col items-start gap-2 p-2">
      <h1 className="text-2xl">Deposit</h1>
      <input
        type="text"
        value={depositValue}
        onChange={(e) => setDepositValue(e.target.value)}
        className="bg-white rounded border "
      />
      <button
        onClick={handleButtonClick}
        className=" px-3 py-2  bg-green rounded cursor-pointer">
        Deposit
      </button>
    </div>
  );
};

export default DepositCard;
