"use client";
import { useState } from "react";
import { FaCrown, FaEthereum, FaCoins, FaFileCsv } from "react-icons/fa"; // Import additional icons
import Image from "next/image"; // For MetaMask logo
import Web3 from "web3";

export default function Home() {
  const [csvFile, setCsvFile] = useState(null);
  const [csvText, setCsvText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(1); // 1: Prepare, 2: Approve, 3: Multisend
  const [walletAddress, setWalletAddress] = useState("");
  const [ethBalance, setEthBalance] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setCsvText(reader.result); // Read the CSV content and set it in the state
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleCsvTextChange = (event) => {
    setCsvText(event.target.value);
  };

  const getLineNumbers = () => {
    const lines = csvText.split("\n");
    return lines.map((_, index) => index + 1).join("\n");
  };

  const showCsvFormat = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleContinue = () => {
    alert("Continuing to the next step!");
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const balance = await web3.eth.getBalance(accounts[0]);
        setWalletAddress(accounts[0]);
        setEthBalance(web3.utils.fromWei(balance, "ether"));
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
  };

  const csvExample = [
    "0xd88d0f22f9bc682afa550da99062b3865088386d, 0.000056",
    "pavlik.eth, 12",
    "0x64c9525A3c3a65Ea88b06f184F074C2499578A7E, 1",
    "0xC8c30Fa803833dD1Fd6DBCDd91Ed0b301EFf87cF, 13.45",
    "0x7D52422D3A5fE9bC92D3aE8167097eE09F1b347d, 1.049",
  ];

  return (
    <div className="min-h-screen bg-[#083344] text-white flex flex-col items-center">
      {/* Header Section */}
      <header className="w-full flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold">Ledgerline Multisender</div>
      </header>

      {/* Responsive Buttons Section */}
      <div className="w-full flex flex-wrap justify-center gap-3 mt-4 md:mt-6">
        <div className="flex gap-3 items-center">
          <button className="text-green-500 bg-[#0F123D]  border border-green-500 text-xs hover:bg-green-900 px-4 font-bold py-2 rounded-xl flex items-center gap-0.5">
            <FaCrown /> VIP
          </button>
          <button className="bg-[#0F123D] border border-blue-500 text-blue-500 text-xs hover:bg-sky-900 font-bold px-3 py-2 rounded-xl flex items-center gap-0.5">
            <FaEthereum /> Eth
          </button>
          {walletAddress ? (
            <div className="bg-[#0F123D] text-white text-xs border border-blue-500 px-3 py-2 hover:bg-sky-900 rounded-xl flex items-center">
              <div className="font-bold text-blue-400">
                {walletAddress.slice(0, 8)}
              </div>
              <div className="ml-2 font-bold text-blue-400">
                {ethBalance.slice(0, 3)} ETH
              </div>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-[#0F123D] text-blue-500 text-xs border border-blue-500 px-3 hover:bg-sky-900 font-bold py-2 rounded-xl flex items-center gap-0.5"
            >
              <Image
                src="/metamask.png"
                alt="MetaMask"
                width={20}
                height={20}
              />
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      <main className="flex flex-col items-center mt-10 w-full max-w-2xl bg-[#0F123D] rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <div
            className={`flex items-center gap-2 ${
              status >= 1 ? "bg-green-500" : "bg-gray-500"
            } text-white rounded-full w-8 h-8 justify-center`}
          >
            <span>1</span>
          </div>
          <div className="text-xs font-bold text-blue-700">Prepare</div>
          <div className="h-6 border-l border-gray-500"></div>
          <div
            className={`flex items-center gap-2 ${
              status >= 2 ? "bg-green-500" : "bg-gray-500"
            } text-white rounded-full w-8 h-8 justify-center`}
          >
            <span>2</span>
          </div>
          <div className="text-xs font-bold text-blue-700">Approve</div>
          <div className="h-6 border-l border-gray-500"></div>
          <div
            className={`flex items-center gap-2 ${
              status >= 3 ? "bg-green-500" : "bg-gray-500"
            } text-white rounded-full w-8 h-8 justify-center`}
          >
            <span>3</span>
          </div>
          <div className="text-xs font-bold text-blue-700">Multisend</div>
        </div>

        {/* Main content */}
        <div className="w-full border border-gray-500 rounded-lg p-4">
          {/* Token Address Section */}
          <div className="w-full mb-6">
            <label className="block text-xs font-bold mb-2">Token Address</label>
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-lg">
                  <FaCoins />
                </span>
                <input
                  type="text"
                  placeholder="Select your Token"
                  className="w-full bg-[#0F123D] text-white px-10 py-2 rounded border border-gray-500"
                />
              </div>
              <div>
                <input type="checkbox" id="deflationary" className="mr-2" />
                <label htmlFor="deflationary">Deflationary</label>
              </div>
            </div>
          </div>

          {/* CSV Input Section */}
          <div className="w-full mt-6 relative">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold mb-2">
                List of Addresses in CSV
              </label>
              <button
                onClick={showCsvFormat}
                className="bg-[#0F123D] text-sky-400 font-bold px-3 py-1 rounded text-xs"
              >
                Show CSV Format
              </button>
            </div>
            <div className="flex border border-gray-500 rounded h-32 overflow-hidden">
              <pre
                className="bg-[#0F123D] text-gray-500 px-3 py-2 text-right"
                style={{ minWidth: "2.5rem" }}
              >
                {getLineNumbers()}
              </pre>
              <textarea
                placeholder="Insert your CSV here or use the button below..."
                className="w-full bg-[#0F123D] text-white px-4 py-2 rounded-none resize-none h-32"
                value={csvText}
                onChange={handleCsvTextChange}
              />
            </div>
            <div className="absolute right-2 bottom-[-1rem]">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="uploadCSV"
              />
              <label
                htmlFor="uploadCSV"
                className="flex items-center bg-[#0F123D] text-sky-400 text-xs font-bold px-4 py-2 rounded cursor-pointer border border-gray-500 border-t-0"
              >
                <FaFileCsv className="mr-2" /> Upload CSV
              </label>
            </div>
          </div>

          {/* Connect Wallet Button Below CSV */}
          <div className="mt-8">
            {walletAddress ? (
              <button
                onClick={handleContinue}
                className="bg-green-500 hover:bg-green-600 text-white w-full font-bold py-2 rounded-xl flex items-center justify-center gap-2"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-sky-500 hover:bg-sky-600 text-white w-full font-bold py-2 rounded-xl flex items-center justify-center gap-2"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-[#0F123D] text-white rounded-lg p-6 max-w-4xl w-full border-4 border-gray-500">
            <h3 className="text-lg font-bold mb-4">CSV Format Example</h3>
            <div className="space-y-2">
              {csvExample.map((line, index) => (
                <div key={index} className="flex border-b border-gray-500 py-2">
                  <span className="w-12 text-right text-gray-300">
                    {index + 1}.
                  </span>
                  <span className="text-gray-500">{line}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="text-red-500 font-bold"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
