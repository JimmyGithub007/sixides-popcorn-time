import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { StoreProvider } from "@/store/StoreProvider";
import Shell from "@/components/Shell";
import "./globals.css";

const inter = Ubuntu({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "SIXiDES POPCORN TIME",
  description: "A web page that displays a list of movies that are now playing in theaters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<StoreProvider>
    <html lang="en">
      <body className={inter.className}>
        <Shell>
          {children}
        </Shell>
      </body>
    </html>
  </StoreProvider>);
}
