import { useMemo } from "react";
import { useAccount, useBalance } from "wagmi";

export const useEthBalance = () => {
  const { address } = useAccount() as { address: any };

  const { data: balance } = useBalance({
    address,
  })

  const balanceInEth = useMemo(() => (Number(balance?.value) / 10 ** 18).toFixed(8), [balance])

  return {
    balance: Number(balance?.value),
    balanceInEth,
  }
}