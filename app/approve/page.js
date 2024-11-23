"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(2); 
  const [ethBalance, setEthBalance] = useState("0 ETH");
  const [userAddress, setUserAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState(0); 
  const [errorMessage, setErrorMessage] = useState(""); 

  
  const recipients = [
    { address: "0x11A0F1455511d5Fe50ED673A05aD677ce009Fce6", amount: 0.004 },
    { address: "0x27AAC726fE5124FC567Fb78F80a44BFa33D8e2C", amount: 0.04 },
  ];

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const fetchData = async () => {
        try {
          
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setUserAddress(accounts[0]);

          
          const balance = await provider.getBalance(accounts[0]);
          setEthBalance(ethers.formatEther(balance) + " ETH");

          
          const total = recipients.reduce((sum, recipient) => sum + recipient.amount, 0);
          setTotalAmount(total);

  
          const balanceInETH = parseFloat(ethers.formatEther(balance));
          if (total > balanceInETH) {
            setErrorMessage(
              `Insufficient ETH balance on your account ${accounts[0].slice(0, 6)}..${accounts[0].slice(-4)}. Please have at least ${total} ETH.`
            );
          } else {
            setErrorMessage(""); 
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1e293b] text-white">
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Steps Header */}
        <div className="flex flex-wrap justify-center items-center mb-8">
          <div className="flex items-center space-x-4">
            {/* Prepare Step */}
            <Step stepNumber={1} label="Prepare" isActive={currentStep >= 1} />
            <div className="h-6 border-l border-gray-500"></div>
            {/* Approve Step */}
            <Step stepNumber={2} label="Approve" isActive={currentStep === 2} />
            <div className="h-6 border-l border-gray-500"></div>
            {/* Multisend Step */}
            <Step stepNumber={3} label="Multisend" isActive={currentStep === 3} />
          </div>
        </div>

        {/* Token Information */}
        <div className="bg-slate-800 p-6 border border-blue-900 rounded-xl mb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl">
            <div className="text-center border border-blue-700 px-2 py-4 rounded-lg text-blue-500 text-xs">
              <p className="text-xl font-semibold">{totalAmount} ETH</p>
              <p>Total number of tokens to send</p>
            </div>
            <div className="text-center text-blue-400 border border-blue-700 rounded-xl px-2 py-4 text-xs">
              <p className="text-xl font-semibold">{ethBalance}</p>
              <p>Your ETH balance</p>
            </div>
          </div>

  
          <div className="bg-slate-800 mt-2 p-6 rounded-lg text-xs text-blue-400">
            <h3 className="text-lg font-semibold mb-4">List of recipients</h3>
            {recipients.map((recipient, index) => (
              <RecipientRow
                key={index}
                address={recipient.address}
                amount={recipient.amount + " ETH"}
              />
            ))}
            <button
              onClick={() => setCurrentStep(3)} 
              className="w-full bg-blue-900 hover:bg-blue-800 mt-2 py-3 text-sm text-blue-400 rounded-lg font-semibold"
            >
              Proceed
            </button>
          </div>
        
          {errorMessage && (
            <div className="mt-4 py-1 space-y-4">
              <ErrorMessage message={errorMessage} />
            </div>
          )}
        </div>

        
        <div className="mt-8 text-center">
          <button
            onClick={() => window.open("https://t.me/YourTelegramGroup", "_blank")}
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Support System
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({ stepNumber, label, isActive }) {
  return (
    <div className={`flex items-center space-x-2 ${isActive ? "text-blue-700" : "text-gray-400"}`}>
      <div className={`w-6 h-6 flex items-center justify-center rounded-full ${isActive ? "bg-blue-900" : "bg-gray-600"}`}>
        
        {isActive ? (stepNumber === 3 ? `✓` : stepNumber) : stepNumber}
      </div>
      <span>{label}</span>
    </div>
  );
}

function RecipientRow({ address, amount }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-700">
      <span className="text-sm truncate">{address}</span>
      <span className="text-sm font-medium">{amount}</span>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="bg-red-600 text-white p-4 rounded-lg">
      <p>{message}</p>
    </div>
  );
}
