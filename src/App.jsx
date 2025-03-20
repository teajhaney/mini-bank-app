/* eslint-disable no-unused-vars */
// import { useState } from "react";
import {
  WithdrawCard,
  TransferCard,
  RequestLoanCard,
  DepositCard,
  TransactionList,
} from "./components/componentExport.jsx";
import { useStateContext } from "./constext/useStateContext.jsx";
import { BiReset } from "react-icons/bi";
import { motion } from "motion/react";

function App() {
  const { accountBalance, transactionsCount, resetAccount } =
    useStateContext();
  // Animation variants for transaction items
  const transactionVariants = {
    hidden: { opacity: 0, y: -20 }, // Start above and invisible
    visible: { opacity: 1, y: 0 }, // Fade in and slide down
  };
  return (
    <>
      <section className="my-10 mx-3 2xl:mx-auto 2xl:w-[1350px] shadow-[0px_0px_5px_3px_rgba(0,0,0,0.1)] h-[1000px] rounded-lg p-5 ">
        <div className="w-full h-full flex flex-col lg:flex-row gap-2">
          {/* transaction history */}
          <div className="shadow-[0px_0px_5px_3px_rgba(0,0,0,0.1)] h-full w-full rounded flex flex-col gap-5 p-2">
            {" "}
            <div className="flex justify-between">
              <h1>Transaction History {transactionsCount}</h1>
              <BiReset
                className="h-10 w-10 cursor-pointer"
                onClick={resetAccount}
              />
            </div>
            <TransactionList />
          </div>
          {/* bank transactions */}
          <div className=" shadow-[0px_0px_5px_3px_rgba(0,0,0,0.1)] rounded h-full w-full p-2 flex flex-col gap-2">
            {/* accout balance */}
            <div className="h-20 w-full border border-black rounded flex justify-between p-2">
              <h1>Accont balance:</h1>
              <h1 className="text-5xl font-semibold">${Number(accountBalance).toFixed(2)}</h1>
            </div>
            {/* perform transactions */}
            <div className="flex flex-col lg:flex-row gap-2 ">
              <WithdrawCard />
              <DepositCard />
            </div>
            <TransferCard />
            <RequestLoanCard />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
