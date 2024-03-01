import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";

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
        {children}
      </body>
    </html>
  </StoreProvider>);
}
