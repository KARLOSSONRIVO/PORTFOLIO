import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karlos Son P. Rivo - Developer Portfolio",
  description: "Modern portfolio focused on CarbonSense and FinShield, showcasing intelligent and impactful systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Script id="site-preferences" strategy="beforeInteractive">
          {`
            (function () {
              var root = document.documentElement;
              root.dataset.theme = "dark";
              root.dataset.motionPaused = "false";
              try {
                root.dataset.theme = localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
                root.dataset.motionPaused = String(localStorage.getItem("portfolio-motion-paused") === "true");
              } catch (_) {}
            })();
          `}
        </Script>
        <LenisProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </LenisProvider>
        {/* Runs before hydration so no previous-scroll flash is ever visible. */}
        <Script id="disable-scroll-restoration" strategy="beforeInteractive" async>
          {`
            if ("scrollRestoration" in history) {
              history.scrollRestoration = "manual";
            }
            if (!window.location.hash) {
              window.scrollTo(0, 0);
            }
          `}
        </Script>
      </body>
    </html>
  );
}
