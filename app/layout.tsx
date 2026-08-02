import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavProvider from "./components/nav-provider";
import Sidebar from "./components/sidebar";
import StatusBar from "./components/status-bar";
import TabBar from "./components/tab-bar";
import TitleBar from "./components/title-bar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roland's Site",
  description: "Hub for information about me, my work, and my projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // the font variables must land on :root — `--font-sans` in globals.css is declared there
    // and would resolve to the guaranteed-invalid value if they were only on <body>
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a className="skip-link" href="#about">
          Skip to content
        </a>
        <div className="mx-auto flex min-h-[100dvh] max-w-[1240px] flex-col border-x border-line bg-bg">
          <TitleBar />
          {/* one observer, two navigations */}
          <NavProvider>
            <div className="flex min-h-0 flex-1">
              <Sidebar />
              <main className="min-w-0 flex-1">
                <TabBar />
                {children}
              </main>
            </div>
          </NavProvider>
          <StatusBar />
        </div>
      </body>
    </html>
  );
}
