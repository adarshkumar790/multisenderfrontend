// components/ProgressSteps.js
import React from "react";

const ProgressSteps = ({ status }) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      {/* 1st Step: Prepare */}
      <div className={`flex items-center gap-2 ${status >= 1 ? 'bg-green-500' : 'bg-gray-500'} text-white rounded-full w-8 h-8 justify-center`}>
        <span>1</span>
      </div>
      <div className="text-xs text-blue-700">Prepare</div>

      {/* Vertical Line */}
      <div className="h-6 border-l border-gray-500"></div>

      {/* 2nd Step: Approve */}
      <div className={`flex items-center gap-2 ${status >= 2 ? 'bg-green-500' : 'bg-gray-500'} text-white rounded-full w-8 h-8 justify-center`}>
        <span>2</span>
      </div>
      <div className="text-xs text-blue-700">Approve</div>

      {/* Vertical Line */}
      <div className="h-6 border-l border-gray-500"></div>

      {/* 3rd Step: Multisend */}
      <div className={`flex items-center gap-2 ${status >= 3 ? 'bg-green-500' : 'bg-gray-500'} text-white rounded-full w-8 h-8 justify-center`}>
        <span>3</span>
      </div>
      <div className="text-xs text-blue-700">Multisend</div>
    </div>
  );
};

export default ProgressSteps;
