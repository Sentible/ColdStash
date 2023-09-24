import { useColdStash } from "@/hooks/useColdStash";
import { useAccount } from "wagmi";
import Avatar from "./Avatar";
import Button from "./Button";
import ButtonGradient from "./ButtonGradient";
import Card from "./Card";
import WalletAddress from "./WalletAddress";

export default function Profile() {
  const { address } = useAccount();
  const { coldWalletAddress } = useColdStash();

  if ((!coldWalletAddress && address) || !address) {
    return null;
  }
  return (
    <Card>
      <h1 className="text-4xl mr-2 font-extrabold text-center">Hello!</h1>
      <Avatar />
      <WalletAddress />
      <div className="self-start mt-10">
        <h2>Current Balance:</h2>
        <h3 className="text-3xl font-extrabold">5.67 ETH</h3>
      </div>
      <div className="self-start mt-10 w-full">
        <h2 className="mb-2">You can swap for any token below:</h2>
        <div className="flex justify-evenly">
          <div className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3">
            <div className="flex items-center space-x-3">
              <h3 className="text-slate-900 text-xl font-extrabold">🚀 rETH</h3>
            </div>
            <p className="text-slate-500 text-sm">
              When you stake your ETH with Rocket Pool, you get rETH (a token
              that represents your stake).
            </p>
            <ButtonGradient text="Stake" />
          </div>
          <div className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3">
            <div className="flex items-center space-x-3">
              <h3 className="text-slate-900 text-xl font-extrabold">👻 GHO</h3>
            </div>
            <p className="text-slate-500 text-sm">
              GHO is the only decentralized, overcollateralized stablecoin
              native to the Aave Protocol
            </p>
            <ButtonGradient text="Swap" />
          </div>
        </div>
      </div>
    </Card>
  );
}
