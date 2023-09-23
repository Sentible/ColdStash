import { useState } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import Input from "./Input";
import WalletAddress from "./WalletAddress";

export default function Form() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-2/5 flex flex-col place-items-center shadow-md rounded-3xl py-11 px-7 my-8 bg-gradient-to-r from-lime-200 via-yellow-200 to-purple-200">
      <h1 className="text-4xl mr-2 font-extrabold">Enter Cold wallet</h1>
      <Avatar />
      <WalletAddress />
      <Input
        placeholder="Enter ENS, lens, or wallet address"
        handleChange={handleChange}
      />

      <Button text="Submit" />
    </div>
  );
}
