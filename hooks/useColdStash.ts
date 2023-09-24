import coldstashabi from "@/abi/coldstashabi";
import { COLD_STASH_CONTRACTS } from "@/utils";
import { useRef, useEffect } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

const isNull = (value: any) => value ==='0x0000000000000000000000000000000000000000';

// use interval with disable option
export const useInterval = (callback: () => void, delay: number | null, disabled?: any) => {
  const savedCallback = useRef<() => void | null>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!disabled) {
      const tick = () => {
        if (savedCallback.current) {
          savedCallback.current();
        }
      };
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }
  }, [delay, disabled]);
  
}

export const useColdStash = (newColdStash?: string) => {
  const { address } = useAccount();
  const { data, refetch } = useContractRead({
    abi: coldstashabi,
    address: COLD_STASH_CONTRACTS.arbi,
    functionName: 'getColdWallet',
    args: [address],
  });
  const { data: writeData,  isLoading, isSuccess, writeAsync } = useContractWrite({
    address: COLD_STASH_CONTRACTS.arbi,
    abi: coldstashabi,
    functionName: 'addColdWallet',
    onSettled: () => {
      refetch();
    }
  })

  const coldWalletAddress = (data && !isNull(data) ? data : null) as string | null;

  useInterval(() => {
    refetch();
  }, 1500, coldWalletAddress);

  return {
    addColdWallet: writeAsync,
    coldWalletAddress,
    isNull: isNull(coldWalletAddress),
    isLoading,
    isSuccess,
    writeData,
  }

}
