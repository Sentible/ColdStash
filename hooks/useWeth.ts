import coldstashabi from "@/abi/coldstashabi";
import weth from "@/abi/weth";
import { COLD_STASH_CONTRACTS } from "@/utils";
import { SWAP_MAP } from "@/utils/config";
import { useRef, useEffect } from "react";
import { useAccount, useContractRead, useContractWrite, useNetwork } from "wagmi";

const isNull = (value: any) => value ==='0x0000000000000000000000000000000000000000';

// use interval with disable option
const useInterval = (callback: () => void, delay: number | null, disabled?: any) => {
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

export const useWeth = ({ callback }: { callback?: () => void }) => {
  const { chain } = useNetwork();
  const { data: writeData,  isLoading, isSuccess, writeAsync } = useContractWrite({
    abi: weth,
    address: chain?.id === 5 ? SWAP_MAP.goerli.WETH : '' as any,
    functionName: 'deposit',
    onSettled: () => {
      callback && callback();
    }
  })


  return {
    isLoading,
    isSuccess,
    writeData,
    writeAsync,
  }

}
