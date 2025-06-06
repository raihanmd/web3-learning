"use client";
import { useWalletSelector } from "@near-wallet-selector/react-hook";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const { signIn, signOut, signedAccountId } = useWalletSelector();

  return (
    <nav className="text-background fixed top-0 z-[5] mx-auto w-full border-white px-4 py-4 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl justify-between">
        <div className="text-foreground flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            <span className="text-primary">Venture</span>
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
      </div>
    </nav>
  );
};

export default Navbar;
