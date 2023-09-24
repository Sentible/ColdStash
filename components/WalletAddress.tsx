import { getShortenName } from "@/utils";

type WalletAddressProps = {
  address?: string;
};

export default function WalletAddress({ address }: WalletAddressProps) {
  return (
    <h2 className="text-slate-600 text-lg">
      {getShortenName(address)}
    </h2>
  );
}
