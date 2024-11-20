// components/CSVModal.js
import React from "react";

const CSVModal = ({ showModal, closeModal, csvExample }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-[#0F123D] text-white rounded-lg p-6 max-w-4xl w-full border-4 border-gray-500">
        <h3 className="text-lg font-bold mb-4">CSV Format Example</h3>
        <div className="space-y-2">
          {csvExample.map((line, index) => (
            <div key={index} className="flex border-b border-gray-500 py-2">
              <span className="w-12 text-right text-gray-300">{index + 1}.</span>
              <span className="ml-4 text-white">{line}</span>
            </div>
          ))}
        </div>
        <button
          onClick={closeModal}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CSVModal;
