import { useLazyQuery } from "@airstack/airstack-react";
import { useCallback } from "react";
const isAddress = (address: string) => address.length === 42;

export const useAddressResolve = (address: string) => {
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
