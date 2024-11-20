// components/CSVInput.js
import React from "react";

const CSVInput = ({ csvText, handleCsvTextChange, showCsvFormat, getLineNumbers, handleFileUpload }) => {
  return (
    <div className="w-full mt-6 relative">
      <div className="flex items-center justify-between">
        <label className="block text-sm mb-2">List of Addresses in CSV</label>
        <button
          onClick={showCsvFormat}
          className="bg-[#0F123D] text-sky-400 font-bold text-white px-3 py-1 rounded text-sm"
        >
          Show CSV Format
        </button>
      </div>
      <div className="flex border border-gray-500 rounded h-32 overflow-hidden">
        <pre className="bg-[#0F123D] text-gray-500 px-3 py-2 text-right" style={{ minWidth: "2.5rem" }}>
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
          className="bg-[#0F123D] text-sky-400 text-xs font-bold px-4 py-2 rounded cursor-pointer border border-gray-500 border-t-0"
        >
          Upload CSV
        </label>
      </div>
    </div>
  );
};

export default CSVInput;
