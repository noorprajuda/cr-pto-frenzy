import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from ".";
import eth from "../../images/eth.png";

const Input = ({ placeholder, name, type, value, handleChange, className }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className={`my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism ${className}`}
  />
);

const Home = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount } = formData;

    e.preventDefault();

    if (!addressTo || !amount) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white py-1">
            Connect your account <br /> and get USDT 20 in vouchers
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Your estimated balance <br /> 0.00 BTC $0.00 <br /> Today's PnL $0.00 (0.00%)
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-gold p-3 rounded-md cursor-pointer hover:bg-golden-yellow"
            >
              <p className="text-black text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">

          <div className="p-5 sm:w-96 w-full flex flex-col justify-start blue-glassmorphism bg-slate">
            <p className="ml-2 flex justify-start text-left text-white">Address</p>
            <Input placeholder="Enter recipient's address" name="addressTo" type="text" handleChange={handleChange} />
            <p className="ml-2 flex justify-start text-left text-white">Amount</p>
            <div className="relative flex flex-row items-center"> 
              <Input name="amount" type="number" handleChange={handleChange}
                    className="input-eth" 
                    placeholder="Enter ETH amount"  /> 
                <div className="absolute inset-y-0 left-0 pl-3  
                            flex items-center  
                            pointer-events-none"> 
                    <img src={eth} className="h-5 w-5"/>
                </div>
              <p className="text-white ml-4">ETH</p>
            </div>

            {isLoading
              ? <Loader />
              : !currentAccount
              ? 
                (<button
                  onClick={connectWallet}
                  type="button"
                  className="text-[#6b7280] w-full mt-2 border-[1px] p-2 border-[#6b7280] bg-slate rounded-md cursor-pointer"
                >
                  Please connect your wallet...
                </button>)
              :  (<button
                  type="button"
                  onClick={handleSubmit}
                  className="text-black w-full mt-2 border-[1px] p-2 border-[#6b7280] bg-gold hover:bg-golden-yellow rounded-md cursor-pointer"
                >
                  Send now
                </button>
                )
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
