import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { nearTestnet } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";

export const projectId = "db6f7631499f6ccf6d48458c71fda7f8";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [nearTestnet];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const web3Modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [nearTestnet],
  enableWalletConnect: true,
  features: {
    analytics: true,
    swaps: false,
    onramp: false,
    email: false, // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
    socials: false, // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
  },
  coinbasePreference: "eoaOnly", // Smart accounts (Safe contract) not available on NEAR Protocol, only EOA.
  allWallets: "SHOW",
});

export const config = wagmiAdapter.wagmiConfig;
