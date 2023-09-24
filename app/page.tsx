"use client";

import {
  createWeb3Modal,
  defaultWagmiConfig,
  useWeb3Modal,
  useWeb3ModalTheme,
} from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet, base, goerli } from "wagmi/chains";
import { AirstackProvider, init } from "@airstack/airstack-react";
import Form from "@/components/Form";
import Nav from "@/components/Nav";
import Profile from "@/components/Profile";

const airstack = process.env.NEXT_PUBLIC_AIRSTACK_API_KEY;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
} else if (!airstack) {
  throw new Error(
    "You need to provide NEXT_PUBLIC_AIRSTACK_API_KEY env variable"
  );
}

init(airstack);

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
    "--w3m-color-mix": "#9333ea",
    "--w3m-color-mix-strength": 20,
    "--w3m-accent": "black",
  },
});

export default function App() {
  const modal = useWeb3Modal();
  const theme = useWeb3ModalTheme();

  return (
    <AirstackProvider apiKey={airstack!}>
      <WagmiConfig config={wagmiConfig}>
        <Nav />
        <Form />
        <Profile />
      </WagmiConfig>
    </AirstackProvider>
  );
}
