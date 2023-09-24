"use client";

import {
  createWeb3Modal,
  defaultWagmiConfig,
  useWeb3Modal,
  useWeb3ModalTheme,
} from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet, base, goerli, gnosis } from "wagmi/chains";
import { AirstackProvider, init } from "@airstack/airstack-react";
import Form from "@/components/Form";
import Nav from "@/components/Nav";
import Profile from "@/components/Profile";
import NounFlowerMarquee from "@/components/NounFlowerMarquee";

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
  defaultChain: arbitrum,
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a",
    "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
  ],
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
        <NounFlowerMarquee />
      </WagmiConfig>
    </AirstackProvider>
  );
}
