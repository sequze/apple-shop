import React from "react";

const CustomCheckbox = ({ checked, onChange }) => {
    return (
        <label className="relative flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={onChange}
            />
            <span
                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors duration-200
          ${checked ? "bg-black border-black" : "bg-white border-gray-400"}`}
            >
        {checked && (
            <svg
                className="w-3 h-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        )}
      </span>
        </label>
    );
};

export default CustomCheckbox;
