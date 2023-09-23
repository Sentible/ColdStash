"use client";

import Form from "@/components/Form";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  useWeb3Modal,
  useWeb3ModalTheme,
} from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";

// @ts-expect-error 1. Get projectId
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Create wagmiConfig
const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "Web3Modal",
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "light",
  themeVariables: {
    "--w3m-color-mix": "#00DCFF",
    "--w3m-color-mix-strength": 20,
  },
});

export default function App() {
  // 4. Use modal hook
  const modal = useWeb3Modal();
  // const state = useWeb3ModalState();
  const theme = useWeb3ModalTheme();

  return (
    <WagmiConfig config={wagmiConfig}>
      <div className="flex flex-col place-items-center p-10">
        <w3m-button />
        <Form />
      </div>
    </WagmiConfig>
  );
}
