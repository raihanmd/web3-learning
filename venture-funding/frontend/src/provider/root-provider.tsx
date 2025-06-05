"use client";

import type { PropsWithChildren } from "react";

import { WalletSelectorProvider } from "@near-wallet-selector/react-hook";

import "@near-wallet-selector/modal-ui/styles.css";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupMeteorWalletApp } from "@near-wallet-selector/meteor-wallet-app";
import { setupHotWallet } from "@near-wallet-selector/hot-wallet";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupSender } from "@near-wallet-selector/sender";
import { setupBitgetWallet } from "@near-wallet-selector/bitget-wallet";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupXDEFI } from "@near-wallet-selector/xdefi";
import { setupRamperWallet } from "@near-wallet-selector/ramper-wallet";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { setupOKXWallet } from "@near-wallet-selector/okx-wallet";
// import { setupEthereumWallets } from "@near-wallet-selector/ethereum-wallets";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
import { setupIntearWallet } from "@near-wallet-selector/intear-wallet";

import { CONTRACT_ID, NETWORK_ID } from "../constants";
// import { wagmiAdapter, web3Modal } from "~/wallets/web3modal";
import type { SetupParams } from "@near-wallet-selector/react-hook/src/lib/WalletSelectorProvider";

const walletSelectorConfig: SetupParams = {
  network: NETWORK_ID,
  createAccessKeyFor: CONTRACT_ID,
  debug: false,
  modules: [
    // setupEthereumWallets({
    //   // @ts-ignore
    //   wagmiConfig: wagmiAdapter.wagmiConfig,
    //   web3Modal,
    // }),
    setupMeteorWallet(),
    setupBitteWallet(),
    setupHotWallet(),
    setupMyNearWallet(),
    setupLedger(),
    setupSender(),
    setupNightly(),
    setupBitgetWallet(),
    setupMathWallet(),
    setupMeteorWalletApp({ contractId: CONTRACT_ID }),
    setupOKXWallet(),
    setupWelldoneWallet(),
    setupCoin98Wallet(),
    setupRamperWallet(),
    setupXDEFI(),
    setupNearMobileWallet(),
    setupIntearWallet(),
  ],
};

const RootProvider = ({ children }: PropsWithChildren) => {
  return (
    <WalletSelectorProvider config={walletSelectorConfig}>
      {children}
    </WalletSelectorProvider>
  );
};

export default RootProvider;
