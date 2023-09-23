"use client";

import {
  createWeb3Modal,
  defaultWagmiConfig,
  useWeb3Modal,
  useWeb3ModalTheme,
} from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet, base, goerli } from "wagmi/chains";

// @ts-expect-error 1. Get projectId
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Create wagmiConfig
const chains = [mainnet, arbitrum, base, goerli];
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
      <w3m-button />
    </WagmiConfig>
  );
}
