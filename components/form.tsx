import { useLazyQuery } from "@airstack/airstack-react";
import { FormEvent, useCallback, useState } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import Input from "./Input";
import WalletAddress from "./WalletAddress";

const isAddress = (address: string) => address.length === 42;

const useAddressResolve = (address: string) => {
  const [resolveAddress] = useLazyQuery(`
    query MyQuery {
      Wallet(
        input: {identity: "${address}", blockchain: ethereum}
      ) {
        addresses
      }
    }
    `
  );

  const getData = useCallback(async () => {
    if(isAddress(address)) {
      return address;
    } else {
      const { data } = await resolveAddress();
      return data?.Wallet?.addresses?.[0] as string;
    }
  }, [address, resolveAddress]);

  return { getData };
}

export default function Form() {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    coldWallet: "",
  });

  const { getData } = useAddressResolve(formData.coldWallet);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(async (e?: FormEvent<HTMLFormElement>) => {
    setIsSaving(true);
    e?.preventDefault();
    const address = await getData();
    console.log(address);
  }, [getData]);

  return (
    <form onSubmit={handleSubmit} className="w-2/5 flex flex-col place-items-center shadow-md rounded-3xl py-11 px-7 my-8 bg-gradient-to-r from-lime-200 via-yellow-200 to-purple-200">
      <h1 className="text-4xl mr-2 font-extrabold">Enter Cold wallet</h1>
      <Input
        placeholder="Enter ENS, lens, or wallet address"
        handleChange={handleChange}
      />

      <Button text="Submit" />
    </form>
  );
}
