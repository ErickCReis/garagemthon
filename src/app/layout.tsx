import "@/styles/globals.css";

import { Toaster } from "@/components/ui/toaster";
import { TRPCReactProvider } from "@/trpc/react";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Header } from "./_components/header";

export const metadata: Metadata = {
  title: "Lelantus",
  description: "Lelantus",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body>
        <div className="container max-w-7xl space-y-10 p-8">
          <Header />
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
