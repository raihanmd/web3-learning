import "~/styles/globals.css";

import { type Metadata } from "next";
import { JetBrains_Mono, Geist } from "next/font/google";
import RootProvider from "~/provider/root-provider";

export const metadata: Metadata = {
  title: "Get Fund of Your Ideas",
  description: "VentureFunding - A platform to fund your ventures",
  authors: [{ name: "VentureFunding Team", url: "https://venturefunding.com" }],
  keywords: [
    "venture funding",
    "crowdfunding",
    "startup funding",
    "invest in startups",
    "fund your idea",
    "venture capital",
    "startup investment",
    "funding platform",
    "investors",
    "entrepreneurship",
    "business funding",
    "funding your venture",
    "startup accelerator",
    "venture funding platform",
    "crowdfunding platform",
    "funding for startups",
    "invest in ventures",
    "startup funding platform",
    "venture funding opportunities",
    "funding your startup",
    "venture funding solutions",
    "startup funding solutions",
    "venture funding for entrepreneurs",
    "crowdfunding for startups",
    "invest in entrepreneurs",
    "funding your business",
    "venture funding community",
    "startup funding community",
    "venture funding network",
  ],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jetbrains_mono.variable} ${geist.variable} dark`}
    >
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
