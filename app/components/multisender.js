// pages/index.js
import { useState } from "react";

export default function Home() {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileUpload = (event) => {
    setCsvFile(event.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-[#0F123D] text-white flex flex-col items-center">
      <header className="w-full flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold">Multisender Classic</div>
        <div className="flex items-center gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded">VIP</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded">
            Ethereum Mainnet
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Connect Wallet
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center mt-10 w-full max-w-3xl bg-[#1C1F4A] rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-blue-500">1</div>
          <div>Prepare</div>
          <div className="text-gray-500">2</div>
          <div>Approve</div>
          <div className="text-gray-500">3</div>
          <div>Multisend</div>
        </div>

        <div className="w-full">
          <label className="block text-sm mb-2">Token Address</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Select your Token"
              className="w-full bg-[#0F123D] text-white px-4 py-2 rounded border border-gray-500"
            />
            <div>
              <input type="checkbox" id="deflationary" className="mr-2" />
              <label htmlFor="deflationary">Deflationary</label>
            </div>
          </div>
        </div>

        <div className="w-full mt-6">
          <label className="block text-sm mb-2">List of Addresses in CSV</label>
          <textarea
            placeholder="Insert your CSV here or use the button below..."
            className="w-full bg-[#0F123D] text-white px-4 py-2 rounded border border-gray-500 h-32"
          />
          <div className="mt-4">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="uploadCSV"
            />
            <label
              htmlFor="uploadCSV"
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Upload CSV
            </label>
          </div>
        </div>

        <button className="bg-blue-600 text-white w-full py-2 rounded mt-6">
          Connect Wallet
        </button>
      </main>
    </div>
  );
}
