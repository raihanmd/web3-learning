import Navbar from "~/components/navbar";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="bg-background/50 absolute top-0 left-0 -z-1 min-h-full min-w-full object-cover"
      >
        <source src="./videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Navbar />
    </main>
  );
}
