import { getShortenName } from "@/utils";

type WalletAddressProps = {
  address?: string;
};

export default function WalletAddress({ address }: WalletAddressProps) {
  const fallbackAddress = "0x0101...0101";
  return (
    <h2 className="text-slate-600 text-lg">
      {fallbackAddress || getShortenName(address)}
    </h2>
  );
}
