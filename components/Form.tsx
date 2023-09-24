import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import Button from "./Button";
import Input from "./Input";
import { useAddressResolve } from "@/hooks/useAddressResolve";
import { useColdStash } from "@/hooks/useColdStash";
import Avatar from "./Avatar";
import WalletAddress from "./WalletAddress";


const isENS = (address: string) => address.includes(".eth")
const isLens = (address: string) => address.includes(".lens")
const isAddress = (address: string) => address.length === 42

export default function Form() {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    coldWallet: "",
  });
  const [addressToSave, setAddressToSave] = useState<string | null>(null);

  const { addColdWallet, coldWalletAddress, isLoading } = useColdStash();
  const { getData } = useAddressResolve(formData.coldWallet);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useMemo(async () => {
    if (isENS(formData.coldWallet) || isLens(formData.coldWallet)) {
      setAddressToSave(await getData());
    } else if (isAddress(formData.coldWallet)) {
      setAddressToSave(formData.coldWallet);
    }
  }, [formData.coldWallet, getData]);

  const handleSubmit = useCallback(async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (addressToSave && !coldWalletAddress) {
      await addColdWallet({
        args: [addressToSave],
      }).then((x) => {
        console.log(x);
      }).catch((e) => {
        console.log(e);
      })
    }
  }, [addressToSave, coldWalletAddress, addColdWallet]);

  if (address && coldWalletAddress) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="w-2/5 flex flex-col place-items-center shadow-md rounded-3xl py-11 px-7 my-8 bg-gradient-to-r from-lime-200 via-yellow-200 to-purple-200">
      <h1 className="text-4xl mr-2 font-extrabold">Enter Cold wallet</h1>
      {addressToSave && (
        <>
          <Avatar address={addressToSave} url={isENS(formData.coldWallet) ? `https://metadata.ens.domains/mainnet/avatar/${formData.coldWallet}`: undefined} />
          <WalletAddress address={addressToSave} />
        </>
      )}

      <Input
        placeholder="Enter ENS, lens, or wallet address"
        handleChange={handleChange}
      />

      <Button disabled={isLoading} text="Save" />
    </form>
  );
}
