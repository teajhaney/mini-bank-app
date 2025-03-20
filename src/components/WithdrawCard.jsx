import { useState } from "react";
import { useStateContext } from "../constext/useStateContext";

const WithdrawCard = () => {
  const [withdrawValue, setWithdrawValue] = useState("");
  const { addTotransaction, accountBalance } = useStateContext();

  const handleButtonClick = () => {
    if (
      withdrawValue &&
      !isNaN(withdrawValue) &&
      accountBalance >= withdrawValue
    ) {
      addTotransaction({
        amount: withdrawValue,
        label: "Withdraw",
        to: "",
        from: "",
      });
      setWithdrawValue("");
    } else {
      alert("Please enter a valid withdraw amount.");
    }
  };

  return (
    <div className="h-fit w-full border   rounded flex flex-col items-start gap-2 p-2">
      <h1 className="text-2xl">Withdraw</h1>
      <input
        type="text"
        value={withdrawValue}
        onChange={(e) => setWithdrawValue(e.target.value)}
        className="bg-white rounded border"
      />
      <button
        className=" px-3 py-2  bg-red rounded cursor-pointer"
        onClick={handleButtonClick}>
        {" "}
        Withdraw
      </button>
    </div>
  );
};

export default WithdrawCard;
