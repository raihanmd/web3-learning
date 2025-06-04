"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import {
  setupWalletSelector,
  type WalletSelector,
} from "@near-wallet-selector/core";
import {
  setupModal,
  type WalletSelectorModal,
} from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

const queryClient = new QueryClient();

function ContextProvider({ children }: { children: ReactNode }) {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);

  async function init() {
    const _selector = await setupWalletSelector({
      network: "testnet",
      modules: [setupMyNearWallet()],
    });

    setSelector(_selector);

    if (!_selector) {
      console.error("Wallet Selector is not initialized");
      return;
    }

    const _modal = setupModal(_selector, {
      contractId: "test.testnet",
    });
    setModal(_modal);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ContextProvider;
