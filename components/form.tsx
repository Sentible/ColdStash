import { useLazyQuery } from "@airstack/airstack-react";
import { FormEvent, useCallback, useState } from "react";

// @todo
//  ens name & avatar

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
    <form onSubmit={handleSubmit} className="w-1/2 shadow-md rounded-lg p-8 my-8 bg-gradient-to-r from-cyan-100 to-blue-100">
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
        name="coldWallet"
        onChange={handleChange}
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 w-1/5" type='submit'>
        Submit
      </button>
    </form>
  );
}
