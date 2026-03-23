'use client';

import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useThemeStore } from "../store/useThemeStore";
import { NavigationSidebar } from "../components/layout/NavigationSidebar";
import { MockDataInitializer } from "../components/providers/MockDataInitializer";

import { TopNavigationBar } from "../components/layout/TopNavigationBar";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <html lang="en">
        <body className="bg-[#f0f2f5]" />
      </html>
    );
  }

  return (
    <html lang="en" className="light">
      <body className={`${roboto.variable} ${montserrat.variable} antialiased font-roboto bg-[#f4f6fb] text-slate-800`}>
        <QueryClientProvider client={queryClient}>
          <div className="flex w-full h-screen text-slate-900 bg-white overflow-hidden relative">
              <MockDataInitializer />
              <NavigationSidebar />
              <div className="flex-1 flex flex-col overflow-hidden bg-[#fafbfc]">
                  <TopNavigationBar />
                  <main className="flex-1 overflow-y-auto">
                      {children}
                  </main>
              </div>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
