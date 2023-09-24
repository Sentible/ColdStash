import { FusionSDK, NetworkEnum } from "@1inch/fusion-sdk";
import { useCallback, useEffect, useState } from "react";
import { useNetwork } from "wagmi";

type Use1inchParams = {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
};


const CHAIN_MAPPINGS = {
  1: NetworkEnum.ETHEREUM,
  42161: NetworkEnum.ARBITRUM,
  137: NetworkEnum.POLYGON,
  // 1101: NetworkEnum.POLYGON, zk version
  100: NetworkEnum.GNOSIS,
} as Record<number, NetworkEnum>;

export const use1inch = ({
  fromTokenAddress,
  toTokenAddress,
  amount,
}: Use1inchParams) => {
  const [sdk, setSdk] = useState<FusionSDK | null>(null);

  const { chain } = useNetwork();

  const getQuote = useCallback(async () => {
    if (fromTokenAddress && toTokenAddress && amount && sdk) {
      const _quote = await  sdk.getQuote({
        fromTokenAddress,
        toTokenAddress,
        amount,
      });
      return _quote;
    }
    return null;
  }, [fromTokenAddress, toTokenAddress, amount, sdk]);

  useEffect(() => {
    const _sdk = new FusionSDK({
      url: "https://api.1inch.dev/fusion",
      network: CHAIN_MAPPINGS[chain?.id || 100],
      authKey: process.env.NEXT_PUBLIC_1INCH_API_KEY,
    });
    setSdk(_sdk);
  }, [chain]);

  return { getQuote };
};