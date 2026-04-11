'use client'
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import React from "react";
import "./globals.css";

const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>

      <html lang="en" className={cn("font-sans", roboto.variable)}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </body>
      </html>
    </QueryClientProvider>

  );
}
