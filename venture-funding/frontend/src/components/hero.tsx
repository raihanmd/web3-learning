"use client";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ArrowRight, Rocket, Users, DollarSign } from "lucide-react";

const Hero = () => {
  return (
    <main className="bg-background relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 min-h-full min-w-full object-cover"
      >
        <source src="./videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-xs" />

      {/* Content */}
      <div className="relative flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Main Content */}
            <div className="flex flex-col justify-center space-y-8">
              {/* Badge */}
              <div className="border-primary/20 bg-primary/10 text-primary inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm">
                <Rocket className="mr-2 h-4 w-4" />
                Decentralized Venture Funding
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-foreground text-5xl leading-tight font-bold lg:text-7xl">
                  Turn Your{" "}
                  <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                    Ideas
                  </span>{" "}
                  Into Reality
                </h1>
                <p className="text-muted-foreground text-xl lg:text-2xl">
                  Connect with investors, showcase your vision, and secure
                  funding for your next big venture on the blockchain.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/submit-idea">
                  <Button
                    size="lg"
                    className="rounded-full px-8 py-3 font-semibold"
                  >
                    Submit Your Idea
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/ventures">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/20 text-foreground hover:bg-primary/10 rounded-full px-8 py-3 font-semibold"
                  >
                    Explore Ventures
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Stats/Features */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Stat Card 1 */}
                <div className="border-border bg-card/50 rounded-2xl border p-6 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Rocket className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-foreground text-2xl font-bold">500+</p>
                      <p className="text-muted-foreground text-sm">
                        Ideas Funded
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stat Card 2 */}
                <div className="border-border bg-card/50 rounded-2xl border p-6 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="bg-accent/20 rounded-full p-3">
                      <Users className="text-accent h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-foreground text-2xl font-bold">10K+</p>
                      <p className="text-muted-foreground text-sm">
                        Active Users
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stat Card 3 */}
                <div className="border-border bg-card/50 rounded-2xl border p-6 backdrop-blur-sm sm:col-span-2">
                  <div className="flex items-center space-x-3">
                    <div className="bg-chart-3/20 rounded-full p-3">
                      <DollarSign className="text-chart-3 h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-foreground text-2xl font-bold">
                        $2.5M+
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Total Funding Raised
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-4">
                <h3 className="text-foreground text-xl font-semibold">
                  Why Choose VentureFunding?
                </h3>
                <ul className="text-muted-foreground space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="bg-primary h-2 w-2 rounded-full" />
                    <span>Built on NEAR protocol</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="bg-primary h-2 w-2 rounded-full" />
                    <span>Transparent blockchain-based funding</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="bg-primary h-2 w-2 rounded-full" />
                    <span>Direct connection with investors</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="bg-primary h-2 w-2 rounded-full" />
                    <span>Smart contract security</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
