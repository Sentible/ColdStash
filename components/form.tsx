import { useState } from "react";

// @todo
//  ens name & avatar

export default function Form() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-1/2 shadow-md rounded-lg p-8 my-8 bg-gradient-to-r from-cyan-100 to-blue-100">
      <div className="flex flex-row items-center">
        <h1 className="text-3xl mr-2">Enter Cold wallet</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
          />
        </svg>
      </div>

      <input
        className="border-2 rounded-md p-2 my-8 w-full"
        placeholder="Enter ENS, lens, or wallet address"
        name="cold-wallet"
        onChange={handleChange}
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 w-1/5">
        Submit
      </button>
    </div>
  );
}
