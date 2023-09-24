import coldstashabi from "@/abi/coldstashabi";
import { COLD_STASH_CONTRACTS } from "@/utils";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

const isNull = (value: any) => value ==='0x0000000000000000000000000000000000000000';

export const useColdStash = (newColdStash?: string) => {
  const { address } = useAccount();
  const { data, refetch } = useContractRead({
    abi: coldstashabi,
    address: COLD_STASH_CONTRACTS.goerli,
    functionName: 'getColdWallet',
    args: [address],
  });
  const {  isLoading, isSuccess, writeAsync } = useContractWrite({
    address: COLD_STASH_CONTRACTS.goerli,
    abi: coldstashabi,
    functionName: 'addColdWallet',
    onSettled: () => {
      refetch();
    }
  })

  const coldWalletAddress = data && !isNull(data) ? data : null;
  return {
    addColdWallet: writeAsync,
    coldWalletAddress,
    isNull: isNull(coldWalletAddress),
    isLoading,
    isSuccess,
  }

}
