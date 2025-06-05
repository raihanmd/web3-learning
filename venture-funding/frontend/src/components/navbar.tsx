"use client";
import { useWalletSelector } from "@near-wallet-selector/react-hook";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTRACT_ID } from "~/constants";

const Navbar = () => {
  const { signIn, signOut, viewFunction, signedAccountId } =
    useWalletSelector();
  const [ventures, setVentures] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await viewFunction({
          method: "get_ventures",
          contractId: CONTRACT_ID,
        });
        setVentures((result as []) || []);
      } catch (error) {
        console.error("Failed to fetch ventures:", error);
      }
    }
    fetchData();
  }, [viewFunction]);

  return (
    <nav className="text-background mx-auto flex w-full max-w-7xl justify-between border-white px-4 py-4 backdrop-blur-lg">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          <span className="text-orange-500">Venture</span>
          Funding
        </Link>
        <Link href="/ventures" className="hover:underline">
          Ventures
        </Link>
        <Link href="/about" className="hover:underline">
          About Us
        </Link>
      </div>
      {signedAccountId ? (
        <Button onClick={signOut}>Logout from {signedAccountId}</Button>
      ) : (
        <Button onClick={signIn}>Connect Wallet</Button>
      )}
    </nav>
  );
};

export default Navbar;
