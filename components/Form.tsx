import { FormEvent, useCallback, useState } from "react";
import { useAccount } from "wagmi";
import Button from "./Button";
import Input from "./Input";
import { useAddressResolve } from "@/hooks/useAddressResolve";
import { useColdStash } from "@/hooks/useColdStash";

export default function Form() {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    coldWallet: "",
  });

  const { addColdWallet, coldWalletAddress, isLoading } = useColdStash();
  const { getData } = useAddressResolve(formData.coldWallet);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const addressToSave = await getData();
    if (addressToSave && !coldWalletAddress) {
      await addColdWallet({
        args: [addressToSave],
      }).then((x) => {
        console.log(x);
      }).catch((e) => {
        console.log(e);
      })
    }
  }, [getData, addColdWallet, coldWalletAddress]);

  if (address && coldWalletAddress) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="w-2/5 flex flex-col place-items-center shadow-md rounded-3xl py-11 px-7 my-8 bg-gradient-to-r from-lime-200 via-yellow-200 to-purple-200">
      <h1 className="text-4xl mr-2 font-extrabold">Enter Cold wallet</h1>
      <Input
        placeholder="Enter ENS, lens, or wallet address"
        handleChange={handleChange}
      />

      <Button disabled={isLoading} text="Submit" />
    </form>
  );
}
